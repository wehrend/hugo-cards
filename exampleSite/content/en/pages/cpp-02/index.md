---
title: "C++ 02 – Classes for Oscillators"
category: "cpp"
icon: "svg/cpp.svg"
summary: "Encapsulating an oscillator in a class."
weight: 202
---
## An oscillator class

```cpp
class Oscillator {
public:
    explicit Oscillator(double freq) : freq_(freq) {}
    double next(double sampleRate);
private:
    double freq_, phase_ = 0.0;
};
```
