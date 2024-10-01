import findControllers from './controller-hid.js';
import FlightController from './flighController.js';
import logger from '../../utils/Logger.js';


class GamePad {
    constructor() {
        this.flightController = new FlightController();
        logger.info('[Controller] init GamePad!')
    }
    initController(cb) {
        findControllers((devices) => {
            devices.forEach(async (device) => {  
                // Add a handler for new device.
                device.manageHandler('add', (packet) => {
                    if(packet && packet.buttonStatus && packet.analogStickLeft && packet.analogStickRight) {
                        let controllerData = {
                            buttonStatus: packet.buttonStatus,
                            analogStickLeft: this.flightController.onJoyStick(packet.analogStickLeft.horizontal, packet.analogStickLeft.vertical),
                            analogStickRight: this.flightController.onJoyStick(packet.analogStickRight.horizontal, packet.analogStickRight.vertical)
                        };
                        if(cb) {
                            cb(controllerData)
                        }
                    }
                });
        
                const deviceInfo = await device.requestDeviceInfo();
                // await device.enableIMU();
                await device.disableIMU();
                // await device.enableVibration();
                await device.disableVibration();
            });
        });
    }
    getControllerSignal() {
        return this.flightController;
    }
}

export default GamePad;