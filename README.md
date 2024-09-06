# Widget Library

This is a JavaScript library for initializing and managing widgets in a DOM environment. It is designed to work both in the browser and in Node.js using JSDOM for testing.

## Project Structure

- **core/index.js**: Core file of the library.
- **__tests__/**: Contains unit tests for the library.
- **widgets/**: Directory for widget modules.
- **index.html**: File with UI for dev and testing 

## Prerequisites

- Node.js (tested on v22)
- npm

## Installation

1. Clone the repository
2. Install the dependencies:
```bash
npm install
```

## Running the Development Server

To start the local development server, run:

```bash 
npm run dev
```

This will start a server using `http-server`.

## Running Tests

To execute the unit tests with Jest, run:

```bash 
npm run test
```