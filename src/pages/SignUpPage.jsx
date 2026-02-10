import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import BottomNav from "../components/BottomNav.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import "../styles/pages/SignUpPage.css";
import {
  Bookmark
} from "lucide-react";

import { useRole } from "../App.jsx";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { role } = useRole();

  const appointments = useMemo(
    () => [
      { id: "schloss", date: "14.06", time: "13:30", place: "Schloss" },
      { id: "luisenplatz", date: "16.06", time: "15:00", place: "Luisenplatz" },
      { id: "herrngarten", date: "18.06", time: "17:00", place: "Herrngarten" },
    ],
    []
  );

  const [params] = useSearchParams();
  const apptFromUrl = params.get("appt");

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [savedAppointment, setSavedAppointment] = useState(apptFromUrl);

  const savedObj = appointments.find((a) => a.id === savedAppointment);

  if (!role) return <p>Keine Rolle gewählt.</p>;

  function saveSelection() {
    if (!selectedAppointment) return;

    setSavedAppointment(selectedAppointment);

    navigate(`?appt=${selectedAppointment}`, { replace: true });
  }

  function goNext() {
    if (!savedAppointment) return;
    navigate(`/letsgo?appt=${savedAppointment}`);
  }

  return (
    <div className="signUpPage">

      <h2 className="sectionTitle">Dein nächster walk&amp;talk</h2>

      <Card className="nextWalktalkCard">
        <p>
          <b>Ort:</b> {savedObj?.place ?? ""}
        </p>
        <p>
          <b>Datum:</b> {savedObj ? `${savedObj.date}.` : ""}
        </p>
        <p>
          <b>Uhrzeit:</b> {savedObj?.time ?? ""}
        </p>
      </Card>

      <h2 className="sectionTitle">Anstehende Termine</h2>


      <div className="appointmentList">
        {appointments.map((a) => (
          <div
            onClick={() => setSelectedAppointment(a.id)}
            className={`${selectedAppointment === a.id ? "selected" : ""} item`}
          >
            <Bookmark color="#F28D2E"/>
            <p>
               {a.date} · {a.time} · {a.place}
            </p>
          </div>
        ))}
      </div>

      <div className="buttons">
        <PrimaryButton
          label="Auswahl speichern"
          onClick={saveSelection}
          disabled={!selectedAppointment}
        />
        <div className="startButton">          
          <PrimaryButton variant={savedAppointment ? "primary" : "grey"} label="Starten" onClick={goNext} disabled={!savedAppointment} />
          <p>Klicke, wenn du vor Ort bist</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
