const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight - window.innerHeight * 0.1;
canvas.width = 200;

const road = new Road(canvas.width/2, canvas.width * 0.9, 3); //road.js
const car = new Car(road.getLaneCenter(2), 100, 50, 30, '#2192FF', "main");  // car.js

const traffic = [
    new Car(road.getLaneCenter(1), 200, 50, 30, 'orange', "dummy")
]

animate();

function animate() {

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].updatePosition(road.borders, []);
    }
    car.updatePosition(road.borders, traffic);

    canvas.height = window.innerHeight - window.innerHeight * 0.1;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.65);

    road.drawRoad(ctx);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].drawCar(ctx);
    }


    car.drawCar(ctx);

    ctx.restore();

    requestAnimationFrame(animate); //this is a recursive function that calls itself over and over again
}