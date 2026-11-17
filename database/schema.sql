-- =====================================================
-- machBAR Booking System
-- Database: machbar_booking
-- Manage reservations and time slot availability
-- =====================================================

-- 1. DATABASE SETUP
-- =====================================================

CREATE DATABASE IF NOT EXISTS machbar_booking;

USE machbar_booking;

-- 2. TIME SLOTS
-- =====================================================
-- Stores available dates, time intervals, and capacities.
-- Each time slot has a maximum capacity of 10 by default.

CREATE TABLE IF NOT EXISTS time_slots (
    slot_id INT AUTO_INCREMENT PRIMARY KEY,

    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    capacity INT NOT NULL DEFAULT 10,

    -- Prevent duplicate time slots
    CONSTRAINT unique_slot
        UNIQUE (slot_date, start_time, end_time),

    -- Ensure valid time intervals
    CONSTRAINT valid_time
        CHECK (end_time > start_time),

    -- Ensure positive capacity
    CONSTRAINT valid_capacity
        CHECK (capacity > 0)
);


-- 3. BOOKINGS
-- =====================================================
-- Stores personal information for each reservation.
-- Each booking is linked to a specific time slot.
-- No user registration is required.

CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL,

    slot_id INT NULL,

    -- Connect reservations to time slots
    CONSTRAINT fk_bookings_slot
        FOREIGN KEY (slot_id)
        REFERENCES time_slots(slot_id)
);


-- 4. TIME SLOT AVAILABILITY
-- =====================================================
-- Automatically calculates booked and remaining spots.
-- Availability is calculated from existing reservations.

CREATE OR REPLACE VIEW slot_availability AS
SELECT
    s.slot_id,
    s.slot_date,
    s.start_time,
    s.end_time,
    s.capacity,

    COUNT(b.booking_id) AS booked_spots,

    s.capacity - COUNT(b.booking_id) AS available_spots

FROM time_slots s

LEFT JOIN bookings b
    ON s.slot_id = b.slot_id

GROUP BY
    s.slot_id,
    s.slot_date,
    s.start_time,
    s.end_time,
    s.capacity;


-- 5. SAMPLE DATA (TESTING ONLY)
-- =====================================================
-- Examples are commented out to prevent duplicates.
-- Remove the -- only when you want to insert test data.


-- Example: Create three time slots

-- INSERT INTO time_slots
--     (slot_date, start_time, end_time, capacity)
-- VALUES
--     ('2026-11-18', '08:00:00', '10:00:00', 10),
--     ('2026-11-18', '10:00:00', '12:00:00', 10),
--     ('2026-11-18', '12:00:00', '14:00:00', 10);


-- Example: Create a reservation for slot 1

-- INSERT INTO bookings
--     (first_name, last_name, email, slot_id)
-- VALUES
--     ('Sarah', 'Mueller', 'sarah@example.com', 1);


-- 6. DATABASE QUERIES
-- =====================================================

-- Display all time slots

SELECT *
FROM time_slots
ORDER BY slot_date, start_time;


-- Display all reservations

SELECT *
FROM bookings
ORDER BY booking_id;


-- Display reservations with their dates and times

SELECT
    b.booking_id,
    b.first_name,
    b.last_name,
    b.email,
    s.slot_date,
    s.start_time,
    s.end_time

FROM bookings b

JOIN time_slots s
    ON b.slot_id = s.slot_id

ORDER BY
    s.slot_date,
    s.start_time,
    b.booking_id;


-- 7. DISPLAY TIME SLOT AVAILABILITY
-- =====================================================

-- Display capacity, booked spots, and remaining spots

SELECT *
FROM slot_availability
ORDER BY slot_date, start_time;


-- Example: Display availability for a specific date

-- SELECT *
-- FROM slot_availability
-- WHERE slot_date = '2026-11-18'
-- ORDER BY start_time;

-- SELECT *
-- FROM slot_availability
-- WHERE available_spots > 0
-- ORDER BY slot_date, start_time;

SELECT
    s.slot_id,
    s.slot_date,
    s.start_time,
    s.end_time,
    s.capacity,
    COUNT(b.booking_id) AS booked_spots,
    s.capacity - COUNT(b.booking_id) AS available_spots
FROM time_slots s
LEFT JOIN bookings b
    ON s.slot_id = b.slot_id
GROUP BY
    s.slot_id,
    s.slot_date,
    s.start_time,
    s.end_time,
    s.capacity;

