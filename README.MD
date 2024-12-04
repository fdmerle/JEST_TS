# GoRest API v2 Testing with SuperTest and Jest

This project demonstrates how to test the GoRest API v2 using SuperTest and Jest in a TypeScript environment. It includes tests for creating, reading, verifying, and deleting user data, along with proper cleanup after each test.

## Prerequisites

Ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)

## Getting Started

### Installation

1. Clone this repository or copy the code to your project directory.
2. Navigate to the project directory and install the necessary dependencies:

    ```bash
    npm install jest @types/jest ts-jest supertest @types/supertest
    ```

## Project Structure

Here's an overview of the project structure:
. ├── user_utils.ts ├── user.test.ts├── jest.config.js└── tsconfig.json

### user_utils.ts 
This file contains utility functions for user creation and deletion.
### user.test.ts
This file contains the tests for creating, reading, verifying, and deleting user data, along with proper cleanup.

### Running Tests
To run the tests, use the following command:
npx jest
This command will execute all the tests and provide the results in the terminal.

## Configuration
### Jest Configuration (jest.config.js)
Ensure you have Jest configured for TypeScript:
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node'
};
### TypeScript Configuration (tsconfig.json)
Ensure you have TypeScript configured properly:

{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true
    },
    "exclude": [
        "node_modules"
    ]
}

## Conclusion
This project demonstrates how to use SuperTest and Jest to test the GoRest API v2. It includes tests for creating, reading, verifying, and deleting user data, along with proper cleanup to ensure tests do not leave residual data.
