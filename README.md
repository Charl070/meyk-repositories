# GitHub Repository Explorer

A GitHub Repository Explorer built using React, TypeScript, and Tailwind CSS. The application allows users to search for repositories, view detailed information about each repository, and analyze issues using visual data representation.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Design Choices](#design-choices)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)


## Features
- Search GitHub repositories by name
- View detailed information about each repository
- Visual breakdown of issues using charts
- Filter issues based on their state (open/closed)
- Responsive and user-friendly UI

## Technologies
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Type safety and improved developer experience
- **React Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Victory** - Chart library for visual data representation
- **React Router** - For routing within the application
- **GitHub REST API** - To fetch repository data and issues

## Design Choices
1. **User Interface**: 
   - **Tailwind CSS**: A utility-first CSS framework was used to create a modern, responsive design. This allowed for rapid prototyping and styling without writing much custom CSS.
   
2. **State Management**:
   - **React Query**: React Query was used for data fetching, caching, and synchronization with the GitHub API. This choice simplifies state management and improves data handling performance.

3. **Data Visualization**:
   - **Victory**: Victory was chosen for the pie chart visualization of issue breakdowns, providing a clean and simple way to represent data.

4. **Code Structure**:
   - The application follows a component-based architecture, where each UI part is modularized into reusable components. TypeScript is used throughout to ensure type safety and catch errors during development.

## Getting Started
### Prerequisites
- Node.js (v16.x or above)
- npm (v8.x or above)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Charl070/meyk-repositories.git
   cd meyk-repositories

2. Install the dependencies:
   ```bash
   npm install

## Usage
1. Start the development server:
```bash
npm start
The application will run at http://localhost:3000.
Open your browser and navigate to http://localhost:3000.
   
