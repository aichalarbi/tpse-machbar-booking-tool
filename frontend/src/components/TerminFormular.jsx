
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";


function TerminFormular() {
  // Controls whether the booking popup is visible.
  const [formularOffen, setFormularOffen] = useState(false);

  // Stores the student's selected time slot ID.
  const [ausgewaehlterSlot, setAusgewaehlterSlot] = useState("");

  // Stores the selected date.
  const [datum, setDatum] = useState("2026-11-18");

  // Stores the time slots received from the backend.
  const [zeitSlots, setZeitSlots] = useState([]);

  // Indicates whether the backend is currently loading the slots.
  const [laden, setLaden] = useState(false);

  // Stores error messages.
  const [fehler, setFehler] = useState("");

  // Stores the student's first name.
  const [name, setName] = useState("");

  // Stores the student's last name.
  const [nachname, setNachname] = useState("");

  // Stores the student's email address.
  const [email, setEmail] = useState("");

  // Stores the booking success or error message.
  const [buchungsMeldung, setBuchungsMeldung] = useState("");

  //creates a counter. Every time we increase it, React knows that something has changed
  const [aktualisierung, setAktualisierung] = useState(0);

  // Whenever the selected date changes, request its time slots from the backend.
  useEffect(() => {

    async function ladeZeitSlots() {
      setLaden(true);
      setFehler("");

      try {
        // Send a GET request to our Express backend.
        const response = await fetch(
          `http://localhost:3000/api/slots?date=${datum}`
        );

        // Convert the JSON response into JavaScript data.
        const data = await response.json();

        // Check whether the backend returned an error.
        if (!response.ok) {
          throw new Error(data.message || "Fehler beim Laden.");
        }

        // Save the received time slots in React state.
        setZeitSlots(data);

        // Reset the previously selected slot.
        setAusgewaehlterSlot("");

      } catch (error) {
        setFehler(error.message);
        setZeitSlots([]);

      } finally {
        setLaden(false);
      }
    }

    ladeZeitSlots();

  }, [datum, aktualisierung]); 
  /*Now the GET request runs when:
- The selected date changes.
- The refresh counter changes.*/

  // Sends the booking information to the backend.
  async function terminSpeichern() {

    // 1. Check whether all fields are filled in.
    if (!name.trim() || !nachname.trim() || !email.trim() || !datum || !ausgewaehlterSlot) {
      setBuchungsMeldung("Bitte füllen Sie alle Felder aus.");
      return;
    }

    try {
      // 2. Send the booking to the Express backend.
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          nachname: nachname,
          email: email,
          datum: datum,
          slotId: Number(ausgewaehlterSlot)
        })
      });

      // 3. Read the response from the backend.
      const data = await response.json();

      // 4. Check whether the booking was successful.
      if (!response.ok) {
        setBuchungsMeldung(data.message || "Buchung fehlgeschlagen.");
        return;
      }

      // 5. Display the success message.
      setBuchungsMeldung(data.message);

      // 6. Refresh the available time slots.
      setAktualisierung(prev => prev + 1);

    } catch (error) {
      // This happens if the backend cannot be reached.
      setBuchungsMeldung("Backend nicht erreichbar.");
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {/* <h1>Termine verwalten</h1>
          <p>Freie Werkstatt und Schulungen verwalten.</p> */}
        </div>

        <button
          onClick={() => setFormularOffen(true)}
          style={{
            backgroundColor: "#e65405",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "200px",
            marginRight: "200px",
          }}
        >
          Neuen Termin buchen
        </button>
      </div>

      {formularOffen &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            {/* Pop-up-Fenster */}
            <div
              style={{
                position: "relative",
                width: 780,
                maxWidth: "90vw",
                maxHeight: "90vh",
                background: "white",
                borderRadius: 20,
                padding: 0,
                boxSizing: "border-box",
                overflowY: "auto",
              }}
            >
              {/* Kopfbereich */}
              <div
                style={{
                  backgroundColor: "#08799b",
                  color: "white",
                  padding: "15px",
                  borderRadius: "12px 12px 0 0",
                }}
              >
                <h2>Neuen Termin hinzufügen</h2>
                <p></p>
              </div>

              {/* Formularfelder */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginTop: "41px",
                  padding: "0 10px",
                }}
              >
                {/* Name */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vorname"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "12px 24px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "15px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Nachname */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label>Nachname</label>
                  <input
                    type="text"
                    value={nachname}
                    onChange={(e) => setNachname(e.target.value)}
                    placeholder="Nachname"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "12px 24px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "15px",
                      marginRight: "30px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>


                {/* Email*/}
                <div 
                style={{
                  display:"flex",
                  flexDirection:"column",
                  gap:"5px",
                  gridColumn: "1 / -1"
                  
                }}>
                  <label>Email</label>
                  <input type="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "12px 24px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "15px",
                    marginRight:"30px", 
                    width:"100%",
                    boxSizing: "border-box",
                  }}></input>
                </div>

                {/* Datum */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginTop: "15px",
                  }}
                >
                  <label>Datum</label>
                  <input
                    type="date"
                    //React now knows which date the user selected. Changing it automatically triggers the GET request.
                    value={datum}
                    onChange={(e) => setDatum(e.target.value)}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "12px 24px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "15px",
                      cursor: "pointer",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Verfügbare Zeitfenster */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginTop: "15px",
                  }}
                >
                  <label>Verfügbare Zeitfenster</label>

                  <select
                    value={ausgewaehlterSlot}
                    onChange={(e) => setAusgewaehlterSlot(e.target.value)}
                    disabled={laden}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "12px 24px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "15px",
                      cursor: "pointer",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="" disabled>
                      {laden ? "Zeitfenster werden geladen..." : "Zeit auswählen"}
                    </option>

                    {zeitSlots
                      .filter((slot) => slot.availableSpots > 0)
                      .map((slot) => (
                        <option key={slot.slotId} value={slot.slotId}>
                          {slot.startTime} - {slot.endTime}
                          {" "}({slot.availableSpots} Plätze frei)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Termin speichern */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                  marginBottom: "40px",
                }}
              >
                <button
                  onClick={terminSpeichern}
                  style={{
                    backgroundColor: "#e65405",
                    color: "white",
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Termin speichern
                </button>
                
                {/*If buchungsMeldung contains text, display it.If it is empty, display nothing.*/}
                {buchungsMeldung && (<p>{buchungsMeldung}</p>)}
              
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default TerminFormular;
