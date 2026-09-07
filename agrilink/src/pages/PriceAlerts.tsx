import React, { useState } from 'react';
import { Plus, Pencil, Trash2, BellRing } from 'lucide-react';
import { Button } from '../components/Button';
import { Select, Input } from '../components/FormControls';
import { Modal, EmptyState } from '../components/Feedback';
import { Badge } from '../components/Badge';
import { crops, getCropById } from '../data/crops';
import { markets } from '../data/markets';
import { priceAlertsSeed } from '../data/insights';
import { getPriceForMarketCrop } from '../data/marketPrices';
import { PriceAlert } from '../types';
import { formatINR } from '../utils/format';

export default function PriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>(priceAlertsSeed);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PriceAlert | null>(null);
  const [form, setForm] = useState({ cropId: 'wheat', targetPrice: '', preferredMarketId: 'bhopal', notifyVia: 'app' as PriceAlert['notifyVia'] });

  const openNew = () => {
    setEditing(null);
    setForm({ cropId: 'wheat', targetPrice: '', preferredMarketId: 'bhopal', notifyVia: 'app' });
    setModalOpen(true);
  };

  const openEdit = (a: PriceAlert) => {
    setEditing(a);
    setForm({ cropId: a.cropId, targetPrice: String(a.targetPrice), preferredMarketId: a.preferredMarketId, notifyVia: a.notifyVia });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.targetPrice) return;
    if (editing) {
      setAlerts((prev) => prev.map((a) => (a.id === editing.id ? { ...a, cropId: form.cropId, targetPrice: Number(form.targetPrice), preferredMarketId: form.preferredMarketId, notifyVia: form.notifyVia } : a)));
    } else {
      setAlerts((prev) => [
        ...prev,
        { id: `pa${Date.now()}`, cropId: form.cropId, targetPrice: Number(form.targetPrice), preferredMarketId: form.preferredMarketId, notifyVia: form.notifyVia, status: 'watching' },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">My Price Alerts</h1>
          <p className="mt-1.5 text-soil-900/60">Get notified when your crop hits your target price.</p>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Add Alert</Button>
      </div>

      <div className="mt-7">
        {alerts.length === 0 ? (
          <EmptyState title="No price alerts yet" description="Add an alert to get notified when a crop reaches your target price." action={<Button onClick={openNew}>Add Price Alert</Button>} />
        ) : (
          <div className="space-y-3">
            {alerts.map((a) => {
              const crop = getCropById(a.cropId)!;
              const market = markets.find((m) => m.id === a.preferredMarketId)!;
              const current = getPriceForMarketCrop(a.cropId, a.preferredMarketId);
              return (
                <div key={a.id} className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-soil-100 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-field-50 text-lg">{crop.icon}</span>
                    <div>
                      <div className="font-semibold text-soil-900">{crop.name}</div>
                      <div className="text-xs text-soil-900/50">Preferred: {market.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <div className="text-xs text-soil-900/50">Target Price</div>
                      <div className="font-semibold text-soil-900">{formatINR(a.targetPrice)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-soil-900/50">Current Price</div>
                      <div className="font-semibold text-soil-900">{current ? formatINR(current.modalPrice) : '—'}</div>
                    </div>
                    <Badge tone={current && current.modalPrice >= a.targetPrice ? 'green' : 'amber'}>
                      <BellRing size={12} /> {current && current.modalPrice >= a.targetPrice ? 'Target reached' : 'Watching'}
                    </Badge>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEdit(a)} className="rounded p-2 text-soil-900/50 hover:bg-soil-100" aria-label="Edit"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(a.id)} className="rounded p-2 text-clay-500 hover:bg-red-50" aria-label="Delete"><Trash2 size={16} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Alert' : 'Add Price Alert'}>
        <div className="space-y-4">
          <Select label="Crop" value={form.cropId} onChange={(e) => setForm((f) => ({ ...f, cropId: e.target.value }))} options={crops.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))} />
          <Input label="Target Price (₹/Quintal)" type="number" min={0} value={form.targetPrice} onChange={(e) => setForm((f) => ({ ...f, targetPrice: e.target.value }))} />
          <Select label="Preferred Market" value={form.preferredMarketId} onChange={(e) => setForm((f) => ({ ...f, preferredMarketId: e.target.value }))} options={markets.map((m) => ({ value: m.id, label: m.name }))} />
          <Select label="Notification Preference" value={form.notifyVia} onChange={(e) => setForm((f) => ({ ...f, notifyVia: e.target.value as PriceAlert['notifyVia'] }))} options={[{ value: 'app', label: 'App notification' }, { value: 'sms', label: 'SMS' }, { value: 'both', label: 'Both' }]} />
          <Button fullWidth onClick={handleSave}>{editing ? 'Save Changes' : 'Add Alert'}</Button>
        </div>
      </Modal>
    </div>
  );
}
