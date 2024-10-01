import serial
import time

# Configuration for serial connection
serial_port = '/dev/ttyUSB0'  # Adjust according to your device
baud_rate = 115200  # Adjust according to your rangefinder's settings
command = "<MAcont>"  # ASCII command for single ranging


def communicate_with_rangefinder():
    buf = bytearray()
    try:
        with serial.Serial(serial_port, baud_rate, timeout=1) as ser:
            print("Starting communication with rangefinder...")

            # Send the ASCII command to the rangefinder
            encoded_command = command.encode('ascii')
            ser.write(encoded_command)
            print(f"Sent command: {encoded_command}")

            # Allow time for the rangefinder to process and respond
            time.sleep(1)

            # Read the response from the rangefinder
            if ser.in_waiting > 0:
                response = ser.readline().decode('ascii').strip()
                data =ser.readline();
                i = data.find(b"\n")
                if i >= 0:
                    r = buf + data[:i + 1]
                    buf[0:] = data[i + 1:]
                    print('r: ', r)
                    print('buf: ', buf)
                if response == "ERRff":
                    print("Received ERRff: Invalid command or communication error.")
                elif response.startswith("ERR"):
                    print(f"Received error: {response}")
                else:
                    print(f"Response: {response}")
            else:
                print("No response received.")

    except serial.SerialException as e:
        print(f"Serial exception: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")


if __name__ == "__main__":
    while True:
        communicate_with_rangefinder()
