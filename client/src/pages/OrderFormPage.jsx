import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { createOrder, updateOrder, getOrder, getAllCustomerIds, getAllEmployeeIds, getAllShipperIds } from '../api/crud.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useIntl, FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from '../components/Footer';

export function OrderFormPage() {
    const intl = useIntl();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [editMode, setEditMode] = useState(false);
    const [customerIds, setCustomerIds] = useState([]);
    const [employeeIds, setEmployeeIds] = useState([]);
    const [shipperIds, setShipperIds] = useState([]);
    const [orderDate, setOrderDate] = useState(null);
    const [requiredDate, setRequiredDate] = useState(null);
    const [shippedDate, setShippedDate] = useState(null);

    const onSubmit = handleSubmit(async (data) => {
        // Asegúrate de que las fechas estén en el formato correcto antes de enviarlas
        const formattedData = {
            ...data,
            OrderDate: orderDate.toISOString(),
            RequiredDate: requiredDate.toISOString(),
            ShippedDate: shippedDate.toISOString()
        };
        try {
            if (editMode) {
                await updateOrder(params.orderid, data);
                toast.success('Order actualizado exitosamente', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });
            } else {
                await createOrder(data);
                toast.success('Order creado exitosamente', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });
            }
            navigate("/orders");
        } catch (error) {
            console.error("Error updating/creating order: ", error);
        }
    });

    const loadOrder = useCallback(async () => {
        if (params.orderid) {
            try {
                const { data } = await getOrder(params.orderid);
                for (let field in data) {
                    setValue(field, data[field]);
                }
            } catch (error) {
                console.error("Error loading order: ", error);
            }
        } else {
            reset();
            setEditMode(false);
        }
    }, [params.orderid, setValue, reset]);

    useEffect(() => {
        loadOrder();
    }, [loadOrder]);

    useEffect(() => {
        // Llamar a la función para obtener los IDs de los envíos cuando el componente se monte
        getAllShipperIds()
            .then(ids => {
                console.log('Shipper IDs:', ids);
                setShipperIds(ids);
            })
            .catch(error => console.error('Error fetching shipper IDs:', error));
    }, []);
    

    useEffect(() => {
        // Llamar a la función para obtener los customerid cuando el componente se monte
        getAllCustomerIds()
            .then(ids => {
                console.log('Customer IDs:', ids);
                setCustomerIds(ids);
            })
            .catch(error => console.error('Error fetching customer IDs:', error));
    }, []);

    useEffect(() => {
        getAllEmployeeIds()
            .then(ids => {
                console.log('Employee IDs:', ids);
                setEmployeeIds(ids);
            })
            .catch(error => console.error('Error fetching employee IDs:', error));
    }, []);

    return (
        <>
        <div className='max-w-xl mx-auto mt-12 mb-12'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder={intl.formatMessage({ id: "orderid", defaultMessage: "Order ID" })} {...register("orderid", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.orderid && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <select defaultValue="" {...register("customerid", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                <option value="" disabled>{intl.formatMessage({ id: "customerid", defaultMessage: "Select Customer ID" })}</option>
                {customerIds.map(id => (<option key={id} value={id}>{id}</option>))}
                </select>
                {errors.customerid && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <select defaultValue="" {...register("employeeid", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                <option value="" disabled>{intl.formatMessage({ id: "employeeid", defaultMessage: "Select Employee ID" })}</option>
                {employeeIds.map(id => (<option key={id} value={id}>{id}</option>))}
                </select>
                {errors.employeeid && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                
                <DatePicker
                        selected={orderDate}
                        onChange={(date) => setOrderDate(date)}
                        placeholderText={intl.formatMessage({ id: "orderdate", defaultMessage: "Order Date" })}
                        showTimeSelect  // Muestra el selector de hora
                        dateFormat="yyyy-MM-dd HH:mm"  // Formato de fecha y hora
                        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.orderdate && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                    {/* DatePicker para la fecha requerida */}
                    <DatePicker
                        selected={requiredDate}
                        onChange={(date) => setRequiredDate(date)}
                        placeholderText={intl.formatMessage({ id: "requireddate", defaultMessage: "Required Date" })}
                        showTimeSelect  // Muestra el selector de hora
                        dateFormat="yyyy-MM-dd HH:mm"  // Formato de fecha y hora
                        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.requireddate && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                    {/* DatePicker para la fecha enviada */}
                    <DatePicker
                        selected={shippedDate}
                        onChange={(date) => setShippedDate(date)}
                        placeholderText={intl.formatMessage({ id: "shippeddate", defaultMessage: "Shipped Date" })}
                        showTimeSelect  // Muestra el selector de hora
                        dateFormat="yyyy-MM-dd HH:mm"  // Formato de fecha y hora
                        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.shippeddate && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <select defaultValue="" {...register("shipvia", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                    <option value="" disabled>{intl.formatMessage({ id: "shipvia", defaultMessage: "Select Ship Via" })}</option>
                    {shipperIds.map(id => (
                        <option key={id} value={id}>{id}</option>
                    ))}
                </select>
                {errors.shipvia && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "freight", defaultMessage: "Freight" })} {...register("freight", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.freight && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "shipname", defaultMessage: "Ship Name" })} {...register("shipname", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.shipname && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "shipaddress", defaultMessage: "Ship Address" })} {...register("shipaddress", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.shipaddress && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "shipcity", defaultMessage: "Ship City" })} {...register("shipcity", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.shipcity && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "shipregion", defaultMessage: "Ship Region" })} {...register("shipregion", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.shipregion && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "shippostalcode", defaultMessage: "Ship Postal Code" })} {...register("shippostalcode", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.shippostalcode && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "shipcountry", defaultMessage: "Ship Country" })} {...register("shipcountry", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.shipcountry && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'><FormattedMessage id="save" defaultMessage="Save" /></button>
            </form>
        </div>
        <br></br>
        <Footer />
        </>
    )
}
