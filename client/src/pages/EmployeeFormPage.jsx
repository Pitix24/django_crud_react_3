import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createEmployee, updateEmployee, getEmployee } from "../api/crud.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useIntl, FormattedMessage } from "react-intl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function EmployeeFormPage() {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [editMode, setEditMode] = useState(false);
  const [birthdate, setBirthdate] = useState(null);
  const [hiredate, setHiredate] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    // Asegúrate de que las fechas estén en el formato correcto antes de enviarlas
    const formattedData = {
      ...data,
      birthdate: birthdate ? birthdate.toISOString() : null, // Convierte la fecha a formato 'YYYY-MM-DD'
      hiredate: hiredate ? hiredate.toISOString() : null, // Convierte la fecha a formato 'YYYY-MM-DD'
    };
    try {
      if (editMode) {
        await updateEmployee(params.employeeid, formattedData);
        toast.success("Employee actualizado exitosamente", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
      } else {
        await createEmployee(formattedData);
        toast.success("Employee creado exitosamente", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
      }
      navigate("/employees");
    } catch (error) {
      console.error("Error updating/creating employee: ", error);
    }
  });

  const loadEmployee = useCallback(async () => {
    if (params.employeeid) {
      try {
        const { data } = await getEmployee(params.employeeid);
        for (let field in data) {
          setValue(field, data[field]);
        }
        setEditMode(true);
      } catch (error) {
        console.error("Error loading employee: ", error);
      }
    } else {
      reset();
      setEditMode(false);
    }
  }, [params.employeeid, setValue, reset]);

  useEffect(() => {
    loadEmployee();
  }, [loadEmployee]);

  return (
    <div className="max-w-xl mx-auto mt-12 mb-12">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "lastname",
            defaultMessage: "Last Name",
          })}
          {...register("lastname", {
            required: true,
            maxLength: {
              value: 20,
              message: "El apellido no puede tener más de 20 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.lastname && <span>{errors.lastname.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "firstname",
            defaultMessage: "First Name",
          })}
          {...register("firstname", {
            required: true,
            maxLength: {
              value: 10,
              message: "El nombre no puede tener más de 10 caracteres",
            },
            validate: (value) => {
              const regex = /\d/;
              return !regex.test(value) || "El nombre no debe contener números";
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.firstname && <span>{errors.firstname.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "title",
            defaultMessage: "Title",
          })}
          {...register("title", {
            maxLength: {
              value: 30,
              message: "El título no puede tener más de 30 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>{errors.title.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "titleofcourtesy",
            defaultMessage: "Title of Courtesy",
          })}
          {...register("titleofcourtesy", {
            maxLength: {
              value: 25,
              message:
                "El título de cortesía no puede tener más de 25 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.titleofcourtesy && (
          <span>{errors.titleofcourtesy.message}</span>
        )}
        <DatePicker
          selected={birthdate}
          onChange={(date) => setBirthdate(date)}
          placeholderText={intl.formatMessage({
            id: "birthdate",
            defaultMessage: "Birth Date",
          })}
          showTimeSelect // Muestra el selector de hora
          dateFormat="yyyy-MM-dd HH:mm" // Formato de fecha y hora
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />

        {/* DatePicker para la fecha de contratación */}
        <DatePicker
          selected={hiredate}
          onChange={(date) => setHiredate(date)}
          placeholderText={intl.formatMessage({
            id: "hiredate",
            defaultMessage: "Hire Date",
          })}
          showTimeSelect // Muestra el selector de hora
          dateFormat="yyyy-MM-dd HH:mm" // Formato de fecha y hora
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "address",
            defaultMessage: "Address",
          })}
          {...register("address", {
            maxLength: {
              value: 60,
              message: "La dirección no puede tener más de 60 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.address && <span>{errors.address.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "city",
            defaultMessage: "City",
          })}
          {...register("city", {
            maxLength: {
              value: 15,
              message: "La ciudad no puede tener más de 15 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.city && <span>{errors.city.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "region",
            defaultMessage: "Region",
          })}
          {...register("region", {
            maxLength: {
              value: 15,
              message: "La región no puede tener más de 15 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.region && <span>{errors.region.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "postalcode",
            defaultMessage: "Postal Code",
          })}
          {...register("postalcode", {
            maxLength: {
              value: 10,
              message: "El código postal no puede tener más de 10 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.postalcode && <span>{errors.postalcode.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "country",
            defaultMessage: "Country",
          })}
          {...register("country", {
            maxLength: {
              value: 15,
              message: "El país no puede tener más de 15 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.country && <span>{errors.country.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "homephone",
            defaultMessage: "Home Phone",
          })}
          {...register("homephone", {
            maxLength: {
              value: 24,
              message:
                "El teléfono de casa no puede tener más de 24 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.homephone && <span>{errors.homephone.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "extension",
            defaultMessage: "Extension",
          })}
          {...register("extension", {
            maxLength: {
              value: 4,
              message: "La extensión no puede tener más de 4 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.extension && <span>{errors.extension.message}</span>}

        <input
          type="text"
          placeholder={intl.formatMessage({
            id: "photopath",
            defaultMessage: "Photo Path",
          })}
          {...register("photopath", {
            maxLength: {
              value: 255,
              message:
                "La ruta de la foto no puede tener más de 255 caracteres",
            },
          })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.photopath && <span>{errors.photopath.message}</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>
    </div>
  );
}
