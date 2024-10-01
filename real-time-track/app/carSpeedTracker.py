import numpy as np
import time
import pyproj

class KalmanFilter:
    def __init__(self, process_variance=1e-3, measurement_variance=1e-1):
        """
        Initialize a Kalman Filter for more accurate speed calculation.
        :param process_variance: Variance in the process (how much we trust the model)
        :param measurement_variance: Variance in the measurement (how much noise is in the data)
        """
        self.process_variance = process_variance
        self.measurement_variance = measurement_variance
        self.estimate = 0.0
        self.error_estimate = 1.0

    def update(self, measurement):
        """
        Update the Kalman Filter with a new measurement.
        :param measurement: The new speed measurement
        :return: Updated filtered estimate of speed
        """
        # Kalman gain
        kalman_gain = self.error_estimate / (self.error_estimate + self.measurement_variance)

        # Update the estimate
        self.estimate += kalman_gain * (measurement - self.estimate)

        # Update error estimate
        self.error_estimate = (1.0 - kalman_gain) * self.error_estimate + abs(self.estimate) * self.process_variance

        return self.estimate

class CarSpeedTracker:
    def __init__(self, process_variance=1e-3, measurement_variance=1e-1):
        """
        Initialize the CarSpeedTracker with a Kalman filter.
        :param process_variance: Variance in the process (model accuracy)
        :param measurement_variance: Variance in the measurements (sensor noise)
        """
        self.geod = pyproj.Geod(ellps="WGS84")
        self.prev_position = None  # Stores previous position (lat, lon)
        self.prev_time = None  # Stores previous time
        self.kalman_filter = KalmanFilter(process_variance, measurement_variance)

    def calculate_car_speed(self, lat, lon):
        """
        Calculate the real-time speed of the car using a Kalman filter.
        :param lat: Latitude of the car in degrees
        :param lon: Longitude of the car in degrees
        :return: Estimated car speed in meters per second (filtered)
        """
        current_time = time.time()

        if self.prev_position is not None and self.prev_time is not None:
            # Previous coordinates and time
            prev_lat, prev_lon = self.prev_position
            time_elapsed = current_time - self.prev_time

            # Calculate the distance traveled (in meters)
            _, _, distance_travelled = self.geod.inv(prev_lon, prev_lat, lon, lat)

            # Calculate speed (distance / time)
            raw_speed = distance_travelled / time_elapsed

            # Apply Kalman filter for smoothing
            filtered_speed = self.kalman_filter.update(raw_speed)

        else:
            # No previous data, assume speed is 0 initially
            filtered_speed = 0.0

        # Update the previous position and time
        self.prev_position = (lat, lon)
        self.prev_time = current_time

        return filtered_speed


if __name__ == "__main__":
    # Initialize the CarSpeedTracker with Kalman filtering
    car_speed_tracker = CarSpeedTracker()

    # Simulated car GPS positions (replace with real GPS data)
    car_positions = [
        (34.0522, -118.2437),
        (34.0523, -118.2438),
        (34.0525, -118.2440),
        (34.0528, -118.2443)
    ]

    # Loop through simulated positions and calculate speed
    for position in car_positions:
        lat, lon = position

        # Get the car speed in real-time (filtered)
        car_speed = car_speed_tracker.calculate_car_speed(lat, lon)
        print(f"Estimated car speed: {car_speed:.2f} m/s")

        # Simulate time interval between positions
        time.sleep(0.5)