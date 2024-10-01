import time
from pymavlink import mavutil
print("24.0617 my-land111_bbb.py ttyACM0")
print("1")

# 1 CONNECTION ---------------------------------------------------------------------------
msg2 = None;
while not msg2:
   try:
     connection = mavutil.mavlink_connection('/dev/ttyACM0')
     msg2 = "got connection"
     print("2 the connection = " + str(connection))
   except:
     pass
   print("sleep 1.2")
   time.sleep(1.2)

# 2 send heartbeat ---------------------------------------------------------------------------
connection.mav.heartbeat_send(mavutil.mavlink.MAV_TYPE_ONBOARD_CONTROLLER, mavutil.mavlink.MAV_AUTOPILOT_INVALID, 0, 0, 0)
print("2b heartbeat sent.. waiting for heartbeat")

# 2b wait_hearbeat
connection.wait_heartbeat()
print("Heartbeat from system (system %u component %u)" % (connection.target_system, connection.target_component))
print("3")

print("1 the connection = " + str(connection))

# 2b wait_hearbeat

connection.wait_heartbeat()
print("Heartbeat from system (system %u component %u)" % (connection.target_system, connection.target_component))
print("3")


# 3 COMMAND ---------------------------------------------------------------------------
# Define command_long_encode message that contains
#    command         21 MAV_CMD_NAV_LAND
#    command message    (none)
message = connection.mav.command_long_encode(
        connection.target_system,                       # Target system ID
        connection.target_component,                    # Target component ID
        mavutil.mavlink.MAV_CMD_COMPONENT_ARM_DISARM,               # ID of command to send
        0,                                              #
        #-----------------------------------------------------------------
        1,                                              # param1
        21196,                                              # param2
        0,                                              # param3
        0,                                              # param4
        0,                                              # param5
        0,                                              # param6
        0)                                              # param7
print("4")
# Send COMMAND_INT
connection.mav.send(message)
print("5")

# 3 RESPONSE ----------------------------------------------------------------------------
# Wait for response (blocking) to command / print result
response = connection.recv_match(type='COMMAND_ACK', blocking=True)
print("6")
if response:
    print("Command accepted")
    print("response.command ()                      = " + str(response.command))
    print("response.result  (0=MAV_RESULT_ACCEPTED) = " + str(response.result))
else:
    print("no response")
print("7")