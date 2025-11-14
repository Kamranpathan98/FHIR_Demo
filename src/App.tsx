import PatientList from "./components/PatientList";

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>FHIR Patient Dashboard</h1>
      <PatientList />
    </div>
  );
};

export default App;
