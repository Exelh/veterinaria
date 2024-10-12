import { toast } from "react-toastify";
import { Patient } from "../types";
import { FaPaw, FaUserAlt, FaEnvelope, FaCalendarAlt, FaHeartbeat, FaEdit, FaTrash } from "react-icons/fa";
import { usePatientStore } from "../store";

type PatientCardProps = {
  patient: Patient;
};

const PatientCard = ({ patient }: PatientCardProps) => {
  const deletePatient = usePatientStore((state) => state.deletePatient);
  const getPatient = usePatientStore((state) => state.getPatientById);

  const handleDelete = () => {
    deletePatient(patient.id);
    toast.error("❌ Paciente eliminado", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-600 text-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-all duration-300 ease-in-out">
      <div className="absolute top-0 right-0 -mt-5 -mr-5 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
        <FaPaw className="text-teal-600 w-8 h-8" />
      </div>

      <h3 className="text-2xl font-bold mb-3 flex items-center">
        {patient.name}
      </h3>

      <div className="space-y-2 mb-4">
        <p className="text-base flex items-center">
          <FaUserAlt className="mr-2 text-indigo-100" />
          <span className="font-semibold">Propietario</span>:   {patient.caretaker}
        </p>
        <p className="text-base flex items-center">
          <FaEnvelope className="mr-2 text-indigo-100" />
          <span className="font-semibold">Email</span>: {patient.email}
        </p>
        <p className="text-base flex items-center">
          <FaCalendarAlt className="mr-2 text-indigo-100" />
          <span className="font-semibold">Fecha de Alta</span>: {new Date(patient.date).toLocaleDateString()}
        </p>
        <p className="text-base flex items-center">
          <FaHeartbeat className="mr-2 text-indigo-100" />
          <span className="font-semibold">Síntomas</span>: {patient.symptoms}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4">
        <button
          className="flex items-center px-4 py-2 bg-green-800 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
          onClick={() => getPatient(patient.id)}
        >
          <FaEdit className="mr-2" /> Editar
        </button>
        <button
          className="flex items-center px-4 py-2 bg-red-800 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
          onClick={handleDelete}
        >
          <FaTrash className="mr-2" /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
