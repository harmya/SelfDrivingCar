class Car {
    constructor(x, y, width, height, color, type) {
        //position and size of the car
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        //color of the car
        this.color = color;
        
        //movement attributes of the car
        this.maxForwardSpeed = type == "main" ? 5 : 2;
        this.maxBackwardSpeed = 2;
        this.angle = 0;
        this.speed = 0;
        this.acceleration = 0.2;
        this.friction = 0.09;

        //controls of the car
        this.controls = new Controls(type);

        //car awareness
        
        this.awareness = type == "main" ? new Awareness(this) : null;

        //rectangle around the car
        this.carRect = this.#createRectAroundCar();

        //car damage
        this.damaged = false;
    }

    drawCar(ctx) {

        if (this.damaged) {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = this.color;
        }

        
        ctx.beginPath();
        ctx.moveTo(this.carRect[0].x, this.carRect[0].y);

        for (let i = 1; i < this.carRect.length; i++) {
            ctx.lineTo(this.carRect[i].x, this.carRect[i].y);
        }

        ctx.fill();

        /*
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
        */

        //draw the awareness of the car
        if (this.awareness) {
            this.awareness.drawVision(ctx);
        }
    
    }

    updatePosition(roadBorders) {
        if (!this.damaged) {
            this.#moveCar();
            this.carRect = this.#createRectAroundCar();
            this.damaged = this.#checkDamage(roadBorders);
        }
        if (this.awareness) {
            this.awareness.updateVision(roadBorders);
        }
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
        
        
        
        if (this.x < this.width / 2) {
            this.x = this.width / 2;
        }
        if (this.x > canvas.width - this.width / 2) {
            this.x = canvas.width - this.width / 2;
        }
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
        }
        

        
        this.x -= this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }

    #createRectAroundCar() {
        const points = [];

        const rad = Math.hypot(this.width, this.height) / 2;
        const angle = Math.atan(this.height / this.width);

        points.push({
            x: this.x - rad * Math.sin(this.angle - angle + 0.2),
            y: this.y - rad * Math.cos(this.angle - angle + 0.2)
        });

        points.push({
            x: this.x - rad * Math.sin(this.angle + angle - 0.2),
            y: this.y - rad * Math.cos(this.angle + angle - 0.2)
        });

        points.push({
            x: this.x - rad * Math.sin(this.angle - angle + Math.PI),
            y: this.y - rad * Math.cos(this.angle - angle + Math.PI)
        });

        points.push({
            x: this.x - rad * Math.sin(this.angle + angle + Math.PI),
            y: this.y - rad * Math.cos(this.angle + angle + Math.PI)
        });

        return points;

    }

    #checkDamage(roadBorders) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polysIntersect(this.carRect, roadBorders[i])) {
                console.log('car damaged');
                return true;
            }
        }
        return false;
    }


}