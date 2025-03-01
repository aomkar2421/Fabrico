import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import { ThemeProvider } from '../Admin/context/theme-context';
import Layout from '../Admin/routes/Layout';
import DashboardPage from "../Admin/routes/dashboard/page"
import AdminDashboard from './Components/AdminDashboard';
import ProductsTable from './Components/ProductsTable';
import OrdersTable from './Components/OrdersTable';
import CreateProductForm from './Components/CreateProductForm';
import NewProducts from './Components/NewProducts';
import NewOrders from './Components/NewOrders';


function Admin() {
  return (
    <ThemeProvider storageKey="theme">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsTable />} />
          <Route path="newProducts" element={<NewProducts />} />
          <Route path="orders" element={<OrdersTable />} />
          <Route path="newOrders" element={<NewOrders />} />
          <Route path="product/create" element={<CreateProductForm />} />
          <Route path="analytics" element={<h1 className="title">Analytics</h1>} />
          <Route path="reports" element={<h1 className="title">Reports</h1>} />
          <Route path="new-customer" element={<h1 className="title">New Customer</h1>} />
          <Route path="verified-customers" element={<h1 className="title">Verified Customers</h1>} />
          <Route path="new-product" element={<h1 className="title">New Product</h1>} />
          <Route path="inventory" element={<h1 className="title">Inventory</h1>} />
          <Route path="settings" element={<h1 className="title">Settings</h1>} />
          {/* Redirect any unmatched paths to the dashboard */}
          <Route path="*" element={<Navigate to="" replace />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default Admin
