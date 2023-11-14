const pi = Math.PI;
const angleRes = 64; // was 16

const success = false;

let buffers;
let viewMatrix;

let displayProgramInfo;
let colorPlainProgramInfo;
let copyProgramInfo;
let multiplyProgramInfo;
let gaussianProgramInfo;
let gaussianBlurProgramInfo;
let sincXYProgramInfo;
let sincXYMultProgramInfo;
let bitReverseProgramInfo;
let transformXProgramInfo;
let transformYProgramInfo;

let glCanvas;

let dragging, dragStop;
let dragStartX, dragStartY, dragView;
let animating = false;
let zoom3d = 1;
let sampleCount;
let fbType = 0;

const viewSource = {};
const viewTransform = {};

let lastRectWidth = 10;
let lastRectHeight = 10;

let gl;

let phaseTexture;

let transformDataTexture;
let sourceTexture;
let sourceRT;

let transformTexture;
let transformRT;

let dragStartRT;
let scratchRT;

let deltaTimeWithoutSpeed;
let zoomRate = 0;

const brightness = 1000;

let refresh;
const time = 0;

let mouseDown = 0;
let mouseX = 0;
let mouseY = 0;

function round(x) {
    const out = Math.round(x * 1000) / 1000;
    return out;
}

function getById(x) {
    return document.getElementById(x);
}

function showDiv(div, x) {
    document.getElementById(div).style.display = (x) ? "block" : "none";
}

// update info text
function updateInfo(norms) {
    const info = document.getElementById("values");

    const vw = findView(mouseX, mouseY);

    if (!vw) {
        info.innerHTML = "";
    } else {
        let x = sampleCount * (-.5 + (mouseX - vw.x) / vw.width);
        let y = sampleCount * (.5 - (mouseY - vw.y) / vw.height);

        x = Math.floor(x * vw.scale);
        y = Math.floor(y * vw.scale);

        info.innerHTML = "(" + x + ", " + y + ")<br>";

        if (vw == viewTransform) {
            info.innerHTML += "e<sup>" + (-x) + "i&pi;x</sup>e<sup>" + (-y) + "i&pi;y</sup><br>";
        }
    }

    const dv = getDrawColor();
    info.innerHTML += "Draw value: " + round(dv[0]) + ((round(dv[1]) < 0) ? "" : "+") + round(dv[1]) + "i";
}


let lastClick;
let dragStartTime;


function addMouseEvents(canvas) {

    canvas.onmousedown = function (event) {
        mouseX = dragStartX = event.clientX
        mouseY = dragStartY = event.clientY

        dragView = findView(mouseX, mouseY);

        if (!dragView) {
            return;
        }

        mouseDown = 1;
        copyForDragging(dragView.rt, dragStartRT);
        canvas.onmousemove(event);
    }

    canvas.onmouseup = function (event) {
        mouseDown = 0;
    }

    canvas.onmousemove = function (event) {
        mouseX = event.clientX
        mouseY = event.clientY

        refresh();
    }

    canvas.addEventListener("wheel", function (event) {
        zoom3d *= Math.exp(-event.deltaY * .001)
        zoom3d = Math.min(Math.max(zoom3d, 1), 500)

        manualScale = true;

        refresh()
    })

    convertTouchEvents(canvas);
}

function findView(x, y) {
    if (y >= viewSource.height) {
        return null;
    }

    if (x < viewSource.width) {
        return viewSource;
    }

    return viewTransform;
}

function convertTouchEvents(canvas) {
    let lastTap;

    // convert touch events to mouse events
    canvas.addEventListener("touchstart", function (e) {
        //mousePos = getTouchPos(canvas, e);
        const touch = e.touches[0];
        const etype = "mousedown";
        lastTap = e.timeStamp;

        const mouseEvent = new MouseEvent(etype, {
            clientX: touch.clientX,
            clientY: touch.clientY
        });

        e.preventDefault();
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchend", function (e) {
        const mouseEvent = new MouseEvent("mouseup", {});
        e.preventDefault();
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchmove", function (e) {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });

        e.preventDefault();
        canvas.dispatchEvent(mouseEvent);
    }, false);

    // Get the position of a touch relative to the canvas
    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }
}

