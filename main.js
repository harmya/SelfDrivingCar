const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight - window.innerHeight/10;
canvas.width = 200;



const car = new Car(100, 100, 30, 50, 'red');  // car.js
car.drawCar(ctx);

animate();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    car.updatePosition();
    car.drawCar(ctx);
    requestAnimationFrame(animate); //this is a recursive function that calls itself over and over again
}