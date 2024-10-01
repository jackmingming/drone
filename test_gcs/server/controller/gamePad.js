const JoyCon = require('./controller-hid');
const _ = require('lodash');
const logger = require('../logger/logger');

function init(cb) {

    JoyCon.findControllers((devices) => {
        // When found any device.
        logger.controllerLogger.info(`[INPUT REPORT:: devices] (${devices})`);
        devices.forEach(async (device) => {
            logger.controllerLogger.info(`Found a device (${device.meta.serialNumber})`);    
            // Add a handler for new device.
            device.manageHandler('add', (packet) => {
                //logger.controllerLogger.info(`[INPUT REPORT] (${device.meta.product})`);
                if(packet && packet.buttonStatus && packet.analogStickLeft && packet.analogStickRight) {
                    let controllerData = {
                        buttonStatus: packet.buttonStatus,
                        analogStickLeft: packet.analogStickLeft,
                        analogStickRight: packet.analogStickRight
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

module.exports = {
    init,
}