function resizeCanvas(cv) {
    const width = cv.clientWidth;
    const height = cv.clientHeight;

    if (cv.width !== width || cv.height !== height) {
        cv.width = width;
        cv.height = height;
        return true;
    }

    return false;
}

// add handlers for buttons so they work on both desktop and mobile
function handleButtonEvents(id, func, func0) {
    const button = document.getElementById(id);

    button.addEventListener("mousedown", func, false)
    button.addEventListener("touchstart", func, false)

    button.addEventListener("mouseup", func0, false)
    button.addEventListener("mouseleave", func0, false)
    button.addEventListener("touchend", func0, false)
}

function copyImage(texture) {
    const fb = scratchRT.framebuffer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.viewport(0, 0, fb.width, fb.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.colorMask(true, false, false, false);

    const prog = copyProgramInfo;
    gl.useProgram(prog.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.extra);
    const verts = [-1, -1, -1, 1, 1, -1, 1, 1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(prog.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prog.attribLocations.vertexPosition);

    const modelViewMatrix = mat4.create();
    mat4.scale(modelViewMatrix, modelViewMatrix, [.5, -.5, 0]);
    mat4.translate(modelViewMatrix, modelViewMatrix, [+1, -1, 0]);
    gl.uniformMatrix4fv(prog.uniformLocations.textureMatrix, false, modelViewMatrix);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    setTexParameters(false);
    gl.uniform1i(prog.uniformLocations.sourceTexture, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, verts.length / 2);
    gl.disableVertexAttribArray(prog.attribLocations.vertexPosition);
    gl.colorMask(true, true, true, true);

    translate(scratchRT, sourceRT, 1, 1);
    runTransform(false);

    refresh();
}

function copyForDragging(fromRT, toRT) {
    const fb = toRT.framebuffer;

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.viewport(0, 0, fb.width, fb.height);

    const prog = copyProgramInfo;
    gl.useProgram(prog.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.extra);
    const verts = [-1, -1, -1, 1, 1, -1, 1, 1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(prog.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prog.attribLocations.vertexPosition);

    const modelViewMatrix = mat4.create();

    mat4.scale(modelViewMatrix, modelViewMatrix, [.5, .5, 0]);
    mat4.translate(modelViewMatrix, modelViewMatrix, [-1, -1, 0]);

    gl.uniformMatrix4fv(prog.uniformLocations.textureMatrix, false, modelViewMatrix);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, fromRT.texture);
    setTexParameters(true);
    gl.uniform1i(prog.uniformLocations.sourceTexture, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, verts.length / 2);
    gl.disableVertexAttribArray(prog.attribLocations.vertexPosition);
}

function translate(fromRT, toRT, dx, dy) {
    const fb = toRT.framebuffer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.viewport(0, 0, fb.width, fb.height);

    const prog = copyProgramInfo;
    gl.useProgram(prog.program);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.extra);
    const verts = [-1, -1, -1, 1, 1, -1, 1, 1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(prog.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(prog.attribLocations.vertexPosition);

    const modelViewMatrix = mat4.create();
    mat4.scale(modelViewMatrix, modelViewMatrix, [.5, .5, 0]);
    mat4.translate(modelViewMatrix, modelViewMatrix, [-1 - dx, -1 - dy, 0]);
    gl.uniformMatrix4fv(prog.uniformLocations.textureMatrix, false, modelViewMatrix);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, fromRT.texture);
    setTexParameters(true);
    gl.uniform1i(prog.uniformLocations.sourceTexture, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, verts.length / 2);
    gl.disableVertexAttribArray(prog.attribLocations.vertexPosition);
}

function getDrawColor(col) {
    if (col) {
        return col;
    }

    const mag = 1;
    const phase = 0 / 180;

    return [mag * Math.cos(phase), mag * Math.sin(phase), 0, 1];
}

function drawRect(view, x1, y1, x2, y2, copy, color) {
    if (dragView && copy != false) {
        copyForDragging(dragStartRT, dragView.rt);
    }

    const rttFramebuffer = view.rt.framebuffer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, rttFramebuffer);
    gl.viewport(0, 0, rttFramebuffer.width, rttFramebuffer.height);

    const prog = colorPlainProgramInfo;
    gl.useProgram(prog.program);
    mat4.create();

    const w = view.width;
    const h = w;

    // to center examples exactly
    if (color && (x2 - x1) > w * .1) {
        x2 += w / sampleCount;
        y1 -= h / sampleCount;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.extra);
    const verts = [x1, y1, x2, y1, x1, y2, x2, y2];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(colorPlainProgramInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorPlainProgramInfo.attribLocations.vertexPosition);

    // coordinates are offset by 1/2 in each direction, making (0,0) at the center.
    // so to have it wrap around, we draw the same shape four times with various offsets.
    for (let i = 0; i != 2; i++) {
        for (let j = 0; j != 2; j++) {
            const modelViewMatrix = mat4.create();
            mat4.translate(modelViewMatrix, modelViewMatrix, [-2 * i, 2 * j, 0]);
            mat4.translate(modelViewMatrix, modelViewMatrix, [(1 - view.scale), -(1 - view.scale), 0]);
            mat4.scale(modelViewMatrix, modelViewMatrix, [2 * view.scale / w, -2 * view.scale / h, 1]);
            gl.uniformMatrix4fv(colorPlainProgramInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
            gl.uniform4fv(colorPlainProgramInfo.uniformLocations.color, getDrawColor(color));
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, verts.length / 2);
        }
    }

    gl.disableVertexAttribArray(colorPlainProgramInfo.attribLocations.vertexPosition);

    runTransform(view == viewTransform);
    lastRectWidth = Math.abs(x2 - x1);
    lastRectHeight = Math.abs(y2 - y1);
}

// create texture used to convert complex numbers to phase colors
function createPhaseTexture() {
    phaseTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, phaseTexture);

    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.FLOAT;
    const level = 0;
    const width = 512;
    const height = width;
    const cols = [];

    for (let j = 0; j != height; j++) {
        for (let i = 0; i != width; i++) {
            const x = i - width / 2;
            const y = j - height / 2;

            const r = Math.hypot(x, y);
            let ang = Math.atan2(y, x);

            // convert to 0 .. 6
            ang *= 3 / pi;
            if (ang < 0) {
                ang += 6;
            }

            const hsec = Math.floor(ang);
            const a2 = ang % 1;
            const a3 = 1. - a2;
            const val = 1;

            switch (hsec) {
                case 6:
                case 0:
                    cols.push(val, val * a2, 0, 0);
                    break;
                case 1:
                    cols.push(val * a3, val, 0, 0);
                    break;
                case 2:
                    cols.push(0, val, val * a2, 0);
                    break;
                case -3:
                case 3:
                    cols.push(0, val * a3, val, 0);
                    break;
                case 4:
                    cols.push(val * a2, 0, val, 0);
                    break;
                case 5:
                    cols.push(val, 0, val * a3, 0);
                    break;
                default:
                    console.log("bad hsec " + hsec);
            }
        }
    }

    const pixel = new Float32Array(cols);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, 0, srcFormat, srcType, pixel);
}

