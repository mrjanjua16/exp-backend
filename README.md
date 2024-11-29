# Expense Tracking Backend

Welcome to the repository for the Expense Tracking Backend, a robust application built with [AdonisJS](https://adonisjs.com/) and TypeScript. This backend system is designed to support an Expense Tracking application with the following core functionalities:

- **User Authentication & Authorization**
- **Expense Tracking & Management**
- **Ledger Management**

## Features

- **User Authentication & Authorization**: This module ensures secure user registration and login processes, incorporating role-based access control to manage permissions effectively.
- **Expense Tracking & Management**: This feature allows users to add, edit, delete, and categorize expenses, providing a comprehensive tool for expense management.
- **Ledger Management**: Facilitates the efficient management of financial ledgers, ensuring accurate tracking of financial transactions.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **AdonisJS CLI**: This can be installed globally using npm:
  ```bash
  npm install -g @adonisjs/cli
  ```

## Database Setup
Set up your database by configuring a PostgreSQL database or another database supported by AdonisJS.

## Installation

Follow these steps to get the backend up and running:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mrjanjua16/exp-backend.git
   cd exp-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Configuration

Configure the application as follows:
1. **Environment Variables**:
   - Start by duplicating the `.env.example` file and renaming it to `.env`.
   - Modify the environment variables according to your setup, focusing on database configurations.
   ```bash
   cp .env.example .env
   ```

2. **Generate Application Key**:
   - Secure your application by generating a new encryption key.
   ```bash
   node ace generate:key
   ```

## Database Operations

Manage your database with these commands:
1. **Run Migrations**:
   - Initialize your database schema using migrations.
   ```bash
   node ace migration:run
   ```

2. **Run Seeders**:
   - Optionally, populate your database with initial data using seed files.
   ```bash
   node ace db:seed
   ```

## Running the Application

To run the application, use the following commands:
1. **Development Server**:
   - Launch the development server which supports hot-reloading:
     ```bash
     npm run dev
     ```

2. **Production Build**:
   - Prepare the application for production deployment:
     ```bash
     npm run build
     ```

3. **Start the Production Server**:
   - Deploy the application in a production environment:
     ```bash
     npm run start
     ```

## Testing

Ensure the integrity and performance of your application:
- **Running Tests**:
  - Execute the comprehensive test suite to confirm functionality:
    ```bash
    npm run test
    ```

## Additional Information

For further details on the project structure, contributing guidelines, and more, please refer to the project documentation available in the `docs` folder. For any issues or contributions, please open an issue or submit a pull request.

Thank you for using or contributing to the Expense Tracking Backend!

