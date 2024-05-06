import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { createOrder, updateOrder, getOrder, getAllCustomerIds, getAllEmployeeIds } from '../api/crud.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useIntl, FormattedMessage } from 'react-intl';
import Footer from '../components/Footer';

export function OrderFormPage() {
    const intl = useIntl();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [editMode, setEditMode] = useState(false);
    const [shippers, setShippers] = useState([]);
    const [customerIds, setCustomerIds] = useState([]);
    const [employeeIds, setEmployeeIds] = useState([]);

    const onSubmit = handleSubmit(async (data) => {
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
                setEditMode(true);
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
        setShippers([
            { id: 1, name: 'Speedy Express' },
            { id: 2, name: 'United Package' },
            { id: 3, name: 'Federal Shipping' }
        ]);
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
                <input type="text" placeholder={intl.formatMessage({ id: "orderdate", defaultMessage: "Order Date" })} {...register("orderdate", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.orderdate && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "requireddate", defaultMessage: "Required Date" })} {...register("requireddate", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.requireddate && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "shippeddate", defaultMessage: "Shipped Date" })} {...register("shippeddate", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.shippeddate && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <select defaultValue="" {...register("shipvia", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                <option value="" disabled>{intl.formatMessage({ id: "shipvia", defaultMessage: "Select Ship Via" })}</option>
                {shippers.map(shipper => <option key={shipper.id} value={shipper.id}>{shipper.name}</option>)}
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
