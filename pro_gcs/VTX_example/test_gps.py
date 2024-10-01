import serial, time, pynmea2

port = '/dev/ttyUSB0'
baud = 9600

serialPort = serial.Serial(port, baudrate=baud, timeout=0.5)
while True:

    str = ''
    try:
        str = serialPort.readline().decode().strip()
    except Exception as e:
        print(e)
    # print(str)

    if str.find('GGA') > 0:
        try:
            msg = pynmea2.parse(str)
            print(msg.timestamp, 'Lat:', round(msg.latitude, 6), 'Lon:', round(msg.longitude, 6), 'Alt:', msg.altitude,
                  'Sats:', msg.num_sats)
        except Exception as e:
            print(e)
    time.sleep(0.1)

