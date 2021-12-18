class Ball {
    constructor(context, container) {
        this.ctx               = context
        this.container         = container
        this.size              = 15
        this.speed             = 5
        this.reset()
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'blue'
        this.ctx.arc(this.positionX, this.positionY, this.size, 0, 2 * Math.PI)
        this.ctx.fill()
    }

    moveBall() {
        this.detectEdgeCollision()

        this.positionX += this.speed * this.dirX
        this.positionY += this.speed * this.dirY
    }

    detectEdgeCollision() {
        // invert X direction
        if (this.container.width - this.positionX - this.size <= 0 || this.positionX - this.size <= 0) {
            this.dirX = -this.dirX
        }
        // invert Y direction
        if (this.positionY - this.size <= 0) {
            this.dirY = -this.dirY
        }

        // looser
        if (this.container.height - this.positionY - this.size <= 0) {
            this.looser = true
        }
    }

    detectPaddleCollision(paddle) {
        // vertical distance from the paddle
        let distanceY = this.container.height - this.positionY - this.size - paddle.sizeY - paddle.gap

        // horizontal distance from the paddle
        let distanceXLeftToRight = paddle.positionX - (this.positionX + this.size)
        let distanceXRightToLeft = (this.positionX - this.size) - (paddle.positionX + paddle.sizeX)

        if (distanceXLeftToRight <= 0 && distanceXRightToLeft <= 0) {
            if (distanceY < 1 && distanceY > -1) {
                this.dirY = -this.dirY
            } else if (distanceY < -1) {
                this.dirX = -this.dirX
            }
        }
    }

    randomDirection() {
        return (Math.floor(Math.random() * (1 - 0 + 1)) + 0) === 0 ? 1 : -1
    }

    reset() {
        this.positionX = (this.container.width / 2) - (this.size / 2)
        this.positionY = (this.container.height / 2) - (this.size / 2)
        this.dirX      = this.randomDirection()
        this.dirY      = this.randomDirection()
        this.looser    = false
    }
}

export {Ball}