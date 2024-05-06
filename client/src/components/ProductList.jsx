import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../api/crud.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
    const accepted = window.confirm("Are you sure?");
    if (accepted) {
      try {
        await deleteProduct(productid);
        // Actualizar la lista de productos después de eliminar
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productid !== productid)
        );
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    product.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12"
      style={{ maxHeight: "650px", overflowY: "scroll" }}
    >
      <div className="text-center bg-white py-6 mb-5">
        <h1 className="text-4xl font-semibold dark:text-black">
          Listado de Productos
        </h1>
      </div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Introduzca el nombre del producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full max-w-md px-4 py-2 border-gray-300 rounded-md text-black focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {filteredProducts.length === 0 && searchTerm !== "" && (
        <div className="text-center text-red-500 font-semibold mb-4">
          Producto no encontrado
        </div>
      )}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Productid
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Supplier ID
            </th>
            <th scope="col" className="px-6 py-3">
              Category ID
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity Per Unit
            </th>
            <th scope="col" className="px-6 py-3">
              Unit Price
            </th>
            <th scope="col" className="px-6 py-3">
              Units In Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Units On Order
            </th>
            <th scope="col" className="px-6 py-3">
              Reorder Level
            </th>
            <th scope="col" className="px-6 py-3">
              Discontinued
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.productid}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {product.productid}
              </th>
              <td className="px-6 py-4">{product.productname}</td>
              <td className="px-6 py-4">{product.supplierid}</td>
              <td className="px-6 py-4">{product.categoryid}</td>
              <td className="px-6 py-4">{product.quantityperunit}</td>
              <td className="px-6 py-4">{product.unitprice}</td>
              <td className="px-6 py-4">{product.unitsinstock}</td>
              <td className="px-6 py-4">{product.unitsonorder}</td>
              <td className="px-6 py-4">{product.reorderlevel}</td>
              <td className="px-6 py-4">{product.discontinued}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => navigate(`/products/${product.productid}`)}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 ml-1"
                  />
                </button>
                <button onClick={() => handleDelete(product.productid)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 ml-4"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};
