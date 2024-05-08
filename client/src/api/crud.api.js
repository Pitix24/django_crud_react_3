import axios from 'axios'

const customerApi = axios.create({
    baseURL: 'http://localhost:8000/app_crud/api/v1/customers/'
})

const employeeApi = axios.create({
    baseURL: 'http://localhost:8000/app_crud/api/v1/employees/'
})

const orderApi = axios.create({
    baseURL: 'http://localhost:8000/app_crud/api/v1/orders/'
})

const orderDetailApi = axios.create({
    baseURL: 'http://localhost:8000/app_crud/api/v1/orderdetails/'
})

const productApi = axios.create({
    baseURL: 'http://localhost:8000/app_crud/api/v1/products/'
})

const supplierApi = axios.create({
    baseURL: 'http://localhost:8000/app_crud/api/v1/suppliers/'
});

const categoryApi = axios.create({
    baseURL: 'http://localhost:8000/app_crud/api/v1/categories/'
});

const shipperApi = axios.create({
    baseURL: 'http://localhost:8000/app_crud/api/v1/shippers/'
});

// customers
export const getAllCustomers = () => customerApi.get("/");

export const getCustomer = (customerid) => customerApi.get(`/${customerid}/`);

export const createCustomer = (customer) => customerApi.post("/", customer);

export const deleteCustomer = (customerid) => customerApi.delete(`/${customerid}`);

export const updateCustomer = (customerid, customer) => customerApi.put(`/${customerid}/`, customer);

export const getAllCustomerIds = async () => {
    try {
        const response = await customerApi.get('/');
        const customerIds = response.data.map(customer => customer.customerid);
        console.log('Customer IDs:', customerIds);
    
        return customerIds;
    } catch (error) {
        console.error('Error fetching customer IDs:', error);
        throw error;
    }
};

// employees
export const getAllEmployees = () => employeeApi.get("/");

export const getEmployee = (employeeid) => employeeApi.get(`/${employeeid}/`);

export const createEmployee = (employeeid) => employeeApi.post("/", employeeid);

export const deleteEmployee = (employeeid) => employeeApi.delete(`/${employeeid}`);

export const updateEmployee = (employeeid, employee) => employeeApi.put(`/${employeeid}/`, employee);

export const getAllEmployeeIds = async () => {
    try {
        const response = await employeeApi.get('/');
        const employeeIds = response.data.map(employee => employee.employeeid);
        console.log('Employee IDs:', employeeIds);
    
        return employeeIds;
    } catch (error) {
        console.error('Error fetching employee IDs:', error);
        throw error;
    }
};

// orders
export const getAllOrders = () => orderApi.get("/");

export const getOrder= (orderid) => orderApi.get(`/${orderid}/`);

export const createOrder = (orderid) => orderApi.post("/", orderid);

export const deleteOrder= (orderid) => orderApi.delete(`/${orderid}`);

export const updateOrder = (orderid, order) => orderApi.put(`/${orderid}/`, order);

export const getAllOrderIds = async () => {
    try {
        const response = await orderApi.get('/');
        const orderIds = response.data.map(order => order.orderid);
        console.log('Order IDs:', orderIds);
    
        return orderIds;
    } catch (error) {
        console.error('Error fetching order IDs:', error);
        throw error;
    }
};

// orderdetails
export const getAllOrderDetails = () => orderDetailApi.get("/");

export const getOrderDetail= (orderid, ) => orderDetailApi.get(`/${orderid}/`);

export const createOrderDetail = (orderDetailData) => orderDetailApi.post("/", orderDetailData);

export const deleteOrderDetail= (orderid ) => orderDetailApi.delete(`/${orderid}/`);

export const updateOrderDetail = (orderid, orderdetail) => orderDetailApi.put(`/${orderid}/`, orderdetail);


// products
export const getAllProducts = () => productApi.get("/");

export const getProduct= (productid) => productApi.get(`/${productid}/`);

export const createProduct = (productid) => productApi.post("/", productid);

export const deleteProduct= (productid) => productApi.delete(`/${productid}`);

export const updateProduct = (productid, product) => productApi.put(`/${productid}/`, product);

export const getAllProductIds = async () => {
    try {
        const response = await productApi.get('/');
        const productIds = response.data.map(product => product.productid);
        console.log('Product IDs:', productIds);
    
        return productIds;
    } catch (error) {
        console.error('Error fetching product IDs:', error);
        throw error;
    }
};

// suppliers
export const getAllSupplierIds = async () => {
    try {
        const response = await supplierApi.get('/');
        const supplierIds = response.data.map(supplier => supplier.supplierid);
        console.log('Supplier IDs:', supplierIds);
    
        return supplierIds;
    } catch (error) {
        console.error('Error fetching supplier IDs:', error);
        throw error;
    }
};

// categories
export const getAllCategoryIds = async () => {
    try {
        const response = await categoryApi.get('/');
        const categoryIds = response.data.map(category => category.categoryid);
        console.log('Category IDs:', categoryIds);
    
        return categoryIds;
    } catch (error) {
        console.error('Error fetching category IDs:', error);
        throw error;
    }
};

// shippers
export const getAllShipperIds = async () => {
    try {
        const response = await shipperApi.get('/'); // Asegúrate de que la ruta sea la correcta
        const shipperIds = response.data.map(shipper => shipper.shipperid);
        console.log('Shipper IDs:', shipperIds);

        return shipperIds;
    } catch (error) {
        console.error('Error fetching shipper IDs:', error);
        throw error;
    }
};
