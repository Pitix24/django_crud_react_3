import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from "../api/crud.api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getAllProducts();
            setProducts(res.data);
            setNotFound(false); // Reset notFound state
        } catch (error) {
            console.error("Error loading products: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = useCallback(async (productid) => {
        const accepted = window.confirm("Are you sure you want to delete this product?");
        if (accepted) {
            try {
                await deleteProduct(productid);
                // Actualiza el estado local para reflejar la eliminación
                setProducts(customers.filter(product => product.productid !== productid));
                toast.success('Product successfully deleted', {
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
    }, [products]);

    const filteredProducts = products.filter(product =>
        product.productid.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setNotFound(filteredProducts.length === 0); // Actualiza el estado de "notFound"
    }, [filteredProducts]);

    if (loading) {
        return <div style={{ paddingLeft: '30px' }}>Loading...</div>;
    }

    return (
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <h1 className="text-5xl text-left mb-12">
                    <FormattedMessage id="ProductsList" />
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
                        Product not found
                    </div>
                ) : null}
                <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ maxHeight: '550px', overflowY: 'scroll' }}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y divide-gray-600">
                        <thead className="text-xs uppercase bg-white-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Productid" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="ProductName" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Supplierid" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Categoryid" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="UnitPrice" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="UnitsInStock" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="UnitsOnOrder" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Discontinued" /></th>
                                <th scope="col" className="px-6 py-3 text-white"><FormattedMessage id="Actions" /></th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-600'>
                            {filteredProducts.map(product => (
                                <tr key={product.productid}>
                                    <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.productid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.productname}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.supplierid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.categoryid}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.unitprice}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.unitsinstock}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.unitsonorder}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.discontinued}
                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/products/${product.productid}`)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 ml-7" />
                                        </button>
                                        <button onClick={() => handleDelete(product.productid)}>
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

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        productid: PropTypes.string.isRequired,
        productname: PropTypes.string.isRequired,
        supplierid: PropTypes.string.isRequired,
        categoryid: PropTypes.string.isRequired,
        quantityperunit: PropTypes.string.isRequired,
        unitprice: PropTypes.string.isRequired,
        unitsinstock: PropTypes.string.isRequired,
        unitsonorder: PropTypes.string.isRequired,
        reorderlevel: PropTypes.string.isRequired,
        discontinued: PropTypes.string.isRequired,
    })),
};
