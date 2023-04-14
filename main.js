const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 200;
canvas.height = window.innerHeight - window.innerHeight * 0.1;



const road = new Road(canvas.width/2, canvas.width * 0.9, 3); //road.js
const cars = generateCars(100);

const traffic = [
    new Car(road.getLaneCenter(1), -200, 50, 30, 'orange', "dummy"),
    new Car(road.getLaneCenter(3), -300, 50, 30, 'orange', "dummy"),
    new Car(road.getLaneCenter(1), -350, 50, 30, 'orange', "dummy"),
    new Car(road.getLaneCenter(2), -400, 50, 30, 'orange', "dummy")
]

animate();

function generateCars(n) {
    const cars = [];
    for (let i = 0; i < n; i++) {
        cars.push(new Car(road.getLaneCenter(2), 100, 50, 30, '#2192FF', "main"));
    }
    return cars;

}

function animate() {

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].updatePosition(road.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].updatePosition(road.borders, traffic);
    }

    canvas.height = window.innerHeight - window.innerHeight * 0.1;

    ctx.save();
    ctx.translate(0, -cars[0].y + canvas.height * 0.65);

    road.drawRoad(ctx);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].drawCar(ctx);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].drawCar(ctx);
    }
    //car.drawCar(ctx);

    ctx.restore();

    requestAnimationFrame(animate); //this is a recursive function that calls itself over and over again
}