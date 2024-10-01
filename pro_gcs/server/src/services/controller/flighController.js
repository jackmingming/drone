import logger from "../../utils/Logger.js";

class FlightController {
    constructor() {
        this.data = {
            joystickX: 2048,
            minJoystickX: 0,
            maxJoystickX: 4095,
            joystickY: 2047,
            minJoystickY: 0,
            maxJoystickY: 4094,
            deadZone:  0,
            prevHeadingAngle: 0,
            currentAngle: 0,
        }
        logger.info('[Controller] filter controller data');
    }
    setData(updatedData) {
        this.data = Object.assign(this.data, updatedData);
    }
    onButtonPress(id, value) {
        //send the button and value back
    }
    onJoyStick(joystickX = this.data.joystickX, joystickY = this.data.joystickY) {
        const xPosition =this._xAxis(joystickX);
        const yPosition =this._yAxis(joystickY);

        return {xPosition, yPosition}
    }
    _xAxis(joystickX) {
        const xRange = this.data.maxJoystickX - this.data.minJoystickX;
        const joystickCenterX = (this.data.minJoystickX + this.data.maxJoystickX) / 2;
        const joystickXOffset =  joystickX - joystickCenterX;
       

        // Apply dead zone
        const joystickXFiltered = Math.abs(joystickXOffset) < this.data.deadZone ? 0 : joystickXOffset;

        //Calculate heading angle
        let headingAngle = (joystickXFiltered / (xRange / 2)) * 360; // Scale to [-180, 180] range
            headingAngle = (headingAngle < 0) ? (360 + headingAngle) : headingAngle; // Ensure positive value

        return headingAngle;
    }
    _yAxis(joystickY) {
        // Convert joystick Y position to pitch angle (-90 to 90 degrees) with dead zone
        const yRange = this.data.maxJoystickY - this.data.minJoystickY;
        const joystickCenter = (this.data.minJoystickY + this.data.maxJoystickY) / 2;
        const joystickYOffset = joystickY - joystickCenter;
        let pitchDirection = '';

        // Apply dead zone
        const joystickYFiltered = Math.abs(joystickYOffset) < this.data.deadZone ? 0 : joystickYOffset;

        // Calculate pitch angle
        const pitchAngle = -(joystickYFiltered / (yRange / 2)) * 90; // Invert and scale

        // Determine the pitch direction
        if (pitchAngle > 0) {
            pitchDirection = 'Upward'; // Positive pitch angle indicates upward direction
        } else if (pitchAngle < 0) {
            pitchDirection = 'Downward'; // Negative pitch angle indicates downward direction
        } else {
            pitchDirection = 'center';
        }
        
        return pitchAngle;
    }
    _headingAngle(headingAngle) {
        let headingDirection = '';

        if (headingAngle >= 0 && headingAngle < 180) {
            headingDirection = 'Right'; // Heading angle from 0 to 180 degrees indicates turning right
        } else if (headingAngle >= 180 && headingAngle <= 360) {
            headingDirection = 'Left'; // Heading angle from 180 to 360 degrees indicates turning left
        }
    
        return headingDirection;
    }
}

export default FlightController;