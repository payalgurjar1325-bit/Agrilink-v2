import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Sprout as FarmerIcon, Store } from 'lucide-react';
import { Input, Select } from '../components/FormControls';
import { Button } from '../components/Button';
import { districtsByState, markets, states } from '../data/markets';
import { crops } from '../data/crops';
import { useApp } from '../context/AppContext';

export default function Register() {
  const [role, setRole] = useState<'farmer' | 'buyer' | ''>('');
  const { login, registerUser, t } = useApp();
  const navigate = useNavigate();

  const [farmerForm, setFarmerForm] = useState({ name: '', mobile: '', state: '', district: '', village: '', crop: '', password: '' });
  const [buyerForm, setBuyerForm] = useState({ name: '', org: '', mobile: '', email: '', location: '', businessType: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const registeredRole = role as 'farmer' | 'buyer';
    const name = role === 'farmer' ? farmerForm.name || 'Farmer' : buyerForm.name || 'Buyer';
    registerUser({ name, role: registeredRole, contact: role === 'farmer' ? farmerForm.mobile : buyerForm.mobile });
    login({ name, role: registeredRole });
    navigate(role === 'farmer' ? '/dashboard' : '/marketplace');
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6">
      <div className="mb-6 flex flex-col items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-field-700 text-white">
          <Sprout size={22} />
        </span>
        <h1 className="mt-3 text-2xl font-semibold text-soil-900">{t('Create your account')}</h1>
        <p className="mt-1 text-sm text-soil-900/60">{t('Join AgriLink as a farmer or a buyer.')}</p>
      </div>

      {!role ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button onClick={() => setRole('farmer')} className="flex flex-col items-center gap-3 rounded-card border border-soil-100 bg-white p-7 hover:border-field-500">
            <FarmerIcon size={26} className="text-field-700" />
            <span className="font-semibold text-soil-900">{t('I am a Farmer')}</span>
          </button>
          <button onClick={() => setRole('buyer')} className="flex flex-col items-center gap-3 rounded-card border border-soil-100 bg-white p-7 hover:border-field-500">
            <Store size={26} className="text-field-700" />
            <span className="font-semibold text-soil-900">{t('I am a Buyer')}</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-card border border-soil-100 bg-white p-5">
          {role === 'farmer' ? (
            <>
              <Input label="Full Name" required value={farmerForm.name} onChange={(e) => setFarmerForm((f) => ({ ...f, name: e.target.value }))} />
              <Input label="Mobile Number" required value={farmerForm.mobile} onChange={(e) => setFarmerForm((f) => ({ ...f, mobile: e.target.value }))} />
              <div className="grid grid-cols-2 gap-4">
                <Select label="State" placeholder="Select" value={farmerForm.state} onChange={(e) => setFarmerForm((f) => ({ ...f, state: e.target.value, district: '' }))} options={states.map((s) => ({ value: s, label: s }))} />
                <Select label="District" placeholder="Select" value={farmerForm.district} onChange={(e) => setFarmerForm((f) => ({ ...f, district: e.target.value }))} options={(districtsByState[farmerForm.state] ?? []).map((d) => ({ value: d, label: d }))} />
              </div>
              <Input label="Village" required value={farmerForm.village} onChange={(e) => setFarmerForm((f) => ({ ...f, village: e.target.value }))} />
              <Select label="Primary Crops" placeholder="Select" value={farmerForm.crop} onChange={(e) => setFarmerForm((f) => ({ ...f, crop: e.target.value }))} options={crops.map((c) => ({ value: c.id, label: c.name }))} />
              <Input label="Password" type="password" required value={farmerForm.password} onChange={(e) => setFarmerForm((f) => ({ ...f, password: e.target.value }))} />
            </>
          ) : (
            <>
              <Input label="Name" required value={buyerForm.name} onChange={(e) => setBuyerForm((f) => ({ ...f, name: e.target.value }))} />
              <Input label="Business / Organization" value={buyerForm.org} onChange={(e) => setBuyerForm((f) => ({ ...f, org: e.target.value }))} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Mobile" required value={buyerForm.mobile} onChange={(e) => setBuyerForm((f) => ({ ...f, mobile: e.target.value }))} />
                <Input label="Email" type="email" value={buyerForm.email} onChange={(e) => setBuyerForm((f) => ({ ...f, email: e.target.value }))} />
              </div>
              <Input label="Location" value={buyerForm.location} onChange={(e) => setBuyerForm((f) => ({ ...f, location: e.target.value }))} />
              <Select
                label="Business Type"
                placeholder="Select"
                value={buyerForm.businessType}
                onChange={(e) => setBuyerForm((f) => ({ ...f, businessType: e.target.value }))}
                options={[{ value: 'trader', label: 'Trader' }, { value: 'processor', label: 'Processor' }, { value: 'fpo', label: 'FPO / Cooperative' }, { value: 'retailer', label: 'Retailer' }]}
              />
              <Input label="Password" type="password" required value={buyerForm.password} onChange={(e) => setBuyerForm((f) => ({ ...f, password: e.target.value }))} />
            </>
          )}
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setRole('')}>{t('Back')}</Button>
            <Button type="submit" fullWidth>{t('Create Account')}</Button>
          </div>
        </form>
      )}

      <p className="mt-5 text-center text-sm text-soil-900/60">
        Already have an account? <Link to="/login" className="font-medium text-field-700 hover:underline">{t('Login')}</Link>
      </p>
    </div>
  );
}
