class Road {
    constructor(x, width, lanes) {
        this.x = x;
        this.width = width;
        this.lanes = 3;
        this.laneWidth = this.width/this.lanes;

        this.left = x - this.width/2;
        this.right = x + this.width/2;

        const indefinite = 100000;
        this.top = -indefinite;
        this.bottom = indefinite;

        const topLeft = {x: this.left, y: this.top};
        const topRight = {x: this.right, y: this.top};
        const bottomLeft = {x: this.left, y: this.bottom};
        const bottomRight = {x: this.right, y: this.bottom};



        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];


    }

    drawRoad(ctx) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';

        for (let i = 1; i <= this.lanes - 1; i++) {
            const x = linearInterpolation(this.left, this.right, i/this.lanes);

            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        }
        );
    }

    getLaneCenter(laneNumber) {
        const laneWidth = this.width/this.lanes;
        const laneCenter = this.left + laneWidth/2 + laneWidth * (laneNumber - 1);
        return laneCenter;
    }
}
