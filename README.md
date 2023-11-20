# MeasurementControl

## Overview

This repository contains the source code for a full-stack web application built with Vite (for the client) and Node.js (for the server) using TypeScript for both frontend and backend development. The project aims to demonstrate a modern and efficient development setup for building fast and scalable web applications, incorporating GraphQL for efficient data fetching. The GraphQL server includes a subscription endpoint, allowing real-time communication capabilities.

## Getting Started

1. Clone the Repository

```
git clone https://github.com/mstefa/MeasurementControl.git
cd your-repo
```

2. Install Dependencies

### Client (Vite with TypeScript)

```
cd client
npm install
```

### Server (Node.js with TypeScript)

```
cd server
npm install
```

3. Run the Application

### Client (Vite with TypeScript)

```
npm run dev
```

Client will be running on: http://localhost:5173

### Server (Node.js with TypeScript)

```
npm run dev
```

The server is set to run on http://localhost:4000/ with a designated route, /subscription, designed for handling subscriptions using Apollo Server's real-time communication capabilities.

## Description

Server

Assumptions:
The server operates continuously in a loop to simulate an application that listens to external input, providing an object with the measurements of a part. Within this loop, a mock measurement object is generated, featuring random values for a specified part. It is assumed that this input may correspond to different parts. Consequently, the use case is designed to search for a "Part" object, which stores expected dimensions and tolerances. These parts are expected to be stored in a database or configuration. To simulate searching for these objects, a "PartRepository" has been implemented. For this exercise, a "StaticPartRepository" has been created, always returning the same mocked part.

Domain Overview:

Part: define expected dimensions and tolerance.
MeasurementValue: DTO received from the system conducting dimension control.
MeasurementControl: summarize information by comparing expected and current dimensions. This object includes the deviation and status.

The business logic can be followed starting from the file 'ReadMeasurement.ts.' This class contains the use case logic, orchestrating the interaction with domain objects. The use case aims to find the corresponding part for a given measurement, comparing the received measurement to the expected dimensions of a part, and creating a "MeasurementControl" object that consolidates the information.

Client

The frontend is a straightforward React app featuring only one page, and the state of this component serves as the global state for the entire application. This state gets updated each time the client receives an event containing information on 'MeasurementControl.'
