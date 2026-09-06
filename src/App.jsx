import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import MarketingLayout from './components/layout/MarketingLayout';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

import Home from './pages/dashboard/Home';
import Locations from './pages/dashboard/Locations';
import Vouchers from './pages/dashboard/Vouchers';
import Transactions from './pages/dashboard/Transactions';
import Wallet from './pages/dashboard/Wallet';
import Settings from './pages/dashboard/Settings';

import Portal from './pages/portal/Portal';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOwners from './pages/admin/AdminOwners';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminWithdrawals from './pages/admin/AdminWithdrawals';
import NotFound from './pages/NotFound';

import Landing from './pages/marketing/Landing';
import Features from './pages/marketing/Features';
import HowItWorks from './pages/marketing/HowItWorks';
import Pricing from './pages/marketing/Pricing';
import Faq from './pages/marketing/Faq';
import Contact from './pages/marketing/Contact';
import ForMikrotik from './pages/marketing/ForMikrotik';
import ForMobileMoney from './pages/marketing/ForMobileMoney';
import ForVouchers from './pages/marketing/ForVouchers';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0E141B',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              padding: '12px 16px',
              fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
            },
            success: { iconTheme: { primary: '#0F766E', secondary: '#fff' } },
            error: { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
          }}
        />
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/for/mikrotik" element={<ForMikrotik />} />
            <Route path="/for/mobile-money" element={<ForMobileMoney />} />
            <Route path="/for/vouchers" element={<ForVouchers />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="locations" element={<Locations />} />
            <Route path="vouchers" element={<Vouchers />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/portal/:routerToken" element={<Portal />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/owners" element={<AdminOwners />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
