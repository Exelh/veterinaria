import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";

function App() {
  return (
    <>
      <div className="m-10 justify-center">
        <h1 className="text-6xl font-bold text-center text-gray-900">
          Seguimiento de Pacientes Veterinaria
        </h1>
        <p className="text-center text-xl text-gray-500 mt-4">
          Administra y monitorea el estado de tus pacientes con facilidad
        </p>
      </div>
      <div className="mt-12 md:flex justify-center gap-2 px-6">
        <PatientForm />
        <PatientList />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
