import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input, Select, Textarea } from '../components/FormControls';
import { Badge } from '../components/Badge';
import { Modal, EmptyState } from '../components/Feedback';
import { useApp } from '../context/AppContext';
import { ContactRequest, ContactRequestStatus } from '../types';

const statuses: ContactRequestStatus[] = ['Pending', 'Approved', 'Rejected', 'Resolved'];

export default function AdminContactRequests() {
  const { contactRequests, updateContactRequest, t } = useApp();
  const [selected, setSelected] = useState<ContactRequest | null>(null);
  const [solution, setSolution] = useState('');

  const openRequest = (request: ContactRequest) => {
    setSelected(request);
    setSolution(request.solution);
  };

  const updateStatus = (status: ContactRequestStatus) => {
    if (selected) {
      updateContactRequest(selected.id, { status });
      setSelected({ ...selected, status });
    }
  };

  const saveSolution = () => {
    if (!selected) return;
    updateContactRequest(selected.id, { solution, status: 'Resolved' });
    setSelected({ ...selected, solution, status: 'Resolved' });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">{t('Contact Requests')}</h1>
      <p className="mt-1.5 text-soil-900/60">{t('Review and manage contact requests.')}</p>
      <div className="mt-7">
        {contactRequests.length === 0 ? (
          <EmptyState title={t('No contact requests yet')} description={t('Submitted Contact Us requests will appear here.')} />
        ) : (
          <div className="overflow-hidden rounded-card border border-soil-100 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-soil-50 text-xs uppercase tracking-wide text-soil-900/50">
                  <tr><th className="px-4 py-3">{t('Name')}</th><th className="px-4 py-3">{t('Contact')}</th><th className="px-4 py-3">{t('Subject')}</th><th className="px-4 py-3">{t('Message')}</th><th className="px-4 py-3">{t('Date')}</th><th className="px-4 py-3">{t('Status')}</th><th className="px-4 py-3"></th></tr>
                </thead>
                <tbody>
                  {contactRequests.map((request) => (
                    <tr key={request.id} className="border-t border-soil-100">
                      <td className="px-4 py-3.5 font-medium text-soil-900">{request.name}</td>
                      <td className="px-4 py-3.5">{request.contact}</td>
                      <td className="px-4 py-3.5">{request.subject}</td>
                      <td className="max-w-xs truncate px-4 py-3.5">{request.message}</td>
                      <td className="px-4 py-3.5 text-soil-900/60">{new Date(request.date).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3.5"><Badge tone={request.status === 'Resolved' ? 'green' : request.status === 'Rejected' ? 'red' : request.status === 'Approved' ? 'amber' : 'neutral'}>{t(request.status)}</Badge></td>
                      <td className="px-4 py-3.5"><button onClick={() => openRequest(request)} className="font-medium text-field-700 hover:underline">{t('View')}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Modal open={!!selected} onClose={() => setSelected(null)} title={t('Contact Request')}>
        {selected && <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input label={t('Name')} value={selected.name} readOnly />
            <Input label={t('Contact')} value={selected.contact} readOnly />
          </div>
          <Input label={t('Subject')} value={selected.subject} readOnly />
          <Textarea label={t('Message')} value={selected.message} rows={5} readOnly />
          <Select label={t('Status')} value={selected.status} onChange={(event) => updateStatus(event.target.value as ContactRequestStatus)} options={statuses.map((status) => ({ value: status, label: t(status) }))} />
          <Textarea label={t('Solution / Reply')} value={solution} rows={4} onChange={(event) => setSolution(event.target.value)} />
          <Button fullWidth onClick={saveSolution}>{t('Save Reply and Resolve')}</Button>
        </div>}
      </Modal>
    </div>
  );
}