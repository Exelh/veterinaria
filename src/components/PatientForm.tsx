import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Error from "./Error";
import { toast } from "react-toastify";
import type { Draftpatient } from "../types";
import { usePatientStore } from "../store";
import { useEffect } from "react";

export default function PatientForm() {
  const addPatient = usePatientStore((state) => state.addPatient);
  const activeId = usePatientStore((state) => state.activeId);
  const patients = usePatientStore((state) => state.patients);
  const updatePatient = usePatientStore((state) => state.updatePatient);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Draftpatient>();

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter((patient) => patient.id === activeId)[0];
      setValue("name", activePatient.name);
      setValue("caretaker", activePatient.caretaker);
      setValue("date", activePatient.date);
      setValue("email", activePatient.email);
      setValue("symptoms", activePatient.symptoms);
    } else {
      reset();
    }
  }, [activeId]);

  const registerPatient = (data: Draftpatient) => {
    if (activeId) {
      updatePatient(data);
      toast.success("👌Paciente actualizado", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      addPatient(data);
      toast.success("👌 Paciente registrado correctamente", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    reset();
  };

  return (
    <motion.div
      key={activeId}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="md:w-full lg:w-1/2 mx-5 bg-gray-800 rounded-xl shadow-xl p-10"
    >
      <h2 className="text-3xl font-bold text-center text-white mb-5">
        Seguimiento Pacientes
      </h2>

      <p className="text-lg mt-5 text-center mb-10 text-gray-300">
        Añade Pacientes y{" "}
        <span className="text-teal-400 font-bold">Adminístralos</span>
      </p>

      <form
        className="bg-gray-700 shadow-md rounded-xl py-10 px-8 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        {/* Nombre del Paciente */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Paciente
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre del Paciente"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("name", {
              required: "El nombre del paciente es obligatorio",
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>

        {/* Nombre del Propietario */}
        <div className="mb-6">
          <label
            htmlFor="caretaker"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Propietario
          </label>
          <input
            id="caretaker"
            type="text"
            placeholder="Nombre del Propietario"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("caretaker", {
              required: "El nombre del propietario es obligatorio",
            })}
          />
          {errors.caretaker && <Error>{errors.caretaker?.message}</Error>}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}
          />
          {errors.email && <Error>{errors.email?.message}</Error>}
        </div>

        {/* Fecha de Alta */}
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Fecha Alta
          </label>
          <input
            id="date"
            type="date"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            {...register("date", {
              required: "La fecha de alta es obligatoria",
            })}
          />
          {errors.date && <Error>{errors.date?.message}</Error>}
        </div>

        {/* Síntomas */}
        <div className="mb-6">
          <label
            htmlFor="symptoms"
            className="block text-sm font-semibold text-gray-300 mb-2"
          >
            Síntomas
          </label>
          <textarea
            id="symptoms"
            placeholder="Síntomas del paciente"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows={4}
            {...register("symptoms", {
              required: "El detalle de síntomas es obligatorio",
            })}
          />
          {errors.symptoms && <Error>{errors.symptoms?.message}</Error>}
        </div>

        {/* Botón de Enviar */}
        <input
          type="submit"
          value="Guardar Paciente"
          className="bg-gradient-to-r from-teal-800 to-teal-600 w-full p-3 text-white uppercase font-semibold rounded-lg shadow-md hover:bg-indigo-700 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
        />
      </form>
    </motion.div>
  );
}
