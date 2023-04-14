class Car {
    constructor(x, y, width, height, color) {
        //position and size of the car
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //color of the car
        this.color = color;
        
        //movement attributes of the car
        this.maxForwardSpeed = 5;
        this.maxBackwardSpeed = 2;
        this.angle = 0;
        this.speed = 0 ;
        this.acceleration = 0.2;
        this.friction = 0.09;

        //controls of the car
        this.controls = new Controls();
    }

    drawCar(ctx) {
        //save the current state of the canvas
        ctx.save();

        //translate the canvas to the center of the car
        ctx.translate(this.x, this.y);
        
        //rotate the canvas to the angle of the car
        ctx.rotate(-this.angle);

        //import the car image
        const carImage = new Image();
        carImage.src = 'assets/car.png';
        ctx.drawImage(carImage, -this.width/2, -this.height/2, this.width,this.height);

        //restore the canvas to its original state
        ctx.restore();
    
    }

    updatePosition() {
        this.#moveCar();

    }

    #moveCar() {
        // car accelerates when controls are pressed
        if (this.controls.up) {
            this.speed += this.acceleration;
        }
        if (this.controls.down) {
            this.speed -= this.acceleration;
        }

        
        //car cannot go faster than max speed
        if (this.speed > this.maxForwardSpeed) {
            this.speed = this.maxForwardSpeed;
        }

        //car cannot go faster in reverse than max speed
        if (this.speed < -this.maxBackwardSpeed) {
            this.speed = -this.maxBackwardSpeed;
        }

        //friction is applied to the car in the opposite direction of the car's movement
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        //when the speed becomes smaller than the friction, the car stops
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        
        if (this.speed  != 0) {
            const invert = this.speed > 0 ? 1 : -1;

            if (this.controls.left) {
                this.angle += 0.03 * invert;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * invert;
            }
        }
        
        

        if (this.x < this.width) {
            this.x = this.width;
        }
        if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
        }
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
        }

        
        this.x -= this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}