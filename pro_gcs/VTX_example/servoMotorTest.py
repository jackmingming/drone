import serial
import time

# Set the serial port and baud rate
port = '/dev/ttyUSB0'  # Replace with your port name
baudrate = 9600  # Common for TTL adapters

# Open the serial port
ser = serial.Serial(port, baudrate, timeout=10)

def move_servo(angle):
    # Convert angle to pulse width for a 270-degree servo
    # Assume 500µs for 0°, 1500µs for 135°, and 2500µs for 270°
    pulse_width = int((angle / 270.0) * 2000 + 500)  # 500-2500µs for 0-270 degrees
    command = f'{pulse_width}\n'  # Send as string
    ser.write(command.encode())

print('ser: ', ser)
# Example: Move servo to 135 degrees (middle of the range)
move_servo(50)
time.sleep(1)

