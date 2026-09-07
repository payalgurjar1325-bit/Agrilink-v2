import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { Input } from '../components/FormControls';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [role, setRole] = useState<'farmer' | 'buyer'>('farmer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ name: role === 'farmer' ? 'Ramesh' : 'Buyer', role });
    navigate(role === 'farmer' ? '/dashboard' : '/marketplace');
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <div className="mb-6 flex flex-col items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-field-700 text-white">
          <Sprout size={22} />
        </span>
        <h1 className="mt-3 text-2xl font-semibold text-soil-900">Welcome back</h1>
        <p className="mt-1 text-sm text-soil-900/60">Log in to AgriLink to continue.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 rounded-card border border-soil-100 bg-white p-1">
        {(['farmer', 'buyer'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`rounded-card py-2.5 text-sm font-medium capitalize transition-colors ${role === r ? 'bg-field-700 text-white' : 'text-soil-900/60'}`}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-card border border-soil-100 bg-white p-5">
        <Input label="Mobile Number / Email" placeholder="Enter mobile number or email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
        <Input label="Password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="flex justify-end">
          <Link to="#" className="text-xs font-medium text-field-700 hover:underline">Forgot Password?</Link>
        </div>
        <Button type="submit" fullWidth size="lg">Login as {role === 'farmer' ? 'Farmer' : 'Buyer'}</Button>
      </form>

      <p className="mt-5 text-center text-sm text-soil-900/60">
        New to AgriLink? <Link to="/register" className="font-medium text-field-700 hover:underline">Create Account</Link>
      </p>
    </div>
  );
}
