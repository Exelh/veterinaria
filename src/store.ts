import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Draftpatient, Patient } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";

type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: Draftpatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: Draftpatient) => void;
};

const createPatient = (patient: Draftpatient): Patient => {
  return { ...patient, id: uuidv4() };
};

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      patients: [],
      activeId: "",
      addPatient: (data) => {
        const newPatient = createPatient(data);
        set((state) => ({
          patients: [...state.patients, newPatient],
        }));
      },
      deletePatient: (id) => {
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
        }));
      },
      getPatientById: (id) => {
        set(() => ({
          activeId: id,
        }));
      },
      updatePatient: (data) => {
        set((state) => ({
          patients: state.patients.map((patient) =>
            patient.id === state.activeId ? { id: state.activeId, ...data } : patient
          ),
          activeId: "",
        }));
      },
    }),
    {
      name: "patient-storage", // El nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage), // Uso de localStorage
    }
  )
);
