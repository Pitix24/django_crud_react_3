import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, deleteOrder } from "../api/crud.api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBook } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [notFound, setNotFound] = useState(false); // Estado para controlar si la orden no se encuentra
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAllOrders();
            setOrders(res.data);
            setNotFound(false); // Restablece el estado de orden no encontrada
        } catch (error) {
            console.error("Error loading orders: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = useCallback(async (orderid) => {
        const accepted = window.confirm("Are you sure you want to delete this order?");
        if (accepted) {
            try {
                await deleteOrder(orderid);
                // Actualiza el estado local para reflejar la eliminación
                setOrders(orders.filter(order => order.orderid !== orderid));
                toast.success('Order successfully deleted', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });
            } catch (error) {
                console.error("Error deleting order: ", error);
            }
        }
    }, [orders]);

    const filteredOrders = orders.filter(order =>
        order.orderid.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerid.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setNotFound(filteredOrders.length === 0); // Actualiza el estado de "notFound"
    }, [filteredOrders]);

    if (loading) {
        return <div style={{ paddingLeft: '30px' }}>Loading...</div>;
    }

    return (
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <h1 className="text-5xl text-left mb-12">
                    <FormattedMessage id="OrdersList" />
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
                    <div className="text-red-500 text-center font-semibold mb-4">
                        Order not found
                    </div>
                ) : null}
                <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ maxHeight: '550px', overflowY: 'scroll' }}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-600">
                        <thead className="text-xs uppercase bg-white-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Orderid" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Customerid" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Employeeid" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="OrderDate" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="RequiredDate" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="ShippedDate" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Freight" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="ShipCity" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="ShipCountry" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Actions" /></th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-600'>
                            {filteredOrders.map(order => (
                                <tr key={order.orderid}>
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.orderid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.customerid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.employeeid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.orderdate}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.requireddate}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.shippeddate}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.freight}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.shipcity}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.shipcountry}
                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/orders/${order.orderid}`)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 ml-4" />
                                        </button>
                                        <button onClick={() => handleDelete(order.orderid)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 ml-4" />
                                        </button>
                                        <button onClick={() => navigate(`/orderdetails/${order.orderid}`)}> 
                                            <FontAwesomeIcon icon={faBook} className="text-green-500 ml-3" />
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

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({
        orderid: PropTypes.string.isRequired,
        customerid: PropTypes.string.isRequired,
        employeeid: PropTypes.string.isRequired,
        orderdate: PropTypes.string.isRequired,
        requireddate: PropTypes.string.isRequired,
        shippeddate: PropTypes.string.isRequired,
    })),
};
