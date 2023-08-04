# PerfAnalytics
PerfAnalytics is an open-source project aimed at measuring and analyzing performance metrics. It provides a comprehensive solution for gathering performance data, visualizing insights, and making informed optimizations. The project is built using NestJS for the backend, Kafka for data streaming, and Next.js for the client-side interface.

## Features
- Collects and analyzes performance metrics to identify bottlenecks and areas for optimization.
- Real-time data streaming through Kafka for seamless performance tracking.
- User-friendly dashboard powered by Next.js for visualizing performance insights.
- Easily extensible and customizable architecture to suit your specific needs.

## Getting Started
Follow these steps to get PerfAnalytics up and running:

### Prerequisites
- Node.js (version 16 recommended)
- Yarn package manager

### Installation
1. Clone the PerfAnalytics repository:
```sh
git clone https://github.com/Trendyol/perfanalytics.git
```
2. Navigate to the project directory:
```sh
cd perfanalytics
```
3. Install backend dependencies:
```sh
cd backend
yarn install
````
4. Install frontend dependencies:
```sh
cd ../client
yarn install
```
5. Install lighthouse dependencies:
```sh
cd ../lighthouse
yarn install
```

## Configuration
1. Open the backend/.env file and configure any necessary environment variables, such as database connections or API keys.

2. Open the lightouse/.env file and configure any necessary environment variables, such as Kafka connection information.

3. Open the client/.env.local file and set any environment variables required for the frontend.

## Running the Application
1. Start the backend server:
```sh
cd backend
yarn start:dev
```
2. Start the frontend server:
```sh
cd client
yarn dev
```
3. Start the lighthouse server:
```sh
cd lighthouse
yarn start
```

## Continuous Integration
The project includes a GitHub Actions workflow for continuous integration. The workflow includes the following jobs:

- Pre-check: Checks for changes in the client and backend code and triggers corresponding jobs if changes are detected.

- Client: Builds and deploys the client application.

- Backend: Builds and deploys the backend application.

- Lighthouse: Builds and deploys the lighthouse application.

## Contributing
We welcome contributions! If you'd like to contribute to PerfAnalytics.

## License
This project is licensed under the MIT License.