// create texture with precomputed info for FFT
function createTransformDataTexture() {
    transformDataTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, transformDataTexture);

    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.FLOAT;
    const level = 0;
    const width = sampleCount = 512;

    transformDataTexture.width = width;
    const cols = [];

    for (let i = 0; i != width; i++) {
        cols.push(0, 0, 0, 0);
    }

    // first row in texture is for bit-reversal
    let bit;
    const size2 = width * 2;

    for (let i = 0, j = 0; i != size2; i += 2) {
        cols[i * 2] = (j / 2) / width;
        cols[j * 2] = (i / 2) / width;

        // increment j by one, from the left side (bit-reversed)
        bit = width;
        while ((bit & j) != 0) {
            j &= ~bit;
            bit >>= 1;
        }

        j |= bit;
    }

    const size = width;
    let tabskip = size << 1;
    let base = 4 * width;

    // remaining rows in texture are for the actual transform, one row for each pass.
    // original code to actually perform the FFT is commented out.  instead, we precompute the
    // coordinates and coefficients and store them.
    for (let skip1 = 4; skip1 <= size2; skip1 <<= 1) {

        for (let i = 0; i != width; i++) {
            cols.push(0, 0, 0, 0);
        }

        // skip2 = length of subarrays we are combining
        // skip1 = length of subarray after combination
        let skip2 = skip1 >> 1;
        tabskip >>= 1;

        // for each subarray
        for (let i = 0; i < size2; i += skip1) {
            let ix = 0;
            // for each pair of complex numbers (one in each subarray)
            for (let j = i; j != i + skip2; j += 2, ix += tabskip) {
                const wr = Math.cos(pi * ix / size);
                const wi = Math.sin(pi * ix / size);
                //d1r = data[j];
                //d1i = data[j+1];
                const j2 = j + skip2;
                //d2r = data[j2];
                //d2i = data[j2+1];

                //d2wr = d2r*wr - d2i*wi;
                //d2wi = d2r*wi + d2i*wr;

                // b = location of other pixel
                // r, g = multiplier
                // a = 0 if other pixel is multiplied, 1 if this one is
                cols[base + j * 2] = wr;
                cols[base + j * 2 + 1] = wi;
                cols[base + j * 2 + 2] = (j2 + .5) / size2;
                cols[base + j * 2 + 3] = 0;
                cols[base + j2 * 2] = wr;
                cols[base + j2 * 2 + 1] = wi;
                cols[base + j2 * 2 + 2] = (j + .5) / size2;
                cols[base + j2 * 2 + 3] = 1;
                /*
                        data[j]    = d1r+d2wr;
                        data[j+1]  = d1i+d2wi;
                        data[j2  ] = d1r-d2wr;
                        data[j2+1] = d1i-d2wi;
                */
            }
        }

        base += 4 * width;
    }

    const height = base / (4 * width);
    transformDataTexture.height = height;

    const pixel = new Float32Array(cols);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, 0, srcFormat, srcType, pixel);
}

