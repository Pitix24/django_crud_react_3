import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrderDetails, deleteOrderDetail } from "../api/crud.api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export function OrderDetailList() {
    const [orderdetails, setoOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [notFound, setNotFound] = useState(false); // Nuevo estado para mostrar el mensaje
    const navigate = useNavigate();

    useEffect(() => {
        loadOrderDetails();
    }, []);

    const loadOrderDetails = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAllOrderDetails();
            setoOrderDetails(res.data);
            setNotFound(false); // Reset notFound state
        } catch (error) {
            console.error("Error loading orderDetails: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = useCallback(async (orderid, productid) => {
        const accepted = window.confirm("Are you sure you want to delete this order detail?");
        if (accepted) {
            try {
                await deleteOrderDetail(orderid, productid);
                // Actualiza el estado local para reflejar la eliminación
                setoOrderDetails(orderdetails.filter(orderdetail => orderdetail.orderid !== orderid || orderdetail.productid !== productid));
                toast.success('OrdenDetail eliminado exitosamente', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });
            } catch (error) {
                console.error("Error deleting order detail: ", error);
            }
        }
    }, [orderdetails]);

    const filteredOrderDetails = orderdetails.filter(orderdetail =>
        orderdetail.orderid.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        orderdetail.productid.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setNotFound(filteredOrderDetails.length === 0); // Actualiza el estado de "notFound"
    }, [filteredOrderDetails]);

    if (loading) {
        return <div style={{ paddingLeft: '30px' }}>Loading...</div>;
    }

    return (
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-x-auto sm:rounded-lg mt-5 w-full">
                <h1 className="text-5xl text-left mb-12">
                    <FormattedMessage id="OrderDetailsList" />
                </h1>
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="block w-full max-w-xs px-4 py-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        style={{ color: 'black' }}
                    />
                </div>
                {notFound ? (
                    <div className="text-center text-red-500 font-semibold mb-4">
                        OrderDetail not found
                    </div>
                ) : null}
                <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ maxHeight: '550px', overflowY: 'scroll' }}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-600 shadow-md">
                        <thead className="text-xs uppercase bg-white-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="Orderid" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="Productid" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="UnitPrice" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="Quantity" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="Discount" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="Actions" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-600'>
                            {filteredOrderDetails.map(orderdetail => (
                                <tr key={`${orderdetail.orderid}-${orderdetail.productid}`}>
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {orderdetail.orderid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {orderdetail.productid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {orderdetail.unitprice}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {orderdetail.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {orderdetail.discount}
                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/orderdetails/${orderdetail.orderid}`)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 ml-7" />
                                        </button>
                                        <button onClick={() => handleDelete(orderdetail.orderid, orderdetail.productid)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 ml-3" />
                                        </button>
                                    </td>
                                </tr>          
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

OrderDetailList.propTypes = {
    orderdetails: PropTypes.arrayOf(PropTypes.shape({
        orderid: PropTypes.string.isRequired,
        productid: PropTypes.string.isRequired,
        unitprice: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        discount: PropTypes.string.isRequired,
    })),
};
