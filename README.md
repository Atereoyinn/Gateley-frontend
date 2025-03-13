# Meeting Attendance UI - React Application

## Overview
This is a React-based web application designed for managing employee attendance and conference planning. It provides features for user authentication, travel details, dietary preferences, session registration, and expense tracking.

## Features
- **User Authentication**: Secure login and registration using `AuthContext`.
- **Dashboard Access**: Different views for attendees and planners.
- **Forms for Attendees**:
  - Travel details (flight number, arrival time, etc.).
  - Dietary requirements.
  - Session attendance selection.
  - Expense tracking.
- **VIP Flight Restriction**: Ensures VIPs from different regions do not share the same flight.
- **Planner Dashboard**: View and manage attendance records.
- **API Integration**: Uses Axios to communicate with the backend.

## Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Atereoyinn/Gateley-frontend
   cd Gateley-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   OR
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```ini
   REACT_APP_API_BASE_URL=http://localhost:8000/api
   ```
   Adjust this URL based on your backend configuration.

## Running the Application

Start the development server:
```bash
npm start
```
OR
```bash
yarn start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure
```
src/
├── components/
│   ├── auth/              # Login & Registration components
│   ├── dashboard/         # Attendee & Planner dashboards
│   ├── forms/             # Travel, Dietary, Expense forms
│   ├── sessions/          # Session management components
│   ├── shared/            # Navbar, Footer
│   ├── common/            # Utility components like PrivateRoute, Spinner
├── services/              # API interaction with Axios
├── context/               # AuthContext for authentication state
├── App.jsx                # Main application component
├── index.js               # Entry point
```

## Usage
- **Authentication**: Users register/login to access features.
- **Attendees**:
  - Fill in travel and dietary forms.
  - Register for sessions.
  - Log expenses.
- **Planners**:
  - View attendee data.
  - Monitor travel arrangements and avoid VIP conflicts.

## API Communication
- The application interacts with a FastAPI backend using the `/services/api.js` service.
- Authentication is managed using JWT stored in `AuthContext.js`.

## Building for Production
Generate an optimized build:
```bash
npm run build
```
OR
```bash
yarn build
```
The output will be available in the `build/` directory.

## Contributing
Feel free to fork, submit issues, or contribute improvements.

## License
This project is licensed under the MIT License.

