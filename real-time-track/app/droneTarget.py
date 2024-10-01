import math
import numpy as np
import pyproj
import time

class DroneTarget:
    def __init__(self, lat_d, lon_d, alt_d, roll, pitch, yaw):
        """
        Initialize the DroneTarget with drone's GPS coordinates and attitude.
        :param lat_d: Latitude of the drone in degrees
        :param lon_d: Longitude of the drone in degrees
        :param alt_d: Altitude of the drone in meters
        :param roll: Roll angle of the drone in degrees
        :param pitch: Pitch angle of the drone in degrees
        :param yaw: Yaw angle of the drone in degrees
        """
        self.lat_d = lat_d
        self.lon_d = lon_d
        self.alt_d = alt_d
        self.roll = roll
        self.pitch = pitch
        self.yaw = yaw
        self.geod = pyproj.Geod(ellps="WGS84")

    def euler_to_rotation_matrix(self, roll, pitch, yaw):
        """Convert Euler angles (roll, pitch, yaw) to a rotation matrix."""
        roll_rad = math.radians(roll)
        pitch_rad = math.radians(pitch)
        yaw_rad = math.radians(yaw)

        R_x = np.array([
            [1, 0, 0],
            [0, math.cos(roll_rad), -math.sin(roll_rad)],
            [0, math.sin(roll_rad), math.cos(roll_rad)]
        ])

        R_y = np.array([
            [math.cos(pitch_rad), 0, math.sin(pitch_rad)],
            [0, 1, 0],
            [-math.sin(pitch_rad), 0, math.cos(pitch_rad)]
        ])

        R_z = np.array([
            [math.cos(yaw_rad), -math.sin(yaw_rad), 0],
            [math.sin(yaw_rad), math.cos(yaw_rad), 0],
            [0, 0, 1]
        ])

        R = R_z @ R_y @ R_x
        return R

    def gps_to_cartesian(self, lat, lon, alt):
        """Convert GPS coordinates to ECEF Cartesian coordinates."""
        a = 6378137.0  # Earth's semi-major axis in meters
        e = 8.181919e-2  # Earth's first eccentricity squared

        lat_rad = math.radians(lat)
        lon_rad = math.radians(lon)
        N = a / math.sqrt(1 - e**2 * math.sin(lat_rad)**2)  # Prime vertical radius of curvature

        X = (N + alt) * math.cos(lat_rad) * math.cos(lon_rad)
        Y = (N + alt) * math.cos(lat_rad) * math.sin(lon_rad)
        Z = ((1 - e**2) * N + alt) * math.sin(lat_rad)
        return X, Y, Z

    def cartesian_to_gps(self, X, Y, Z):
        """Convert ECEF Cartesian coordinates back to GPS coordinates."""
        a = 6378137.0
        e = 8.181919e-2

        lon = math.atan2(Y, X)
        p = math.sqrt(X**2 + Y**2)
        lat = math.atan2(Z, p * (1 - e**2))
        N = a / math.sqrt(1 - e**2 * math.sin(lat)**2)
        alt = p / math.cos(lat) - N

        lat = math.degrees(lat)
        lon = math.degrees(lon)
        return lat, lon, alt

    def calculate_car_position(self, distance, angle):
        """
        Calculate the car's position and the horizontal distance between the drone and the car.
        :param distance: Distance to the car in meters
        :param angle: Angle of the rangefinder from the horizontal plane in degrees
        :return: Tuple (Latitude, Longitude, Altitude, Horizontal Distance)
        """
        # Convert drone's position to Cartesian coordinates
        X_d, Y_d, Z_d = self.gps_to_cartesian(self.lat_d, self.lon_d, self.alt_d)

        # Convert drone's attitude to rotation matrix
        R = self.euler_to_rotation_matrix(self.roll, self.pitch, self.yaw)

        # Calculate horizontal and vertical distances
        angle_rad = math.radians(angle)
        D_h = distance * math.cos(angle_rad)
        D_v = distance * math.sin(angle_rad)

        # Calculate car's position in drone's coordinate system
        car_local = np.array([D_h, 0, D_v])

        # Rotate car_local position to global coordinate system
        car_global = R @ car_local

        # Calculate car's position in Cartesian coordinates
        X_c = X_d + car_global[0]
        Y_c = Y_d + car_global[1]
        Z_c = Z_d + car_global[2]

        # Convert the car's Cartesian coordinates back to GPS coordinates
        lat_c, lon_c, alt_c = self.cartesian_to_gps(X_c, Y_c, Z_c)

        # Calculate the horizontal distance between drone and car
        horizontal_distance = math.sqrt((X_c - X_d)**2 + (Y_c - Y_d)**2)

        return lat_c, lon_c, alt_c, horizontal_distance

    def update_drone_position(self, lat_d, lon_d, alt_d, roll, pitch, yaw):
        """Update the drone's position and attitude in real time."""
        self.lat_d = lat_d
        self.lon_d = lon_d
        self.alt_d = alt_d
        self.roll = roll
        self.pitch = pitch
        self.yaw = yaw

if __name__ == "__main__":
    locator = DroneTarget(lat_d=34.0522, lon_d=-118.2437, alt_d=70, roll=0, pitch=0, yaw=0)

    # Simulate real-time updates in a loop (replace with actual sensor data updates)
    try:
        while True:
            # Simulate drone's real-time GPS and attitude data (replace with actual sensor data)
            lat_d = 34.0522  # Example latitude (update with actual GPS data)
            lon_d = -118.2437  # Example longitude (update with actual GPS data)
            alt_d = 70  # Example altitude (update with actual sensor data)
            roll = 0  # Example roll (update with IMU data)
            pitch = 0  # Example pitch (update with IMU data)
            yaw = 0  # Example yaw (update with IMU data)

            # Update drone's position and attitude
            locator.update_drone_position(lat_d, lon_d, alt_d, roll, pitch, yaw)

            # Distance and angle from the rangefinder (replace with actual sensor data)
            distance = 80  # meters
            angle = 40  # degrees

            # Calculate car's position and horizontal distance
            lat_c, lon_c, alt_c, horizontal_distance = locator.calculate_car_position(distance, angle)
            print(f"Car's estimated position: Latitude = {lat_c}, Longitude = {lon_c}, Altitude = {alt_c}")
            print(f"Horizontal distance between drone and car: {horizontal_distance:.2f} meters")

            # Sleep to simulate real-time update rate (e.g., 10 Hz)
            time.sleep(0.1)  # Update every 100 ms (replace based on sensor update rate)
    except KeyboardInterrupt:
        print("Real-time tracking stopped.")