function createSourceTexture() {
    sourceRT = initTextureFramebuffer(512, 512);
    sourceTexture = sourceRT.texture;
}

function initTextureFramebuffer(w, h) {
    const rttFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, rttFramebuffer);

    rttFramebuffer.width = w;
    rttFramebuffer.height = h;

    const rttTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, rttTexture);
    setTexParameters(false);

    gl.HALF_FLOAT_OES = 0x8D61;

    if (fbType == 0) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, rttFramebuffer.width, rttFramebuffer.height, 0, gl.RGBA, gl.FLOAT, null);
    } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, rttFramebuffer.width, rttFramebuffer.height, 0, gl.RGB, gl.HALF_FLOAT_OES, null);
    }

    const renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rttTexture, 0);

    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
        if (fbType == 0) {
            // try again with half float
            fbType = 1;
            return initTextureFramebuffer(w, h);
        }

        console.log("failed to create framebuffer");
        return null;
    }

    const pixels = new Float32Array(4);

    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.FLOAT, pixels);

    if (gl.getError() != gl.NO_ERROR) {
        console.log("readPixels failed");
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return {framebuffer: rttFramebuffer, texture: rttTexture};
}

// create all-white texture if "phase as color" turned off
function createViewProgram() {
    // Vertex shader program for non-sliced
    const vsSource = `
    attribute vec4 aVertexPosition;
    varying highp vec3 vPosition;

    void main(void) {
      gl_Position = aVertexPosition;
      vPosition = aVertexPosition.xyz;
    }
  `;

    var fsSource = `
    varying highp vec3 vPosition;
    uniform highp float uZoom;
    uniform highp float uBrightness;
    uniform sampler2D uPhaseTexture;
    uniform sampler2D uSourceTexture;

    void main(void) {
      highp vec4 col = vec4(0., 0., 0., 0.);
      highp vec3 v = vPosition;
      highp vec2 val = texture2D(uSourceTexture, vec2(1.0+v.x*.5*uZoom, 1.0+v.y*.5*uZoom)).rg;
      highp float valr = length(val.st);
      col += vec4(texture2D(uPhaseTexture, vec2(.5, .5)+.4*val/valr).rgb, 1.0)*valr;
      col *= uBrightness;
      col /= max(1.0, max(col.r, max(col.g, col.b)));
      gl_FragColor = col;
    }
  `;

    displayProgramInfo = createProgramInfo(vsSource, fsSource,
        ['vertexPosition'],
        ['zoom', 'brightness', 'phaseTexture', 'sourceTexture']
    );
}

