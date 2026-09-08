import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input, Textarea } from '../components/FormControls';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { addContactRequest, t } = useApp();
  const [form, setForm] = useState({ name: '', contact: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addContactRequest(form);
    setForm({ name: '', contact: '', subject: '', message: '' });
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">{t('Contact Us')}</h1>
      <p className="mt-1.5 text-soil-900/60">{t('Send us your question or request.')}</p>
      {submitted && <p className="mt-5 rounded-card bg-field-50 px-4 py-3 text-sm text-field-800">{t('Your request has been submitted successfully.')}</p>}
      <form onSubmit={handleSubmit} className="mt-7 space-y-4 rounded-card border border-soil-100 bg-white p-5 sm:p-6">
        <Input label={t('Name')} value={form.name} onChange={(event) => update('name', event.target.value)} required />
        <Input label={t('Email / Phone')} value={form.contact} onChange={(event) => update('contact', event.target.value)} required />
        <Input label={t('Subject')} value={form.subject} onChange={(event) => update('subject', event.target.value)} required />
        <Textarea label={t('Message')} rows={5} value={form.message} onChange={(event) => update('message', event.target.value)} required />
        <Button type="submit">{t('Submit')}</Button>
      </form>
    </div>
  );
}