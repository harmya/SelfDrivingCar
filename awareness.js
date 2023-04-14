class Awareness {
    constructor(car) {
        this.car = car;
        this.visionCount = 5;
        this.visionLength = 120;
        this.visionSpread = Math.PI/2;
        this.vision = [];
        this.detectBorder = [];
    }

    updateVision(roadBorders, traffic) {
        this.#initVision();

        this.detectBorder = [];
        for (let i = 0; i < this.vision.length; i++) {
            const startVison = this.vision[i][0];
            const endVision = this.vision[i][1];
            const detectBorder = this.#detectBorder(startVison, endVision, roadBorders, traffic);
            this.detectBorder.push(detectBorder);
        }

    }

    drawVision(ctx) {
        for (let i = 0; i < this.vision.length; i++) {
            let endVision = this.vision[i][1];

            if (this.detectBorder[i]) {
                endVision = this.detectBorder[i];
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'lightgreen'
            ctx.moveTo(this.vision[i][0].x, this.vision[i][0].y);
            ctx.lineTo(endVision.x, endVision.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red'
            ctx.moveTo(this.vision[i][1].x, this.vision[i][1].y);
            ctx.lineTo(endVision.x, endVision.y);
            ctx.stroke();

        }
    }
    
    #initVision() {
        this.vision = [];
        for (let i = 0; i < this.visionCount; i++) {
            const angle = linearInterpolation(-this.visionSpread/2, this.visionSpread/2, i/(this.visionCount - 1));

            const startVison = { x: this.car.x, y: this.car.y };
            const endVision = {
                x: this.car.x - Math.sin(this.car.angle + angle) * this.visionLength,
                y: this.car.y - Math.cos(this.car.angle + angle) * this.visionLength
            };

            this.vision.push([startVison, endVision]);
        }
    }

    #detectBorder(startVison, endVision, roadBorders, traffic) {
        let borderHit = [];

        for (let i = 0; i < roadBorders.length; i++) {
            const hit = getVisionHit(startVison, endVision, roadBorders[i][0], roadBorders[i][1]);
            if (hit) {
                borderHit.push(hit);
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            const carRect = traffic[i].carRect;
            for (let j = 0; j < carRect.length; j++) {
                const hit = getVisionHit(startVison, endVision, carRect[j], carRect[ (j + 1) % carRect.length ]);
                if (hit) {
                    borderHit.push(hit);
                }
            }
        }

        if (borderHit.length > 0) {
            const hitDistances = borderHit.map(e => e.offset);
            const closestHit = Math.min(...hitDistances);
            return borderHit.find(e=>e.offset==closestHit);
        } else {
            return null;
        }

    }

}