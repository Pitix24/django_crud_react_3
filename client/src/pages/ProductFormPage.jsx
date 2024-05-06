import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { createProduct, updateProduct, getProduct, getAllSupplierIds, getAllCategoryIds } from '../api/crud.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useIntl, FormattedMessage } from 'react-intl';
import Footer from '../components/Footer';

export function ProductFormPage() {
    const intl = useIntl();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [editMode, setEditMode] = useState(false);
    const [supplierIds, setSupplierIds] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (editMode) {
                await updateProduct(params.productid, data);
                toast.success('Product actualizado exitosamente', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });
            } else {
                await createProduct(data);
                toast.success('Product creado exitosamente', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });
            }
            navigate("/products");
        } catch (error) {
            console.error("Error updating/creating product: ", error);
        }
    });

    const loadProduct = useCallback(async () => {
        if (params.productid) {
            try {
                const { data } = await getProduct(params.productid);
                for (let field in data) {
                    setValue(field, data[field]);
                }
                setEditMode(true);
            } catch (error) {
                console.error("Error loading product: ", error);
            }
        } else {
            reset();
            setEditMode(false);
        }
    }, [params.productid, setValue, reset]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    useEffect(() => {
        getAllSupplierIds()
            .then(ids => {
                console.log('Supplier IDs:', ids);
                setSupplierIds(ids);
            })
            .catch(error => console.error('Error fetching supplier IDs:', error));
    }, []);

    useEffect(() => {
        getAllCategoryIds()
            .then(ids => {
                setCategoryIds(ids);
            })
            .catch(error => {
                console.error('Error fetching category IDs:', error);
            });
    }, []);

    return (
        <>
        <div className='max-w-xl mx-auto mt-12'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder={intl.formatMessage({ id: "productid", defaultMessage: "Product ID" })} {...register("productid", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.productid && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "productname", defaultMessage: "Product Name" })} {...register("productname", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.productname && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <select defaultValue="" {...register("supplierid", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                <option value="" disabled>{intl.formatMessage({ id: "supplierid", defaultMessage: "Select Supplier ID" })}</option>
                {supplierIds.map(id => (<option key={id} value={id}>{id}</option>))}
                </select>
                {errors.supplierid && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <select defaultValue="" {...register("categoryid", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'>
                <option value="" disabled>{intl.formatMessage({ id: "categoryid", defaultMessage: "Select Category ID" })}</option>
                {categoryIds.map(id => (<option key={id} value={id}>{id}</option>))}
                </select>
                {errors.categoryid && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "quantityperunit", defaultMessage: "Quantity Per Unit" })} {...register("quantityperunit", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.quantityperunit && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "unitprice", defaultMessage: "Unit Price" })} {...register("unitprice", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.unitprice && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "unitsinstock", defaultMessage: "Units In Stock" })} {...register("unitsinstock", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.unitsinstock && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "unitsonorder", defaultMessage: "Units On Order" })} {...register("unitsonorder", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.unitsonorder && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "reorderlevel", defaultMessage: "Reorder Level" })} {...register("reorderlevel", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.reorderlevel && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <input type="text" placeholder={intl.formatMessage({ id: "discontinued", defaultMessage: "Discontinued" })} {...register("discontinued", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
                {errors.discontinued && <span><FormattedMessage id="fieldRequired" defaultMessage="This field is required" /></span>}
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'><FormattedMessage id="save" defaultMessage="Save" /></button>
            </form>
        </div>
        <br></br>
        <Footer />
        </>
    )
}
