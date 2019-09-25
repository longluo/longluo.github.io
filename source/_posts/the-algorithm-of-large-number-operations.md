---
layout: post
title: '超大数字的四则运算是如何实现的呢？'
comments: true
date: 2019-09-20 01:32:43
tags: [Large Number, Algorithm, Operation]
mathjax: true
categories: Data Structures and Algorithms
keywords: Large Numbers, Algorithm, 算法, 
---


***By Long Luo***

众所周知，计算机系统从16位发展到32位，再从32位发展到64位，与此同时不同的数据类型也随着系统的位数增大而增大。早期的操作系统是16位系统，int用二字节表示，范围是-32768~32767，long用4字节表示，范围是-2147483648~2147483647；后来发展到32位操作系统，int用4字节表示，与long相同；目前的操作系统已发展到64位操作系统，但因程序编译工艺的不同，两者表现出不同的差别：
- 32位编译系统：int占四字节，与long相同。
- 64位编译系统：int占四字节，long占8字节，long数据范围变为：-2^63~2^63-1

具体在标准中，并没有规定long一定要比int长，也没有规定short要比int短，只是规定了长整型至少和整型一样长，整型至少和短整型一样长。这个规则同样适用于浮点型long double至少和double一样长，double至少和float一样长。至于如何实现要看编译器厂商。

下表所展示的是微软32位和64位编译器所识别的数据类型详细信息：

Type Name	Bytes	Other Names	Range of Values
int	4	signed	-2,147,483,648 to 2,147,483,647
unsigned int	4	unsigned	0 to 4,294,967,295
__int8	1	char	-128 to 127
unsigned __int8	1	unsigned char	0 to 255
__int16	2	short, short int, signed short int	-32,768 to 32,767
unsigned __int16	2	unsigned short, unsigned short int	0 to 65,535
__int32	4	signed, signed int, int	-2,147,483,648 to 2,147,483,647
unsigned __int32	4	unsigned, unsigned int	0 to 4,294,967,295
__int64	8	long long, signed long long	-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
unsigned __int64	8	unsigned long long	0 to 18,446,744,073,709,551,615
bool	1	none	false or true
char	1	none	-128 to 127 by default

0 to 255 when compiled by using /J
signed char	1	none	-128 to 127
unsigned char	1	none	0 to 255
short	2	short int, signed short int	-32,768 to 32,767
unsigned short	2	unsigned short int	0 to 65,535
long	4	long int, signed long int	-2,147,483,648 to 2,147,483,647
unsigned long	4	unsigned long int	0 to 4,294,967,295
long long	8	none (but equivalent to __int64)	-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
unsigned long long	8	none (but equivalent to unsigned __int64)	0 to 18,446,744,073,709,551,615
enum	varies	none	
float	4	none	3.4E +/- 38 (7 digits)
double	8	none	1.7E +/- 308 (15 digits)
long double	same as double	none	Same as double
wchar_t	2	__wchar_t	0 to 65,535


从上述表格中可以看出，普通工作生活中所涉及的数字都不会超过int所能表示的范围，而超过long long类型则少之又少。但是具体到一些行业或者科研中，比如天文，石油开采等，经常需要和天文数字进行打交道。举例来说，50！，10^20这种阶乘或者指数函数轻而易举就突破最大所能表示的范围。

如何表示这些超大数字以及对其进行数学运算呢？

<!--more-->

# 大数字如何表示？

首先需要解决的问题就是如何表示，用数据类型是不可能了，那么我们应该怎么做呢？

很容易想到的就是将超大数字拆分为一个个位进行展示，存储这些位的值就可以了。至于怎么存，可以使用string, 也可以使用list, array等。这里为了方便，我们使用string来说明及展示。
例子：
```cpp
string number = "3377733333332222";
```
解决了展示问题，下面我们来展示如何对超大数字进行数学运算：

# 加法

让我们回到小学课堂，重温我们学习加法的第一课。回想我们是如何做加法的呢？
```text
Input  : str1 = "3333311111111111", 
		 str2 =   "44422222221111"
Output :         3377733333332222
```

很明显，我们是从低位开始，按位相加，直至最高位。

那么实现大数字的加法就可以很简单的分成3步：
1. 翻转每个string；
2. 从第0位开始依次相加到相对小的string，每位的数字是和 % 10，如果有进位则进位为和 / 10；
3. 对得到的结果进行翻转。

我们直接看实现吧：

