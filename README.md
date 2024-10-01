Drone Project (GCS)

Overview

A Ground Control Station (GCS), which serves as a critical component for drone operations. The GCS facilitates seamless communication between the drone and the operator, handling video streaming, control signal transmission, and sensor integration to ensure efficient and reliable drone performance.

Client:

 - Video Stream Reception: Connects to the GCS server to receive live video streams.
 - Control Signal Transmission: Sends control commands to the server based on user inputs.
Server:

 - WebRTC Video Feed: Streams live video feeds using WebRTC technology for real-time communication.
 - MAVLink Communication: Sends control signals to the drone using the MAVLink protocol, ensuring reliable and efficient command transmission.

Controller Service:
 - The Controller Service bridges the user interface with the GCS server, enabling real-time control of the drone through a Nintendo Switch controller.

Signal Reading:
 - Interfaces with the Nintendo Switch controller to read user inputs.
Signal Transmission:
 - Transmits the read signals to the GCS server, translating user actions into actionable drone commands.
Sensor Integration
 - Our project primarily focuses on integrating essential sensors to enhance the drone's operational capabilities. The integrated sensors include:

- GPS (Global Positioning System): Provides accurate positioning data for navigation.
- Rangefinder: Measures the distance to obstacles, aiding in obstacle avoidance.
- LiDAR (Light Detection and Ranging): Offers precise distance measurements and creates detailed 3D maps of the drone's surroundings.

For detailed examples and implementation, refer to the pro_gcs/VTX_example directory.

Real-Time Tracking
The Real-Time Tracking module introduces advanced computational methods to analyze and manage package drops on moving vehicles. This feature ensures accurate delivery tracking and enhances the reliability of the drone's delivery capabilities.

Installation
Prerequisites
Python 3.x: Ensure Python 3 is installed on your system. You can download it from the official website.
Steps
Clone the Repository

bash
Copy code
git clone https://github.com/jackmingming/drone.git
cd drone
Set Up a Virtual Environment (Optional but Recommended)

bash
Copy code
python3 -m venv venv
source venv/bin/activate
Install Required Dependencies
Run test

Usage
Starting the GCS Server
Navigate to the pro_gcs Directory


start:
cd pro_gcs

Client:

Run the Client
npm install

Dev / build:
```
    - `npm run dev` // electron app
    - `npm run dev-web` // react web only
    - `npm run build`   // build web and electron app
```

Server:
Run the Server
npm install 

Start server :
    `"start": "node ./src/services/Server.js"`
