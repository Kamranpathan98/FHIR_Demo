import axios from "axios";

const BASE_URL = "https://server.fire.ly";

export const getAllPatients = async () => {
  const res = await axios.get(`${BASE_URL}/Patient`);
  return res.data.entry || [];
};


export const searchPatients = async (name: string) => {
  const res = await axios.get(`${BASE_URL}/Patient`, {
    params: { name }
  });
  return res.data.entry || [];
};

export const getPatientById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/Patient/${id}`);
  return res.data;
};

export const getObservations = async (patientId: string) => {
  const res = await axios.get(`${BASE_URL}/Observation`, {
    params: { patient: patientId }
  });
  return res.data.entry || [];
};

export const getEncounters = async (patientId: string) => {
  const res = await axios.get(`${BASE_URL}/Encounter`, {
    params: { patient: patientId }
  });
  return res.data.entry || [];
};
