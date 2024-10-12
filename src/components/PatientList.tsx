import { usePatientStore } from "../store";
import PatientCard from "./PatientCard";

const PatientList = () => {
  const patients = usePatientStore((state) => state.patients);

  return (
    <div className="md:w-1/2  mx-1 bg-teal-800 rounded-xl shadow-xl p-10">
      <h2 className="text-3xl font-bold text-center text-white mb-5">Lista de Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10  text-white">
        Administra tus <span className="text-teal-400 font-bold">Pacientes y citas</span>
      </p>
      {patients.length === 0 ? (
        <p className="text-center text-3xl text-white">No hay pacientes registrados aún.</p>
      ) : (
        <div className="space-y-6">
          {patients.map((patient) => (
            <PatientCard 
              key={patient.id} 
              patient={patient} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
