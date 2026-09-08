import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { Input } from '../components/FormControls';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';

export default function AdminLogin() {
  const { adminLogin } = useApp();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (adminLogin(identifier, password)) navigate('/admin/dashboard');
    else setError(true);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <div className="mb-6 flex flex-col items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-field-700 text-white"><Sprout size={22} /></span>
        <h1 className="mt-3 text-2xl font-semibold text-soil-900">Admin Login</h1>
        <p className="mt-1 text-sm text-soil-900/60">Sign in to manage AgriLink.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-card border border-soil-100 bg-white p-5">
        <Input label="Admin Email / Username" value={identifier} onChange={(event) => setIdentifier(event.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required error={error ? 'Invalid admin credentials' : undefined} />
        <Button type="submit" fullWidth size="lg">Login</Button>
      </form>
      <p className="mt-5 text-center text-sm text-soil-900/60"><Link to="/" className="font-medium text-field-700 hover:underline">Back to AgriLink</Link></p>
    </div>
  );
}