function makeUniformName(s) {
    return "u" + s.charAt(0).toUpperCase() + s.slice(1)
}

function makeAttribName(s) {
    return "a" + s.charAt(0).toUpperCase() + s.slice(1)
}

function createProgramInfo(vsSource, fsSource, attribs, uniforms) {
    let loc;

    const prog = initShaderProgram(gl, vsSource, fsSource);

    if (!prog) {
        return null;
    }

    const progInfo = {
        program: prog,
        attribLocations: {},
        uniformLocations: {}
    };

    for (let i = 0; i != attribs.length; i++) {
        loc = gl.getAttribLocation(prog, attribs[i]);

        if (loc == -1) {
            loc = gl.getAttribLocation(prog, makeAttribName(attribs[i]));
        }

        if (loc == -1) {
            console.log("can't find attribute " + attribs[i]);
        } else {
            progInfo.attribLocations[attribs[i]] = loc;
        }
    }

    for (let i = 0; i != uniforms.length; i++) {
        loc = gl.getUniformLocation(prog, uniforms[i]);

        if (!loc) {
            loc = gl.getUniformLocation(prog, makeUniformName(uniforms[i]));
        }

        if (!loc) {
            console.log("can't find uniform " + uniforms[i]);
        } else {
            progInfo.uniformLocations[uniforms[i]] = loc;
        }
    }

    return progInfo;
}

