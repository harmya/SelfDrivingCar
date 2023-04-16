const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = window.innerHeight - window.innerHeight * 0.1;

let numLanes = 5;

canvas.width = 60 * numLanes + 20;

const road = new Road(canvas.width/2, canvas.width * 0.9, numLanes); //road.js
road.drawRoad(ctx);

let generation = 0;

let traffic = [
    new Car(road.getLaneCenter(Math.floor(Math.random() * (numLanes)) + 1), 
    -1 * (Math.floor(Math.random() * 400) + 300), 50, 30, 'orange', "dummy"),

    new Car(road.getLaneCenter(Math.floor(Math.random() * (numLanes)) + 1), 
    -1 * (Math.floor(Math.random() * 400) + 300), 50, 30, 'orange', "dummy"),
    
    new Car(road.getLaneCenter(Math.floor(Math.random() * (numLanes)) + 1), 
    -1 * (Math.floor(Math.random() * 400) + 300), 50, 30, 'orange', "dummy"),

    new Car(road.getLaneCenter(Math.floor(Math.random() * (numLanes)) + 1), 
    -1 * (Math.floor(Math.random() * 400) + 300), 50, 30, 'orange', "dummy")

]


//draw traffic cars
for (let i = 0; i < traffic.length; i++) {
    //display properties of the car
    //console.log(traffic[i]);
    traffic[i].drawCar(ctx, true);
}

let bestCar = null;

function generateCars(n) {
    const bestCar_y = bestCar ? bestCar.y : 400;
    let randomLane = Math.floor(Math.random() * (numLanes)) + 1;
    const bestCar_x = bestCar ? bestCar.x : road.getLaneCenter(randomLane);
    const cars = [];
    for (let i = 0; i < n; i++) {
        const new_car = new Car(bestCar_x, bestCar_y, 50, 20, '#2192FF', "main");
        cars.push(new_car);
    }
    cars[0] = bestCar ? bestCar : cars[0];
    return cars;
}

//console.log("generate cars");

let numCars = document.getElementById("cars-slider").value;
numCars = numCars ? numCars : 100;

let cars = generateCars(numCars);
//initialize the best car to the first car in the array
bestCar = cars[0];

//draw main cars
for (let i = 0; i < cars.length; i++) {
    //
    if (i == 0) {
        cars[i].drawCar(ctx, true);
    } else {
        cars[i].drawCar(ctx, false);
    }

}


paused = false;
start = false;
nextGeneration = false;
//listen to the value of start button

document.getElementById("start").addEventListener("click", function () {
    //start the animation
    //("start");
    document.getElementById("message-pause-not-start").style.display = "none";
    if (paused || start) {
        //set class if-paused to display
        document.getElementById("message-start").style.display = "block";
        //console.log("either paused or start is true");
    } else {
        start = !start;
        animate();
    }
});

//get the value of the pause button
document.getElementById("pause").addEventListener("click", function () {
    if (!start) {
        //set class not-started to display
        document.getElementById("message-pause-not-start").style.display = "block";
        console.log("start is false");
        return;
    }
    //pause the animation
    paused = !paused;
    if (paused) {
        //change text to resume
        document.getElementById("pause").innerHTML = "Resume";
    }

    animate();
});

//get the value of the next-generation button
document.getElementById("next-generation").addEventListener("click", function () {
    nextGeneration = !nextGeneration;
});






/*
animate();
*/

function animate() {

    trafficCarMostForward = traffic.find (
        c=>c.y==Math.min(...traffic.map(c=>c.y))
    );

    //find the car that is most forward and is not damaged
    bestCar = cars.find(
        c => c.y === Math.min(...cars.map(c => c.y))
    );






    //check how many times animate has been called
    console.log("animate called");
    if (allCarsDamaged()) {
        generation++;
        document.getElementById("generation").innerHTML = generation;

        bestCar.damaged = false;
        randomLane = Math.floor(Math.random() * (numLanes)) + 1;
        bestCar.x = road.getLaneCenter(randomLane);
        bestCar.speed = 0;
        
        numCars = document.getElementById("cars-slider").value;
        
        cars = generateCars(numCars);

        const json_network = JSON.stringify(bestCar.network);

        const mutationRate = document.getElementById("mutation-slider").value;

        for (let i = 0; i < cars.length; i++) {
            cars[i].network = JSON.parse(json_network);
            if (i != 0) {
                NeuralNetwork.mutate(cars[i].network, mutationRate);
            }
        }
        
        bestCar_y = bestCar.y;

        let numTrafficCars = document.getElementById("traffic-slider").value;
        numTrafficCars = parseInt(numTrafficCars);
        numTrafficCars = numTrafficCars > 0 ? numTrafficCars : 1;
        traffic = [];
        traffic_lanes = [];
        if (numTrafficCars > 5) {
            //make sure there are 3 cars in 3 lanes
            for (let i = 0; i < 5; i++) {
                traffic.push(new Car(road.getLaneCenter(i + 1),
                (-1 * Math.floor(Math.random() * 700) + bestCar_y - 300), 50, 30, 'orange', "dummy"));
            }
            //then randomly generate the rest of the cars
            for (let i = 0; i < numTrafficCars - 5; i++) {
                traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random() * numLanes) + 1),
                (-1 * Math.floor(Math.random() * 800) + bestCar_y - 100), 50, 30, 'orange', "dummy"));
            }

        } else {
            //if there are less than 3 cars, just randomly generate them
            for (let i = 0; i < numTrafficCars; i++) {
                traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random() * numLanes) + 1),
                (-1 * Math.floor(Math.random() * 700) + bestCar_y - 200), 50, 30, 'orange', "dummy"));
            }
        }
        


        
        
        //if there is an item in local storage, delete it
        if (localStorage.getItem("bestCar")) {
            localStorage.removeItem("bestCar");
        }
        //store the best car network as json in local storage
        localStorage.setItem("bestCar", json_network);
        


    } 

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].updatePosition(road.borders, []);
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].updatePosition(road.borders, traffic);
    }
    

    canvas.height = window.innerHeight - window.innerHeight * 0.1;

    ctx.save();
    ctx.translate(0, -bestCar.y + canvas.height * 0.65);

    road.drawRoad(ctx);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].drawCar(ctx);
    }

    
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < cars.length; i++) {
        cars[i].drawCar(ctx, false);
    }

    ctx.globalAlpha = 1;
    bestCar.drawCar(ctx, true);
    //car.drawCar(ctx);

    ctx.restore();


    if (!paused) {
        requestAnimationFrame(animate);
     } //this is a recursive function that calls itself over and over again
}

function allCarsDamaged() {

    if (nextGeneration) {
        nextGeneration = false;
        return true;
    }

    const bestCarPoisiton = bestCar.y;

    if (bestCarPoisiton < (trafficCarMostForward.y - 200) && bestCar.y < trafficCarMostForward.y) {
        return true;
    }

    const difference = Math.abs(bestCarPoisiton - trafficCarMostForward.y);
    //if the best car is too far away from the traffic
    if (difference > 1200) {
        //console.log("best car difference is too far away from traffic");
        return true;
    }


    
    //check if all cars near the best car are damaged
    for (let i = 0; i < cars.length; i++) {
        if (cars[i].y > bestCarPoisiton - 100 && cars[i].y < bestCarPoisiton + 100) {
            if (!cars[i].damaged) {
                const distanceToTraffic = Math.abs(cars[i].y - trafficCarMostForward.y);
                if (distanceToTraffic < 1200 || cars[i].speed > 1) {
                    return false;
                }
            }
        }
    } 
    //console.log("all cars are damaged");
    return true;
}