```cpp
string sum_of_large_number(string num1, string num2) {
    if (num1.length() > num2.length()) {
        swap(num1, num2);
    }

    int len1 = num1.length();
    int len2 = num2.length();
    reverse(num1.begin(), num1.end());
    reverse(num2.begin(), num2.end());

    string result = "";
    int carry = 0;
    for (int i = 0; i < len1; i++) {
        int sum = (num1.at(i) - '0') + (num2.at(i) - '0') + carry;
        result.push_back(sum % 10 + '0');
        carry = sum / 10;
    }

    for (int i = len1; i < len2; i++) {
        int sum = num2.at(i) - '0' + carry;
        result.push_back(sum % 10 + '0');
        carry = sum / 10;
    }

    if (carry) {
        result.push_back(carry + '0');
    }

    reverse(result.begin(), result.end());
    return result;
}
```

# 减法

对于减法来说，和加法类似，如下所示：
```text
Input : str1 = "11443333311111111100", 
str2 =             "1144422222221111"
Output :        11442188888888889989
```
很明显，我们是从低位开始，按位相减，直至最高位。

那么实现大数字的减法就可以很简单的分成3步：
1. 翻转每个string；
2. 从第0位开始依次相减到相对小的string，如果相减 > 0则不需要借位，如果 <0 则需要借位，与借位*10再进行相减，同时借位需要 -1；
3. 对得到的结果进行翻转。

我们直接看实现吧：

```cpp
bool isSmaller(string str1, string str2) {
    int len1 = str1.length();
    int len2 = str2.length();

    if (len2 < len1) {
        return false;
    }

    if (len2 > len1) {
        return true;
    }
    if (len1 == len2) {
        for (int i = 0; i < len1; i++) {
            if (str1[i] < str2[i]) {
                return true;
            } else if (str1[i] > str2[i]) {
                return false;
            }
        }
    }

    return false;
}

string subtract_of_large_number(string num1, string num2) {
    bool isNegative = false;
    if (isSmaller(num1, num2)) {
        isNegative = true;
        swap(num1, num2);
    }
    reverse(num1.begin(), num1.end());
    reverse(num2.begin(), num2.end());

    int len1 = num1.length();
    int len2 = num2.length();
    string result = "";

    int carry = 0;
    for (int i = 0; i < len2; i++) {
        int sub = (num1[i] - '0') - (num2[i] - '0') - carry;
        if (sub < 0) {
            sub = sub + 10;
            carry = 1;
        } else {
            carry = 0;
        }
		
        result.push_back(sub + '0');
    }

    for (int i = len2; i < len1; i++) {
        int sub = (num1[i] - '0') - carry;

        if (sub < 0) {
            sub = sub + 10;
            carry = 1;
        } else {
            carry = 0;
        }

        result.push_back(sub + '0');
    }

    // remove 0
    int length = result.length();
    while (result[length - 1] == '0' && length > 1) {
        result.pop_back();
        length--;
    }

    if (isNegative) {
        result.push_back('-');
    }
	
    reverse(result.begin(), result.end());
    return result;
}
```

# 乘法

对于乘法来说，乘法的原理如下所示：

那么如何做呢？

```cpp
string multiply(string number1, string number2) {
    int len1 = number1.length();
    int len2 = number2.length();

    if (len1 == 0 || len2 == 0) {
        return "0";
    }

    vector<int> result(len1 + len2, 0);

    int idx_num1 = 0;
    int idx_num2 = 0;

    for (int i = len1 - 1; i >= 0; i--) {
        int carry = 0;
        int n1 = number1.at(i) - '0';
        idx_num2 = 0;
        for (int j = len2 - 1; j >= 0; j--) {
            int n2 = number2.at(j) - '0';
            int sum = n1 * n2 + result[idx_num1 + idx_num2] + carry;
            carry = sum / 10;
            result[idx_num1 + idx_num2] = sum % 10;
            idx_num2++;
        }

        if (carry > 0) {
            result[idx_num1 + idx_num2] += carry;
        }

        idx_num1++;
    }
	
    int length = result.size() - 1;
    while (length >= 0 && result[length] == 0) {
        length--;
    }

    if (length == -1) {
        return "0";
    }

    string output = "";
    while (length >= 0) {
        output += std::to_string(result[length--]);
    }

    return output;
}
```

# 除法
相对于加法，减法，乘法来说，除法相对来说最复杂，
```text
Input : number  = 1260257
            divisor = 37
Output :        34061
```
目前我也只实现了除数可以使用int类型表示的算法。超大数字比如 90！/45!这种难度和复杂度太大，暂时还没有实现。

代码如下所示：

```cpp
string findDivide(string num1, int divisor) {
    string ans = "";
    int idx = 0;
    int temp = num1[idx] - '0';

    while (temp < divisor) {
        temp = temp * 10 + (num1[++idx] - '0');
    }

    while (num1.size() > idx) {
        ans += temp / divisor + '0';
        temp = (temp % divisor) * 10 + (num1[++idx] - '0');
    }

    if (ans.length() == 0) {
        return "0";
    }

    return ans;
}
```

# 总结

如上所示，我们就掌握了大数字的表示及简单数学运算的实现算法。

