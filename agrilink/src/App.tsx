import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import MarketPrices from './pages/MarketPrices';
import MarketComparison from './pages/MarketComparison';
import Marketplace from './pages/Marketplace';
import MarketplaceDetail from './pages/MarketplaceDetail';
import SellProduce from './pages/SellProduce';
import Dashboard from './pages/Dashboard';
import PriceAlerts from './pages/PriceAlerts';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminContactRequests from './pages/AdminContactRequests';
import Testimonials from './pages/Testimonials';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeSelector } from './components/ThemeSelector';
import { AgriChatbot } from './components/AgriChatbot';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/compare-markets" element={<MarketComparison />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<MarketplaceDetail />} />
          <Route path="/sell-produce" element={<SellProduce />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/price-alerts" element={<PriceAlerts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/admin/contact-requests" element={<AdminContactRequests />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ThemeSelector />
      <AgriChatbot />
    </div>
  );
}