// create normal shaders
function createShaders() {
    // Vertex shader program

    const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;

    void main(void) {
      gl_Position = uModelViewMatrix * aVertexPosition;
    }
  `;

    const fsColorNoLightingSource = `
    uniform highp vec4 uColor;

    void main(void) {
      gl_FragColor = uColor;
    }
  `;

    colorPlainProgramInfo = createProgramInfo(vsSource, fsColorNoLightingSource,
        ['vertexPosition'],
        ['modelViewMatrix', 'color']
    );

    const fsCopySource = `
    uniform sampler2D uSourceTexture;
    uniform highp mat4 uTextureMatrix;
    varying highp vec2 vPosition;

    void main(void) {
      gl_FragColor = texture2D(uSourceTexture, (uTextureMatrix * vec4(vPosition, 0.0, 1.0)).xy);
    }
  `;

    const vsTransformSource = `
    attribute vec4 aVertexPosition;
    varying highp vec2 vPosition;

    void main(void) {
      gl_Position = aVertexPosition;
      vPosition = aVertexPosition.xy;
    }
  `;

    const fsGaussianSource = `
    uniform highp mat4 uTextureMatrix;
    varying highp vec2 vPosition;
    uniform highp sampler2D uSourceTexture;

    void main(void) {
      highp vec4 col = texture2D(uSourceTexture, .5*vPosition);
      highp vec2 tpos = (uTextureMatrix * vec4(vPosition, 0.0, 1.0)).xy;
      gl_FragColor = col + vec4(exp(-(tpos.x*tpos.x+tpos.y*tpos.y)), 0.0, 0.0, 1.0);
    }
  `;

    const fsGaussianBlurSource = `
    uniform highp mat4 uTextureMatrix;
    varying highp vec2 vPosition;
    uniform highp sampler2D uSourceTexture;

    void main(void) {
      highp vec4 col = texture2D(uSourceTexture, .5*vPosition);
      highp vec2 tpos = (uTextureMatrix * vec4(vPosition, 0.0, 1.0)).xy;
      gl_FragColor = col * exp(-(tpos.x*tpos.x+tpos.y*tpos.y));
    }
  `;

    const fsSincXYSource = `
    uniform highp mat4 uTextureMatrix;
    varying highp vec2 vPosition;
    uniform highp sampler2D uSourceTexture;

    void main(void) {
      highp vec4 col = texture2D(uSourceTexture, .5*vPosition);
      highp vec2 tpos = (uTextureMatrix * vec4(vPosition, 0.0, 1.0)).xy;
      gl_FragColor = col + vec4(sin(tpos.x)*sin(tpos.y)/(tpos.x*tpos.y), 0.0, 0.0, 1.0);
    }
  `;

    const fsSincXYMultSource = `
    uniform highp mat4 uTextureMatrix;
    varying highp vec2 vPosition;
    uniform highp sampler2D uSourceTexture;

    void main(void) {
      highp vec4 col = texture2D(uSourceTexture, .5*vPosition);
      highp vec2 tpos = (uTextureMatrix * vec4(vPosition, 0.0, 1.0)).xy;
      gl_FragColor = col * sin(tpos.x)*sin(tpos.y)/(tpos.x*tpos.y);
    }
  `;

    copyProgramInfo = createProgramInfo(vsTransformSource, fsCopySource,
        ['vertexPosition'],
        ['textureMatrix', 'sourceTexture']
    );

    gaussianProgramInfo = createProgramInfo(vsTransformSource, fsGaussianSource,
        ['vertexPosition'],
        ['textureMatrix']
    );

    gaussianBlurProgramInfo = createProgramInfo(vsTransformSource, fsGaussianBlurSource,
        ['vertexPosition'],
        ['textureMatrix']
    );

    sincXYProgramInfo = createProgramInfo(vsTransformSource, fsSincXYSource,
        ['vertexPosition'],
        ['textureMatrix']
    );

    sincXYMultProgramInfo = createProgramInfo(vsTransformSource, fsSincXYMultSource,
        ['vertexPosition'],
        ['textureMatrix']
    );

    // bit reverse x and y using texture to store coordinate mapping
    const fsBitReverseSource = `
    varying highp vec2 vPosition;
    uniform sampler2D uTransformDataTexture;
    uniform sampler2D uSourceTexture;
    // y coord of bit reversal info
    uniform highp float uMapY;

    void main(void) {
      highp vec2 pos = vec2(.5, .5) + .5*vPosition;
      highp vec4 colx = texture2D(uTransformDataTexture, vec2(pos.x, uMapY));
      highp vec4 coly = texture2D(uTransformDataTexture, vec2(pos.y, uMapY));
      highp vec4 col2 = texture2D(uSourceTexture, vec2(colx.r, coly.r));
      gl_FragColor = col2;
    }
  `;

    const fsMultiplySource = `
    varying highp vec2 vPosition;
    uniform sampler2D uSourceTexture;
    uniform highp vec2 uMultiplier;

    void main(void) {
      highp vec2 pos = vec2(.5, .5) + .5*vPosition;
      highp vec4 col = texture2D(uSourceTexture, pos);
      gl_FragColor = vec4(uMultiplier.r*col.r-uMultiplier.g*col.g, uMultiplier.g*col.r+uMultiplier.r*col.g, 0.0, 1.0);
    }
  `;

    const fsTransformSource = `
    varying highp vec2 vPosition;
    uniform sampler2D uTransformDataTexture;
    uniform sampler2D uSourceTexture;
    uniform highp float uInverse;

    // y coord of info we need (different for every pass)
    uniform highp float uMapY;

    void main(void) {
      highp vec2 pos = vec2(.5, .5) + .5*vPosition;
      highp vec4 map  = texture2D(uTransformDataTexture, vec2(pos.COORD, uMapY));
      highp vec4 col1 = texture2D(uSourceTexture, vec2(pos.x, pos.y));

      highp vec4 col2 = texture2D(uSourceTexture, vec2(OTHER_PIXEL_LOC));
      map.g *= uInverse;

      // map.r, map.g = multiplier real, imaginary part
      // map.a = 0 if other pixel is multiplied, 1 if this one is
      gl_FragColor = (map.a < .5) ? MULT vec4(col1.r+col2.r*map.r-col2.g*map.g, col1.g+col2.r*map.g+col2.g*map.r, 0.0, 1.0) :
                                    MULT vec4(col2.r-col1.r*map.r+col1.g*map.g, col2.g-col1.r*map.g-col1.g*map.r, 0.0, 1.0);
    }
  `;

    // map.b = location of other pixel to combine with
    const fsTransformXSource = fsTransformSource.replace("COORD", "x")
        .replace("OTHER_PIXEL_LOC", "map.b, pos.y").replaceAll("MULT", ".5*");
    const fsTransformYSource = fsTransformSource.replace("COORD", "y")
        .replace("OTHER_PIXEL_LOC", "pos.x, map.b").replaceAll("MULT", "");
    ;

    transformXProgramInfo = createProgramInfo(vsTransformSource, fsTransformXSource,
        ['vertexPosition'],
        ['transformDataTexture', 'sourceTexture', 'mapY', 'inverse']
    );

    transformYProgramInfo = createProgramInfo(vsTransformSource, fsTransformYSource,
        ['vertexPosition'],
        ['transformDataTexture', 'sourceTexture', 'mapY', 'inverse']
    );

    bitReverseProgramInfo = createProgramInfo(vsTransformSource, fsBitReverseSource,
        ['vertexPosition'],
        ['transformDataTexture', 'sourceTexture', 'mapY']
    );

    multiplyProgramInfo = createProgramInfo(vsTransformSource, fsMultiplySource,
        ['vertexPosition'],
        ['sourceTexture', 'multiplier']
    );
}

function handleLoadImage() {
    const limg = getById("loadImage");

    const fileObj = limg.files[0];

    const objectURL = window.URL.createObjectURL(fileObj);

    const image = new Image();

    const texture = gl.createTexture();

    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        copyImage(texture);
        console.log("got image " + texture);
    };

    image.src = objectURL;
}


function main() {
    console.log("main")

    refresh = function () {

    }  // to avoid errors until we set it for real

    const canvas = glCanvas = document.querySelector('#glCanvas');
    gl = canvas.getContext('webgl');

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    gl.getExtension('OES_texture_float');
    gl.getExtension('OES_texture_half_float');

    createShaders();

    addMouseEvents(canvas)

    createPhaseTexture();

    createTransformDataTexture();

    createSourceTexture();
    createViewProgram();

    const width = transformDataTexture.width;

    console.log("w=" + width);

    transformRT = initTextureFramebuffer(width, width);
    scratchRT = initTextureFramebuffer(width, width);
    dragStartRT = initTextureFramebuffer(width, width);

    getById("loadImage").addEventListener("change", handleLoadImage, false);

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!hasDropdownParent(event.target)) {
            const dropdowns = document.getElementsByClassName("dropdown-content");

            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    buffers = initBuffers(gl);

    setupViews();

    let then = 0;

    // Draw the scene
    function render(now) {
        now *= 0.001;  // convert to seconds
        let deltaTime = (then) ? now - then : 0;
        then = now;

        // avoid large jumps when switching tabs
        deltaTime = Math.min(deltaTime, .03)

        deltaTimeWithoutSpeed = deltaTime

        resizeCanvas(canvas)

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        setupViews();

        const norms = runPhysics(deltaTime);
        drawScene(gl, buffers, deltaTime, norms);
        updateInfo(norms)

        animating = zoomRate != 0;
        if (!animating) {
            then = 0
        } else {
            requestAnimationFrame(render);
        }
    }

    refresh = function () {
        if (!animating) {
            requestAnimationFrame(render);
        }
    }

    getById("clear").onclick = doClear;
    getById("reset").onclick = exampleChanged;

    exampleChanged();

    refresh();
}

function exampleChanged() {
    doClear();

    drawRect(viewSource, viewSource.width * .4, viewSource.width * .4, viewSource.width * .6, viewSource.width * .6, false,
        [1, 0, 0, 1]);
}

function hasDropdownParent(obj) {
    while (obj) {
        if (obj.className == "dropdown") {
            return true;
        }

        obj = obj.parentNode;
    }
}

function initBuffers(gl) {
    const extraBuffer = gl.createBuffer();
    return {extra: extraBuffer};
}

// clear states
function doClear() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, sourceRT.framebuffer);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, transformRT.framebuffer);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    refresh();
}

// run physics simulation for current frame
function runPhysics(deltaTime) {
    deltaTime = 0;
    zoom3d *= Math.exp(deltaTimeWithoutSpeed * zoomRate);
    zoom3d = Math.min(Math.max(zoom3d, 1), 500);
}

function drawScene(gl, buffers, deltaTime, norms) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    drawView(viewSource, sourceTexture);
    drawView(viewTransform, transformTexture);
}

function setupViews() {
    const pad = 3;

    const w = Math.floor(gl.canvas.clientWidth / 2) - pad * 2;

    viewSource.x = viewSource.y = viewTransform.y = pad;
    viewSource.width = viewSource.height = viewTransform.width = viewTransform.height = w;
    viewSource.rt = sourceRT;
    viewSource.scale = 1;
    viewTransform.x = w + pad * 3;
    viewTransform.rt = transformRT;
    viewTransform.scale = 1 / zoom3d;
}

function drawView(view, source) {
    console.log("drawView ");

    const program = displayProgramInfo;
    gl.useProgram(program.program);

    const verts = [-1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0];
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.extra);

    const w = gl.canvas.clientWidth / 2;
    gl.viewport(view.x, gl.canvas.clientHeight - (view.y + view.height), view.width, view.height);
    console.log("w=" + gl.canvas.clientWidth + ", h=" + gl.canvas.clientHeight);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(program.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.attribLocations.vertexPosition);
    gl.uniform1f(program.uniformLocations.zoom, view.scale);

    const mult = 1; // view == viewSource ? 1 : 1/transformDataTexture.width;

    gl.uniform1f(program.uniformLocations.brightness, Math.exp(brightness / 100) * mult / 5000);
    gl.activeTexture(gl.TEXTURE0);

    // gl.bindTexture(gl.TEXTURE_2D, getById("phaseColorCheck").checked ? phaseTexture : whiteTexture);
    gl.bindTexture(gl.TEXTURE_2D, phaseTexture);

    setTexParameters(false);
    gl.uniform1i(program.uniformLocations.phaseTexture, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, source);
    setTexParameters(true);
    gl.uniform1i(program.uniformLocations.sourceTexture, 1);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.disableVertexAttribArray(program.attribLocations.vertexPosition);
    gl.disable(gl.BLEND);
}

function setDestination(rt) {
    const rttFramebuffer = rt.framebuffer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, rttFramebuffer);
    gl.viewport(0, 0, rttFramebuffer.width, rttFramebuffer.height);
}

function setTexParameters(repeat) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
}

function runTransform(inverse) {
    // first do bit reversal
    let program = bitReverseProgramInfo;
    gl.useProgram(program.program);

    let destRT = (inverse) ? sourceRT : transformRT;

    setDestination(destRT);

    const verts = [-1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0];

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.extra);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(program.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.attribLocations.vertexPosition);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, transformDataTexture);
    setTexParameters(false);
    gl.uniform1i(program.uniformLocations.transformDataTexture, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, inverse ? transformTexture : sourceTexture);
    setTexParameters(false);
    gl.uniform1i(program.uniformLocations.sourceTexture, 1);

    gl.uniform1f(program.uniformLocations.mapY, .5 / transformDataTexture.height);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.disableVertexAttribArray(program.attribLocations.vertexPosition);

    for (let dir = 0; dir != 2; dir++) {
        // first do X transform, then Y
        program = dir == 0 ? transformXProgramInfo : transformYProgramInfo;
        gl.useProgram(program.program);

        for (let step = 1, dest = 1; step != transformDataTexture.height; step++) {
            const rt = destRT;
            destRT = scratchRT;
            scratchRT = rt;
            setDestination(destRT);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.extra);
            gl.vertexAttribPointer(program.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(program.attribLocations.vertexPosition);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, transformDataTexture);
            gl.uniform1i(program.uniformLocations.transformDataTexture, 0);

            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, scratchRT.texture);
            gl.uniform1i(program.uniformLocations.sourceTexture, 1);

            // each pass uses a different Y location in the texture to get the correct info
            gl.uniform1f(program.uniformLocations.mapY, (step + .5) / transformDataTexture.height);
            gl.uniform1f(program.uniformLocations.inverse, inverse ? -1 : 1);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            gl.disableVertexAttribArray(program.attribLocations.vertexPosition);

            dest = 1 - dest;
        }
    }

    if (inverse) {
        sourceRT = destRT;
        sourceTexture = destRT.texture;
    } else {
        transformRT = destRT;
        transformTexture = destRT.texture;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function zoom(x) {
    zoomRate = x

    if (x != 0) {
        manualScale = true;
    }

    refresh();

    updateStateLink();
}

window.onload = main
