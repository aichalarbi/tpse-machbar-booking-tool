
import { useState } from "react";
import { createPortal } from "react-dom";

const zeitSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
];

function TerminFormular() {
  const [formularOffen, setFormularOffen] = useState(false);
  const [ausgewaehlterSlot, setAusgewaehlterSlot] = useState(null);

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
                    value={ausgewaehlterSlot ?? ""}
                    onChange={(e) =>
                      setAusgewaehlterSlot(e.target.value)
                    }
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
                      Zeit auswählen
                    </option>

                    {zeitSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
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
                  onClick={() => setFormularOffen(false)}
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
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default TerminFormular;
