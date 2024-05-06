import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerPage } from './pages/CustomerPage';
import { EmployeePage } from './pages/EmployeePage';
import { OrderPage } from './pages/OrderPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { ProductPage } from './pages/ProductPage';
import { CustomerFormPage } from './pages/CustomerFormPage';
import { EmployeeFormPage } from './pages/EmployeeFormPage';
import { ProductFormPage } from './pages/ProductFormPage';
import { OrderDetailFormPage } from './pages/OrderDetailFormPage';
import { OrderFormPage } from './pages/OrderFormPage';
import { Navigation } from './components/Navigation';
import { Toaster } from 'react-hot-toast';
import { IntlProvider } from 'react-intl';
import en from './locales/en.json';
import es from './locales/es.json';

function App() {
  const [locale, setLocale] = useState('es'); // Cambia esto para cambiar el idioma

  const messages = {
    en: en,
    es: es
  };
  
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <div className='app-container'>
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="/customers" />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/customers-create" element={<CustomerFormPage />} />
            <Route path="/customers/:customerid" element={<CustomerFormPage />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/employees-create" element={<EmployeeFormPage />} />
            <Route path="/employees/:employeeid" element={<EmployeeFormPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/orders-create" element={<OrderFormPage />} />
            <Route path="/orders/:orderid" element={<OrderFormPage />} />
            <Route path="/orderdetails" element={<OrderDetailPage />} />
            <Route path="/orderdetails-create" element={<OrderDetailFormPage />} />
            <Route path="/orderdetails/:orderid" element={<OrderDetailFormPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products-create" element={<ProductFormPage />} />
            <Route path="/products/:productid" element={<ProductFormPage />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </IntlProvider>
  )
}

export default App;
