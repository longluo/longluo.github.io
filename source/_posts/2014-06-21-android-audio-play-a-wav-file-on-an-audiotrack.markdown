---
layout: post
title: "[译]Android音频: 如何使用AudioTrack播放一个WAV格式文件?"
date: 2014-06-21 23:15:30 +0800
comments: true
categories: Android
description: "本文是关于如何在Android中使用AudioTrack播放WAV格式文件。"
keywords: Android,Audio
---

#### ***翻译 By Long Luo***

#### 原文链接：[Android Audio: Play a WAV file on an AudioTrack](http://mindtherobot.com/blog/580/android-audio-play-a-wav-file-on-an-audiotrack/)

	译者注：
	1. 由于这是技术文章，所以有些词句使用原文，表达更准确。
	2. 由于水平有效，有些地方可能翻译的不够准确，如有不当之处，敬请批评指正.
	3. 针对某些语句，适当补充了上下文及更适合中文阅读，尽量做到信达雅。

如果你已经成功地了解了关于**AudioTrack**的[一些话题](http://mindtherobot.com/blog/555/android-audio-problems-hidden-limitations-and-opensl-es/ "Android Audio: Problems, Hidden Limitations and OpenSL ES")，那么你可能享受它带来的好处，例如低延迟（在STATIC(静态)模式），能够生成流式音频（在STREAM(流)模式）以及在播放之前，就能够访问和修改原始声音数据。

不过，现在的问题是如何从源获取数据。许多应用需要使用的**AudioTrack**并不能简单的生成PCM音频（一个例子，比如**Ethereal Dialpad**或者其他类似的App）。你可能需要从文件源去加载数据，例如*WAV*或*MP3*文件。 

不要期望使用**MediaPlayer**，去解码*WAV*文件和*MP3*音频。虽然**MediaPlayer**播放这些文件非常好，但是其播放逻辑完全在Native层，同时并没有为我们提供额外选项，允许我们使用其他解码器实现我们的目的。因此，我们必须从手动地从音频文件进行解码出*PCM*。

在这篇文章中，将会讨论**WAV**格式文件。而在下一课中，我们将会更进一步，讨论如何从**MP3**文件读取音频。

#### 背景知识: 一些数字音频术语

如果你的App不是专门为数字音频设计，那么在继续我们的讨论之前，你可能需要先了解一些基本的缩略语。别担心，都很简单，我们不需要对此做深入挖掘。

* PCM(**脉冲调制方式**) - 实现一个物理音频信号变成数字化最简单方法。基本原理就是信号变成了一个数字阵列，而其中**每个数字代表的是声音在特定的时间瞬间的电平**也可以说是能量（振幅）。(如果这种解释在科学上可能不会很准确，那我就只能说声抱歉了）。信不信由你，你可以使用这种方法表示**任何复杂**的声音，而且回放出来也非常精准。在这里，我们将只会谈到线性PCM。在线性PCM中，其中阵列中的每个数字都是原始声音振幅的**线性表示**。在某些情况下，对数映射能够更好地表示原来的声音幅度比例情况 - 但是我们不会讨论那些情况。

* Sampling rate(采样率)：- 每秒你的数字声音有多少样本（声音幅度用数字表示）。样本越多，你能得到声音质量越好。目前在消费类音频系统目前使用的采样率通常是22050，44100和48000Hz/s。

* 每个样品分辨率/采样大小/位 - 定义表示振幅数字的大小和格式。例如，如果您使用的是8位整数，你只能表达出256级的幅度，所以原来的物理波形将被简化为256个离散电平，与此同时，你将失去一些声音精度也可以说是质量。如果你使用16位，那么声音质量变得更好。事实上，大部分时间你可能会使用16位音频。其他选项包括24位，32位（这些都是Android现在不支持的），或是使用浮点数。

* 声道 - 既可以是单声道，也可以是立体声(2个声道)，或者更多声道(但是Android不支持)。如果你想要有立体声，你需要有立体声音频，就必须要在每个声道都需要有一个独立的PCM数组，相应的信息量也会翻倍。

<!--more-->

上述定义也有助于你理解特定的格式和长度的音频缓冲区的数据量，以便提前预备缓冲区。也就是你需要一个缓冲区，以用于存储5秒长度以44100Hz采样率的立体声16-bit线性PCM数据。数据计算公式如下所示：

`5 sec * 44100 samples per sec * 2 bytes per sample * 2 channels = 882,000 bytes`

这一数额所需的内存可能会让初学者感到惊讶，因为当你往你的磁盘上存储的音频时，一个MP3文件，一个880KB的文件就可以容纳以相同的采样率和分辨率1分钟时长的音轨。这是为什么呢？因为先进的格式，比如MP3格式。因为我们大脑无法分辨识别出一些音频的内容，所以使用了很多复杂的方式在压缩的过程中去掉了这些内容。然而，大多数低等级的音频API，包括Android的**AudioTrack**只能接受线性**PCM**。这就是为什么如果我们不能把整个样品都放在内存中，我们需要将要处理的数据流，循环缓冲区和其他聪明的方式来使用音频API。

希望这样的解释并没有让你产生困惑，现在让我们继续来实际做一些与Android上的数字音频有关的工作吧！

#### WAV文件格式

我们的目标是用一个**InputStream**，由其从一个*WAV*文件加载PCM数据，来提供原始字节数据。然后我们就可以将原始的PCM数据直接推送到使用已经正确的配置好了的**AudioTrack.write**，通过使用***AudioTrack.write()***这个API。

*WAV*文件包含一个文件头和具体数据会。我们需要读取文件头以知道诸如采样速率，分辨率等信息。另外，我们通过文件头，也可以知道此格式是否支持。*WAV*可以封装成多种格式，我们无法全部支持。也许，只是合理的采样率，分辨率和通道的线性**PCM**格式。

*WAV*格式的细节在互联网上都可以找到，你仅仅需要在Google上搜索下。但是，遗憾的是，我并没有搜索到一个很好的Java库来读取WAV文件，而且可以移植到**Android**下。因此，我自己写了一些简单的代码。

下面这个方法就是如何读取一个WAV文件的头部：

	private static final String RIFF_HEADER = "RIFF";
	private static final String WAVE_HEADER = "WAVE";
	private static final String FMT_HEADER = "fmt ";
	private static final String DATA_HEADER = "data";

	private static final int HEADER_SIZE = 44;

	private static final String CHARSET = "ASCII";

	/* ... */

	public static WavInfo readHeader(InputStream wavStream) throws IOException,
			DecoderException {

		ByteBuffer buffer = ByteBuffer.allocate(HEADER_SIZE);
		buffer.order(ByteOrder.LITTLE_ENDIAN);

		wavStream.read(buffer.array(), buffer.arrayOffset(), buffer.capacity());

		buffer.rewind();
		buffer.position(buffer.position() + 20);
		int format = buffer.getShort();
		checkFormat(format == 1, "Unsupported encoding: " + format); // 1 means
																		// Linear
																		// PCM
		int channels = buffer.getShort();
		checkFormat(channels == 1 || channels == 2, "Unsupported channels: "
				+ channels);
		int rate = buffer.getInt();
		checkFormat(rate <= 48000 && rate >= 11025, "Unsupported rate: " + rate);
		buffer.position(buffer.position() + 6);
		int bits = buffer.getShort();
		checkFormat(bits == 16, "Unsupported bits: " + bits);
		int dataSize = 0;
		while (buffer.getInt() != 0x61746164) { // "data" marker
			Log.d(TAG, "Skipping non-data chunk");
			int size = buffer.getInt();
			wavStream.skip(size);

			buffer.rewind();
			wavStream.read(buffer.array(), buffer.arrayOffset(), 8);
			buffer.rewind();
		}
		dataSize = buffer.getInt();
		checkFormat(dataSize > 0, "wrong datasize: " + dataSize);

		return new WavInfo(new FormatSpec(rate, channels == 2), dataSize);
	}

上面的代码中，缺少的部分应该是显而易见的。正如你所看到的，仅仅支持16位，但在你可以修改代码以支持8位（**AudioTrack**不支持任何其他分辨率的）。

下面这个方法，则是用来读取文件剩余的部分 - **音频数据**。

	public static byte[] readWavPcm(WavInfo info, InputStream stream)
			throws IOException {
		byte[] data = new byte[info.getDataSize()];
		stream.read(data, 0, data.length);
		return data;
	}
	
我们读取的**WavInfo**结构体，包含采样率，分辨率和声道数已经足够让我们去播放我们读取的音频了。

如果我们不需要将全部音频数据一次性放入内存中，我们可以使用一个***InputStream***，一点一点地读取。

#### 将PCM传入AudioTrack

我们现在面临2种情况，新建一个适合这种格式的**AudioTrack**，或者使用一个已存在的**AudioTrack**，但是可能和我们*WAV*音频数据的格式不一致。

在第一种情况，事情就很简单了，我们仅仅需要使用**AudioTrack**构造器构造一个我们已经从WAV头部对应的即可。

第二种情况，我们就需要将我们的音频变成**AudioTrack**需要的目标格式。我们需要做一下几种转换方式：

如果采样率不同，要么丢弃或复制一个样本以便和目标速率相匹配。如果分辨率是不同的，将源信号分辨率映射到目标分辨率，从16位到8位，反之亦然。如果信道不同，我们要么将立体声声道混合成一个单声道或重复单声道的数据把它变成准立体声。（请考虑将这些算法的实现放在Native层，因为Native层在做这类处理有很大的优势。） 

在其他情况下，我们已经确定格式已经匹配。我们使用**AudioTrack.write()**写入缓冲区，以便实现回放。

记住，如果你使用静态模式，你需要在**play()**之前，新建一个包含准确的缓冲区大小的**AudioTrack** ，同时写入**write()**音频数据。而在流模式下，我们可以先使用**AudioTrack**的**play()**，然后在使用**write()**写入数据部分

#### 总结

你想实现***AudioTrack***上播放***WAV***音频可能有很多原因。有时候，可能是SoundPool有尺寸限制，或是MediaPlayer会有延迟和对资源占用太高，让你考虑使用这种方式。有时候你需要修改音频或者混合音频。不管任何情况，这篇文章试图告诉你应该如何做。

在下一篇中，我们将会讨论MP3音频，敬请期待:-)

#### ***Long Luo for Part 1 created at 23:15 ~ 00: 33 June 21th, 2014 @Shenzhen, China.***
#### ***Long Luo for Part 2 created at 16:00 ~ 17: 15 June 22th, 2014 @Shenzhen, China.***







