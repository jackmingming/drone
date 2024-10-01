import math
import numpy as np

class PackageDropper:
    def __init__(self, drone_speed, car_speed, wind_speed, drone_altitude, drop_distance):
        """
        Initialize the PackageDropper with relevant parameters.
        :param drone_speed: Speed of the drone in m/s
        :param car_speed: Speed of the car in m/s
        :param wind_speed: Speed of wind in m/s (positive in the same direction as drone, negative otherwise)
        :param drone_altitude: Altitude of the drone in meters
        :param drop_distance: Horizontal distance between the drone and car at drop time in meters
        """
        self.drone_speed = drone_speed
        self.car_speed = car_speed
        self.wind_speed = wind_speed
        self.drone_altitude = drone_altitude
        self.drop_distance = drop_distance
        self.g = 9.81  # Gravitational acceleration in m/s²

    def calculate_drop_time(self):
        """
        Calculate the time it takes for the package to fall from the drone to the car considering altitude.
        Uses the projectile motion formula for vertical displacement.
        :return: Time in seconds
        """
        return math.sqrt((2 * self.drone_altitude) / self.g)

    def calculate_required_lead(self):
        """
        Calculate the required lead distance to account for the relative motion of the car and drone.
        :return: Lead distance in meters
        """
        drop_time = self.calculate_drop_time()
        # Relative speed between drone and car in the horizontal direction
        relative_speed = (self.drone_speed + self.wind_speed) - self.car_speed
        
        # The horizontal distance the car will travel in the drop time
        car_travel = self.car_speed * drop_time
        
        # The distance the drone will travel while the package is falling
        drone_travel = (self.drone_speed + self.wind_speed) * drop_time
        
        # Calculate lead distance (when to drop the package)
        lead_distance = self.drop_distance + drone_travel - car_travel
        
        return lead_distance

    def execute_drop(self):
        """
        Execute the drop by calculating the lead distance and confirming drop timing.
        :return: Tuple (lead_distance, drop_time)
        """
        lead_distance = self.calculate_required_lead()
        drop_time = self.calculate_drop_time()
        
        return lead_distance, drop_time

if __name__ == "__main__":
    # Example parameters
    drone_speed = 50 / 3.6  # Drone speed in m/s (converted from km/h)
    car_speed = 60 / 3.6    # Car speed in m/s (converted from km/h)
    wind_speed = 5 / 3.6    # Wind speed in m/s (converted from km/h)
    drone_altitude = 100    # Drone altitude in meters
    drop_distance = 80      # Desired drop distance in meters

    dropper = PackageDropper(drone_speed, car_speed, wind_speed, drone_altitude, drop_distance)
    
    lead_distance, drop_time = dropper.execute_drop()
    print(f"Drop the package when horizontal distance is {lead_distance:.2f} meters")
    print(f"Time for the package to reach the car: {drop_time:.2f} seconds")
