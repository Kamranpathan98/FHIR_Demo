import React, { useState } from "react";
import { searchPatients } from "../services/fhirService";

interface Props {
  onSelect: (patientId: string) => void;
}

const PatientSearch: React.FC<Props> = ({ onSelect }) => {
  const [name, setName] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const data = await searchPatients(name);
    setResults(data);
  };

  return (
    <div>
      <h2>Search Patient</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter patient name"
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((item) => {
          const p = item.resource;
          return (
            <li
              key={p.id}
              onClick={() => onSelect(p.id)}
              style={{ cursor: "pointer", margin: "8px 0" }}
            >
              {p.name?.[0]?.given?.[0]} {p.name?.[0]?.family}
              {" — "} ({p.gender})
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PatientSearch;
