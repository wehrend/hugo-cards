---
title: "C++ 01 – Toolchain and First Program"
category: "cpp"
icon: "svg/cpp.svg"
summary: "Compiler, CMake and a first program that prints a sine table."
weight: 201
---
## Hello, sine

```cpp
#include <cmath>
#include <iostream>

int main() {
    for (int i = 0; i < 8; ++i)
        std::cout << std::sin(2 * M_PI * i / 8) << '\n';
}
```
