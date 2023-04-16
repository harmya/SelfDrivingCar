# Project: Self Driving Car using Neural Networks

Suggestions welcome :) 

### Introduction
This project uses deep neural networks to learn how to drive a car.
A car can go forward, backward, left and right. The goal is to teach the car to drive itself amongst the traffic.
We simulate traffic by placing other cars on the road. The car will learn to avoid collisions with other cars and stay on the road.

### Project Structure
There are multiple JS Scripts that do different jobs, plus there is a HTML and CSS file.
- index.html: ok.
- style.css: pain.
- car.js: Object constructor and methods for each car
- road.js: Object constructor and methods for the road.
- awareness.js: Creates the sensors in front of the car to detect other cars or road boundary.
- network.js: Initialise the neural network.
- calculation.js: some math stuff I need to detect collisons.

### How to play around with the code
- Clone the repo
- Open index.html in your browser to run it
- All the main settings can be found in main.js, and if you want to change the neural network, you can do that in network.js
- If you want to chnage the properties of the car, you can do that in car.js

### Demo
![Gif]([https://github.com/harmya/SelfDrivingCar/blob/master/assets/selfDrivingDemo.gif])

### Check it out at: https://harmya.github.io/SelfDrivingCar/

