const express = require("express");
const cors = require("cors");
const { randomUUID } = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary storage (we will replace this with a database)
let bookings = [];

// GET: Retrieve all bookings
app.get("/api/bookings", (req, res) => {
    res.json(bookings);
});


// POST: Create a new appointment
app.post("/api/bookings", (req, res) => {

    // 1. Receive the data from the frontend
    const { name, nachname, datum, uhrzeit } = req.body;

    // 2. Check that all fields are filled in
    if (!name || !nachname || !datum || !uhrzeit) {
        return res.status(400).json({
            message: "Please fill in all fields."
        });
    }

    // 3. Check whether the time slot is already booked
    const existingBooking = bookings.find(booking =>
        booking.datum === datum &&
        booking.uhrzeit === uhrzeit
    );

    if (existingBooking) {
        return res.status(409).json({
            message: "This appointment is already booked."
        });
    }

    // 4. Create a new appointment
    const newBooking = {
        id: randomUUID(),
        name,
        nachname,
        datum,
        uhrzeit
    };

    // 5. Save the appointment
    bookings.push(newBooking);

    // 6. Send a response to the frontend
    res.status(201).json({
        message: "Appointment saved successfully!",
        booking: newBooking
    });
});


// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`machBAR server is running on port ${PORT}`);
});