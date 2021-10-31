// Get the Input bruh
class Input {

    static GetAxis() {
        let x = keyIsDown(LEFT_ARROW) || keyIsDown(65)  ? -1 : keyIsDown(RIGHT_ARROW) || keyIsDown(68) ? 1 : 0
        let y = keyIsDown(UP_ARROW) || keyIsDown(87) ? -1 : keyIsDown(DOWN_ARROW) || keyIsDown(83) ? 1 : 0
        return createVector(x, y)
    }

    static GetJump(){
        return keyIsDown(32) || keyIsDown(UP_ARROW) || keyIsDown(87)
    }

    static GetSlide() {
        return keyIsDown(16)

    }
}