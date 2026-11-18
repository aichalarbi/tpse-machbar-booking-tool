# machBAR – Backend

## Description
The backend of the machBAR booking tool is built with Node.js and Express. It handles booking requests, retrieves available time slots, and manages the booking capacity.

Currently, the application uses temporary in-memory storage for demonstration purposes. Bookings are reset whenever the backend server is restarted.

## Technologies
- Node.js
- Express.js
- CORS
- MySQL2 (prepared for future database integration)

## Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Start the Server

Run:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

## API Endpoints

### GET /api/slots

Returns the available time slots for a selected date.

Example:

```text
GET http://localhost:3000/api/slots?date=2026-11-18
```

The response includes the slot ID, start time, end time, capacity, booked places, and available places.

### GET /api/bookings

Returns the current bookings stored in the backend.

### POST /api/bookings

Creates a new booking.

Example request body:

```json
{
  "name": "Nourhen",
  "nachname": "Abid",
  "email": "test@example.com",
  "datum": "2026-11-18",
  "slotId": 1
}
```

The backend validates the required fields and checks whether the selected time slot has available capacity.

If successful, it saves the booking and updates the available capacity.

## Current Limitations
- Bookings are stored temporarily in memory.
- Data is lost when the server restarts.
- The backend is not yet connected to a MySQL database.
- Email confirmations and user authentication are not implemented yet.
