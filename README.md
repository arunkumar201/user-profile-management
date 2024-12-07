# Profile Management Application

A React TypeScript application for managing user profiles with features like form validation, routing, and data persistence.

## Features

- Create and edit user profiles
- Form validation 
- React Router for navigation
- Context API for state management
- JSON Server for API simulation
- Error handling with Error Boundaries
- Loading states and spinners
- Code splitting and lazy loading
- Performance optimizations with useCallback and memo
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- pnpm

## Installation

2. Install dependencies:

```bash
pnpm install
```


## Running the Application

1. Start the JSON Server (API):
```bash
pnpm run server
```


2. In a new terminal, start the development server:
```bash
pnpm run start:dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

The application uses different environment variables for development and production:

- `.env.development` - Development environment configuration
- `.env.production` - Production environment configuration

## Project Structure

- `/src`
  - `/components` - React components
  - `/context` - Context providers
  - `/services` - API and service functions
  - `/types` - TypeScript interfaces and types
  - `/constants` - Constants
  - `/utils` - Utility functions
  - `/pages` - Page components
  - `App.tsx` - Main application component

## Performance Optimizations

1. Code Splitting
   - Lazy loading of routes
   - Dynamic imports for components

2. React Optimizations
   - useCallback for memoized functions
   - memo for component memoization
   - Context optimization

3. Error Handling
   - Error boundaries for graceful error handling
   - Toast notifications for user feedback
   - Loading states for better UX

## Technologies Used

- React
- TypeScript
- React Router
- JSON Server
- Tailwind CSS
- React Hot Toast
- Lucide React (Icons)
