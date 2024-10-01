import time
import os
from pymavlink import mavutil

# 1 CONNECTION ---------------------------------------------------------------------------
# Check for ttyACM0 or ttyACM1
while True:
   print("searching for ttyACMx")
   if os.path.exists('/dev/ttyACM0'):
      try:
         connection = mavutil.mavlink_connection('/dev/ttyACM0')
         print("ttyACM0 = " + str(connection) + ".. now break")
         break
      except:
         pass
   elif os.path.exists('/dev/ttyACM1'):
      try:
         connection = mavutil.mavlink_connection('/dev/ttyACM1')
         print("ttyACM1 = " + str(connection) + ".. now break")
         break
      except:
         pass
   print("sleep 1.01")
   time.sleep(1.01)
print("1 the connection = " + str(connection))

connection.wait_heartbeat()

# Get some information !
while True:
    try:
        print(connection.recv_match().to_dict())
    except:
        pass
    time.sleep(0.1)

# while True:
#     msg = connection.recv_msg()
#     if msg is not None:
#         mtype = msg.get_type()
#         if mtype == 'HEARTBEAT' and msg.type != mavutil.mavlink.MAV_TYPE_GCS:
#                 armed = connection.motors_armed()
#                 if armed:
#                     print("Armed")
#                 else:
#                     print("Disarmed")