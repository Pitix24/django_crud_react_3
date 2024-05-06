import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCustomers, deleteCustomer } from "../api/crud.api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [notFound, setNotFound] = useState(false); // Nuevo estado para mostrar el mensaje
    const navigate = useNavigate();

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAllCustomers();
            setCustomers(res.data);
            setNotFound(false); // Reset notFound state
        } catch (error) {
            console.error("Error loading customers: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = useCallback(async (customerid) => {
        const accepted = window.confirm("Are you sure you want to delete this customer?");
        if (accepted) {
            try {
                await deleteCustomer(customerid);
                // Actualiza el estado local para reflejar la eliminación
                setCustomers(customers.filter(customer => customer.customerid !== customerid));
                toast.success('Customer successfully deleted', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });
            } catch (error) {
                console.error("Error deleting customer: ", error);
            }
        }
    }, [customers]);

    const filteredCustomers = customers.filter(customer =>
        customer.companyname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contactname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setNotFound(filteredCustomers.length === 0); // Actualiza el estado de "notFound"
    }, [filteredCustomers]);

    if (loading) {
        return <div style={{ paddingLeft: '30px' }}>Loading...</div>;
    }

    return (
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-x-auto sm:rounded-lg mt-5 w-full">
                <h1 className="text-5xl text-left mb-12">
                    <FormattedMessage id="CustomersList" />
                </h1>
                <div className="flex justify-between mb-4">
                    <button 
                        onClick={() => navigate('/orders')} 
                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-gray-600"
                    >
                        <FormattedMessage id="ConsultOrder" />
                    </button>
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
                        Customer not found
                    </div>
                ) : null}
                <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ maxHeight: '550px', overflowY: 'scroll' }}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-600 shadow-md">
                        <thead className="text-xs uppercase bg-white-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="Customerid" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="CompanyName" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="ContactName" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="City" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="Country" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="Phone" />
                                </th>
                                <th scope="col" className="px-6 py-3 text-white">
                                    <FormattedMessage id="Actions" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-600'>
                            {filteredCustomers.map(customer => (
                                <tr key={customer.customerid}>
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {customer.customerid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {customer.companyname}
                                    </td>
                                    <td className="px-6 py-4 text-blue-500 whitespace-nowrap dark:text-blue">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />
                                        {customer.contactname}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {customer.city}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {customer.country}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {customer.phone}
                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/customers/${customer.customerid}`)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 ml-7" />
                                        </button>
                                        <button onClick={() => handleDelete(customer.customerid)}>
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

CustomerList.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        customerid: PropTypes.string.isRequired,
        companyname: PropTypes.string.isRequired,
        contactname: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    })),
};
