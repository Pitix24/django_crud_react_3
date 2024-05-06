import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEmployees, deleteEmployee } from "../api/crud.api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [notFound, setNotFound] = useState(false); // Nuevo estado para mostrar el mensaje
    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAllEmployees();
            setEmployees(res.data);
            setNotFound(false); // Reset notFound state
        } catch (error) {
            console.error("Error loading employees: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = useCallback(async (employeeid) => {
        const accepted = window.confirm("Are you sure you want to delete this employee?");
        if (accepted) {
            try {
                await deleteEmployee(employeeid);
                // Actualiza el estado local para reflejar la eliminación
                setEmployees(employees.filter(employee => employee.employeeid !== employeeid));
                toast.success('Employee successfully deleted', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff"
                    }
                });
            } catch (error) {
                console.error("Error deleting employee: ", error);
            }
        }
    }, [employees]);

    const filteredEmployees = employees.filter(customer =>
        customer.employeeid.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setNotFound(filteredEmployees.length === 0); // Actualiza el estado de "notFound"
    }, [filteredEmployees]);

    if (loading) {
        return <div style={{ paddingLeft: '30px' }}>Loading...</div>;
    }

    return (
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <h1 className="text-5xl text-left mb-12">
                    <FormattedMessage id="EmployeesList" />
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
                        Employee not found
                    </div>
                ) : null}
                <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ maxHeight: '550px', overflowY: 'scroll' }}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-600">
                        <thead className="text-xs uppercase bg-white-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Employeeid" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="LastName" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="FirstName" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Title" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="HireDate" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="City" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Country" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="HomePhone" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Actions" /></th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-600'>
                            {filteredEmployees.map(employee => (
                                <tr key={employee.employeeid}>
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {employee.employeeid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {employee.lastname}
                                    </td>
                                    <td className="px-6 py-4 text-blue-500 whitespace-nowrap dark:text-blue">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />    
                                        {employee.firstname}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {employee.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {employee.hiredate}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {employee.city}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {employee.country}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {employee.homephone}
                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/employees/${employee.employeeid}`)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 ml-7" />
                                        </button>
                                        <button onClick={() => handleDelete(employee.employeeid)}>
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

EmployeeList.propTypes = {
    employees: PropTypes.arrayOf(PropTypes.shape({
        employeeid: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        firstname: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        titleofcourtesy: PropTypes.string.isRequired,
        birthdate: PropTypes.string.isRequired,
    })),
};
