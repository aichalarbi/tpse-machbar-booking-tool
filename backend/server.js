
// ============================================================
// 1. IMPORTS
// ============================================================

// Express is used to create our backend server and API routes.
const express = require("express");

// CORS allows our React frontend to communicate with this backend,
// even when the frontend and backend run on different ports.
const cors = require("cors");

// randomUUID generates a unique ID for every new booking.
const { randomUUID } = require("crypto");


// ============================================================
// 2. INITIALIZE THE EXPRESS APPLICATION
// ============================================================

const app = express();

// Enable communication between frontend and backend.
app.use(cors());

// Allow the backend to receive and understand JSON data
// sent by the frontend in a POST request.
app.use(express.json());


// ============================================================
// 3. TEMPORARY TIME SLOT DATA
// ============================================================

// For our demonstration, we use one fixed date.
// Later, these values will come from our MySQL database.

const DEMO_DATE = "2026-11-18";

// Each object represents one bookable time slot.
//
// slotId:        Unique identifier of the time slot.
// date:          Date of the appointment.
// startTime:     Beginning of the appointment.
// endTime:       End of the appointment.
// capacity:      Maximum number of people allowed.
// bookedSpots:   Number of places already reserved.
// availableSpots: Number of places still available.

let timeSlots = [
    {
        slotId: 1,
        date: DEMO_DATE,
        startTime: "08:00",
        endTime: "10:00",
        capacity: 10,
        bookedSpots: 1
    },
    {
        slotId: 2,
        date: DEMO_DATE,
        startTime: "10:00",
        endTime: "12:00",
        capacity: 10,
        bookedSpots: 0
    },
    {
        slotId: 3,
        date: DEMO_DATE,
        startTime: "12:00",
        endTime: "14:00",
        capacity: 10,
        bookedSpots: 0
    }
];


// ============================================================
// 4. TEMPORARY BOOKING STORAGE
// ============================================================

// This array stores the bookings created during the demonstration.
//
// IMPORTANT:
// This is temporary storage in the computer's memory.
// All new bookings disappear when the server is restarted.
//
// The initial booking already represented in slot 1 is counted
// in bookedSpots, but is not stored as an individual booking here.

let bookings = [];


// ============================================================
// 5. HELPER FUNCTION: CALCULATE AVAILABLE PLACES
// ============================================================

// We calculate the remaining places whenever we send slot
// information to the frontend.
//
// Example:
// Capacity = 10
// Booked = 1
// Available = 10 - 1 = 9

function getAvailableSpots(slot) {
    return slot.capacity - slot.bookedSpots;
}


// ============================================================
// 6. GET ROUTE: DISPLAY AVAILABLE TIME SLOTS
// ============================================================

// HTTP GET /api/slots?date=2026-11-18
//
// The frontend uses this route to retrieve all time slots
// for the selected date.
//
// The date is sent as a query parameter in the URL.
//
// Example:
// /api/slots?date=2026-11-18

app.get("/api/slots", (req, res) => {

    // Read the selected date from the URL.
    const selectedDate = req.query.date;

    // Check whether the frontend actually provided a date.
    if (!selectedDate) {
        return res.status(400).json({
            message: "Please provide a date."
        });
    }

    // Find all time slots belonging to the selected date.
    const availableSlots = timeSlots
        .filter(slot => slot.date === selectedDate)

        // Add the calculated number of available places.
        .map(slot => ({
            ...slot,
            availableSpots: getAvailableSpots(slot)
        }));

    // Send the time slots back to the frontend as JSON.
    res.status(200).json(availableSlots);
});


// ============================================================
// 7. GET ROUTE: DISPLAY BOOKINGS
// ============================================================

// HTTP GET /api/bookings
//
// This route is useful for testing with Thunder Client.
// It returns all bookings created since the server started.

app.get("/api/bookings", (req, res) => {

    // Send the bookings array to the client.
    res.status(200).json(bookings);
});


// ============================================================
// 8. POST ROUTE: CREATE A NEW BOOKING
// ============================================================

// HTTP POST /api/bookings
//
// The frontend sends the student's information and selected
// time slot to this route.
//
// Expected JSON data:
//
// {
//     "name": "Nourhen",
//     "nachname": "Abid",
//     "email": "example@email.com",
//     "datum": "2026-11-18",
//     "slotId": 1
// }

app.post("/api/bookings", (req, res) => {

    // --------------------------------------------------------
    // STEP 1: RECEIVE DATA FROM THE FRONTEND
    // --------------------------------------------------------

    // req.body contains the JSON data sent by the frontend.
    const { name, nachname, email, datum, slotId } = req.body;


    // --------------------------------------------------------
    // STEP 2: VALIDATE THE REQUIRED FIELDS
    // --------------------------------------------------------

    // Every field is required to create a booking.
    if (
        !name?.trim() ||
        !nachname?.trim() ||
        !email?.trim() ||
        !datum ||
        slotId === undefined ||
        slotId === null
    ) {
        return res.status(400).json({
            message: "Please fill in all fields."
        });
    }
    if (response.ok) {
    // Fetch the updated time slots.
    setAktualisierung(prev => prev + 1);

    // Close the booking popup.
    setFormularOffen(false);
}


    // --------------------------------------------------------
    // STEP 3: FIND THE SELECTED TIME SLOT
    // --------------------------------------------------------

    // The frontend sends the slot ID, not just the displayed
    // time (for example, slotId = 1).
    //
    // We convert it to a number because data received from
    // the frontend may be a string.

    const selectedSlotId = Number(slotId);

    const selectedSlot = timeSlots.find(slot =>
        slot.slotId === selectedSlotId &&
        slot.date === datum
    );

    // If the selected slot does not exist for this date,
    // the booking cannot be created.
    if (!selectedSlot) {
        return res.status(404).json({
            message: "The selected time slot was not found."
        });
    }


    // --------------------------------------------------------
    // STEP 4: CHECK THE AVAILABLE CAPACITY
    // --------------------------------------------------------

    // Calculate how many places are still available.
    const availableSpots = getAvailableSpots(selectedSlot);

    // A booking is rejected if the time slot is already full.
    if (availableSpots <= 0) {
        return res.status(409).json({
            message: "Sorry, this time slot is fully booked."
        });
    }


    // --------------------------------------------------------
    // STEP 5: CREATE THE BOOKING OBJECT
    // --------------------------------------------------------

    // randomUUID creates a unique ID for this booking.
    const newBooking = {
        id: randomUUID(),
        name: name.trim(),
        nachname: nachname.trim(),
        email: email.trim(),
        datum,
        slotId: selectedSlotId,
        uhrzeit: `${selectedSlot.startTime} - ${selectedSlot.endTime}`
    };


    // --------------------------------------------------------
    // STEP 6: SAVE THE BOOKING
    // --------------------------------------------------------

    // Add the new booking to our temporary bookings array.
    bookings.push(newBooking);

    // Increase the number of booked places for this time slot.
    selectedSlot.bookedSpots++;


    // --------------------------------------------------------
    // STEP 7: SEND A SUCCESS RESPONSE
    // --------------------------------------------------------

    // HTTP status 201 means that a new resource was created.
    //
    // We return the booking and the updated availability
    // so that the frontend can display the result.

    res.status(201).json({
        message: "Appointment saved successfully!",
        booking: newBooking,
        availableSpots: getAvailableSpots(selectedSlot)
    });
});


// ============================================================
// 9. START THE SERVER
// ============================================================

// The backend will listen for requests on port 3000.
//
// Our frontend can communicate with it using:
// http://localhost:3000

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`machBAR server is running on port ${PORT}`);
});
