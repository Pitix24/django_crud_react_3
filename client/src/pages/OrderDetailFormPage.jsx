import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { createOrderDetail, updateOrderDetail, getOrderDetail, getAllOrderIds, getAllProductIds } from '../api/crud.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useIntl, FormattedMessage } from 'react-intl';
import Footer from '../components/Footer';

export function OrderDetailFormPage() {
    const intl = useIntl();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [editMode, setEditMode] = useState(false);
    const [orderIds, setOrderIds] = useState([]);
    const [productIds, setProductIds] = useState([]);

    const onSubmit = handleSubmit(async (data) => {
        try{
            if (editMode) {
                await updateOrderDetail(params.orderid, params.productid, data);
                toast.success('Order actualizada exitosamente', {
                   position: "bottom-right",
                   style: {
                       background: "#101010",
                       color: "#fff"
                   }
               });
           } else {
            await createOrderDetail(params.orderid, params.productid, data);
               toast.success('Order Detail creada exitosamente', {
                   position: "bottom-right",
                   style: {
                       background: "#101010",
                       color: "#fff"
                   }
               })
           }
           navigate("/orderdetails");
        } catch (error) {
            console.error("Error updating/creating orderDetail: ", error);        
        }
    });

    const loadOrderDetails = useCallback(async () => {
        if (params.orderid && params.productid) {
            try {
                const { data } = await getOrderDetail(params.orderid, params.productid);
                for (let field in data) {
                    setValue(field, data[field]);
                }
                setEditMode(true);
            } catch (error) {
                console.error("Error loading orderDetail: ", error);
            }
        } else {
            reset();
            setEditMode(false);
        }
    }, [params.orderid, params.productid, setValue, reset]);

    useEffect(() => {
        loadOrderDetails();
    }, [loadOrderDetails]);

    useEffect(() => {
        // Llamar a la función para obtener los customerid cuando el componente se monte
        getAllProductIds()
            .then(ids => {
                console.log('Product IDs:', ids);
                setProductIds(ids);
            })
            .catch(error => console.error('Error fetching product IDs:', error));
    }, []);

    useEffect(() => {
        getAllOrderIds()
            .then(ids => {
                console.log('Employee IDs:', ids);
                setOrderIds(ids);
            })
            .catch(error => console.error('Error fetching employee IDs:', error));
    }, []);

    return (
        <>
        <div className='max-w-xl mx-auto mt-12'>
            <form onSubmit={onSubmit}>
                <select defaultValue="" {...register("orderid", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                <option value="" disabled>{intl.formatMessage({ id: "orderid", defaultMessage: "Select Order ID" })}</option>
                {orderIds.map(id => (<option key={id} value={id}>{id}</option>))}
                </select>
                {errors.orderid && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <select defaultValue="" {...register("productid", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                <option value="" disabled>{intl.formatMessage({ id: "productid", defaultMessage: "Select Product ID" })}</option>
                {productIds.map(id => (<option key={id} value={id}>{id}</option>))}
                </select>
                {errors.productid && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "unitprice", defaultMessage: "Unit Price" })} {...register("unitprice", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.unitprice && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "quantity", defaultMessage: "Quantity" })} {...register("quantity", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.quantity && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "discount", defaultMessage: "Discount" })} {...register("discount", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.discount && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'><FormattedMessage id="save" defaultMessage="Save" /></button>
            </form>
        </div>
        <br></br>
        <Footer />
        </>
    )
}
