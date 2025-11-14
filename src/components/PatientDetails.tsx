import React, { useEffect, useState } from "react";
import {
  getPatientById,
  getObservations,
  getEncounters,
} from "../services/fhirService";

interface Props {
  patientId: string;
}

const PatientDetails: React.FC<Props> = ({ patientId }) => {
  const [patient, setPatient] = useState<any>(null);
  const [observations, setObservations] = useState<any[]>([]);
  const [encounters, setEncounters] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const p = await getPatientById(patientId);
      setPatient(p);

      const obs = await getObservations(patientId);
      setObservations(obs);

      const enc = await getEncounters(patientId);
      setEncounters(enc);
    };

    loadData();
  }, [patientId]);

  if (!patient) return <div>Loading patient data…</div>;

  return (
    <div>
      <h2>Patient Details</h2>

      <p>
        <strong>Name:</strong> {patient.name?.[0]?.given?.[0]}{" "}
        {patient.name?.[0]?.family}
      </p>
      <p>
        <strong>Gender:</strong> {patient.gender}
      </p>
      <p>
        <strong>DOB:</strong> {patient.birthDate}
      </p>

      <h3>Observations</h3>
      <ul>
        {observations.map((o) => {
          const obs = o.resource;
          return (
            <li key={obs.id}>
              {obs.code?.text || "Unknown"} — {obs.valueQuantity?.value}{" "}
              {obs.valueQuantity?.unit}
            </li>
          );
        })}
      </ul>

      <h3>Encounters</h3>
      <ul>
        {encounters.map((e) => {
          const enc = e.resource;
          return (
            <li key={enc.id}>
              {enc.class?.code} — {enc.period?.start}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PatientDetails;
