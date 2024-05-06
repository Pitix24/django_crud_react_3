import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { createEmployee, updateEmployee, getEmployee } from '../api/crud.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useIntl, FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function EmployeeFormPage() {
    const intl = useIntl();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [editMode, setEditMode] = useState(false);
    const [birthdate, setBirthdate] = useState(null);
    const [hiredate, setHiredate] = useState(null);

    const onSubmit = handleSubmit(async (data) => {
        // Asegúrate de que las fechas estén en el formato correcto antes de enviarlas
        const formattedData = {
            ...data,
            birthdate: birthdate.toISOString(),  // Convierte la fecha a formato 'YYYY-MM-DD'
            hiredate: hiredate.toISOString(),  // Convierte la fecha a formato 'YYYY-MM-DD'
        };
        try {
            if (editMode) {
                await updateEmployee(params.employeeid, formattedData);
                toast.success('Employee actualizado exitosamente', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });
            } else {
                await createEmployee(formattedData);
                toast.success('Employee creado exitosamente', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
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
        <div className='max-w-xl mx-auto mt-12 mb-12'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder={intl.formatMessage({ id: "lastname", defaultMessage: "Last Name" })} {...register("lastname", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.lastname && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "firstname", defaultMessage: "First Name" })} {...register("firstname", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.firstname && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "title", defaultMessage: "Title" })} {...register("title", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.title && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "titleofcourtesy", defaultMessage: "Title of Courtesy" })} {...register("titleofcourtesy", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.titleofcourtesy && <span>this field is required</span>}
                <DatePicker
                    selected={birthdate}
                    onChange={(date) => setBirthdate(date)}
                    placeholderText={intl.formatMessage({ id: "birthdate", defaultMessage: "Birth Date" })}
                    showTimeSelect  // Muestra el selector de hora
                    dateFormat="yyyy-MM-dd HH:mm"  // Formato de fecha y hora
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {errors.birthdate && <span>this field is required</span>}
                {/* DatePicker para la fecha de contratación */}
                <DatePicker
                    selected={hiredate}
                    onChange={(date) => setHiredate(date)}
                    placeholderText={intl.formatMessage({ id: "hiredate", defaultMessage: "Hire Date" })}
                    showTimeSelect  // Muestra el selector de hora
                    dateFormat="yyyy-MM-dd HH:mm"  // Formato de fecha y hora
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {errors.hiredate && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "address", defaultMessage: "Address" })} {...register("address", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.address && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "city", defaultMessage: "City" })} {...register("city", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.city && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "region", defaultMessage: "Region" })} {...register("region", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.region && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "postalcode", defaultMessage: "Postal Code" })} {...register("postalcode", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.postalcode && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "country", defaultMessage: "Country" })} {...register("country", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.country && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "homephone", defaultMessage: "Home Phone" })} {...register("homephone", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.homephone && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "extension", defaultMessage: "Extension" })} {...register("extension", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.extension && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "photo", defaultMessage: "Phono" })} {...register("photo", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.photo && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "notes", defaultMessage: "Notes" })} {...register("notes", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.notes && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "reportsto", defaultMessage: "Reports To" })} {...register("reportsto", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.reportsto && <span>this field is required</span>}
                <input type="text" placeholder={intl.formatMessage({ id: "photopath", defaultMessage: "Photo Path" })} {...register("photopath", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.photopath && <span>this field is required</span>}
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
            </form>
        </div>
    )
}