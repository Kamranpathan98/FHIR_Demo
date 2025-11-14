import React, { useEffect, useState } from "react";
import { getAllPatients } from "../services/fhirService";
import PatientDetails from "./PatientDetails";

const PatientList = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");

  useEffect(() => {
    const loadPatients = async () => {
      const list = await getAllPatients();
      setPatients(list);
    };

    loadPatients();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* LEFT: PATIENT LIST */}
      <div style={{ width: "300px" }}>
        <h2>Patient List</h2>

        {patients.length === 0 && <p>Loading patients…</p>}

        <ul>
          {patients.map((p) => {
            const patient = p.resource;

            return (
              <li
                key={patient.id}
                style={{
                  cursor: "pointer",
                  padding: "6px",
                  background:
                    selectedPatientId === patient.id ? "#ececec" : "white",
                }}
                onClick={() => setSelectedPatientId(patient.id)}
              >
                {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}
                <br />
                <small>{patient.gender}</small>
              </li>
            );
          })}
        </ul>
      </div>

      {/* RIGHT: PATIENT DETAILS */}
      <div style={{ flex: 1 }}>
        {selectedPatientId ? (
          <PatientDetails patientId={selectedPatientId} />
        ) : (
          <p>Select a patient to view details</p>
        )}
      </div>
    </div>
  );
};

export default PatientList;
