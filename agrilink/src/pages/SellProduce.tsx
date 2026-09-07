import React, { useState } from 'react';
import { CheckCircle2, UploadCloud } from 'lucide-react';
import { Input, Select, Textarea } from '../components/FormControls';
import { Button } from '../components/Button';
import { crops } from '../data/crops';
import { markets } from '../data/markets';
import { publishListing } from '../services/marketplaceService';

interface FormState {
  cropId: string;
  category: string;
  variety: string;
  quantity: string;
  quantityUnit: string;
  price: string;
  priceUnit: string;
  state: string;
  district: string;
  village: string;
  harvestDate: string;
  grade: string;
  description: string;
  contactPreference: string;
}

const initialState: FormState = {
  cropId: '', category: '', variety: '', quantity: '', quantityUnit: 'Quintal',
  price: '', priceUnit: '/Quintal', state: '', district: '', village: '',
  harvestDate: '', grade: '', description: '', contactPreference: 'call',
};

export default function SellProduce() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (key: keyof FormState, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.cropId) e.cropId = 'Select a crop';
    if (!form.quantity || Number(form.quantity) <= 0) e.quantity = 'Enter a valid quantity';
    if (!form.price || Number(form.price) <= 0) e.price = 'Enter a valid price';
    if (!form.state) e.state = 'Select a state';
    if (!form.district) e.district = 'Select a district';
    if (!form.village) e.village = 'Enter your village or location';
    if (!form.harvestDate) e.harvestDate = 'Select a harvest date';
    if (!form.grade) e.grade = 'Select a quality grade';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const crop = crops.find((c) => c.id === form.cropId)!;
    await publishListing({
      cropId: form.cropId,
      farmerName: 'You',
      verified: false,
      location: form.village,
      district: form.district,
      state: form.state,
      quantity: Number(form.quantity),
      quantityUnit: form.quantityUnit,
      price: Number(form.price),
      priceUnit: form.priceUnit,
      harvestDate: form.harvestDate,
      grade: form.grade as 'A' | 'B' | 'C',
      description: form.description,
      imageColor: '#7CB566',
      category: crop.category,
    });
    setSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-field-50 text-field-700">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-soil-900">Listing published</h2>
        <p className="mt-2 text-sm text-soil-900/60">
          Your produce is now visible to buyers on the AgriLink Marketplace.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="secondary" onClick={() => { setForm(initialState); setSuccess(false); }}>List Another</Button>
          <Button onClick={() => (window.location.href = '/marketplace')}>View Marketplace</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">Sell Your Produce</h1>
      <p className="mt-1.5 text-soil-900/60">List your crop so buyers can find and contact you directly.</p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-6 rounded-card border border-soil-100 bg-white p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Crop Name"
            placeholder="Select crop"
            value={form.cropId}
            onChange={(e) => update('cropId', e.target.value)}
            options={crops.map((c) => ({ value: c.id, label: `${c.icon} ${c.name}` }))}
            error={errors.cropId}
          />
          <Input label="Variety (optional)" placeholder="e.g. Sharbati" value={form.variety} onChange={(e) => update('variety', e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Input label="Quantity" type="number" min={0} value={form.quantity} onChange={(e) => update('quantity', e.target.value)} error={errors.quantity} />
          <Select label="Unit" value={form.quantityUnit} onChange={(e) => update('quantityUnit', e.target.value)} options={[{ value: 'Quintal', label: 'Quintal' }, { value: 'Kg', label: 'Kg' }, { value: 'Ton', label: 'Ton' }]} />
          <Input label="Expected Price" type="number" min={0} value={form.price} onChange={(e) => update('price', e.target.value)} error={errors.price} />
          <Select label="Price Unit" value={form.priceUnit} onChange={(e) => update('priceUnit', e.target.value)} options={[{ value: '/Quintal', label: 'Per Quintal' }, { value: '/Kg', label: 'Per Kg' }]} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Select
            label="State"
            placeholder="Select state"
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
            options={[...new Set(markets.map((m) => m.state))].map((s) => ({ value: s, label: s }))}
            error={errors.state}
          />
          <Select
            label="District"
            placeholder="Select district"
            value={form.district}
            onChange={(e) => update('district', e.target.value)}
            options={[...new Set(markets.map((m) => m.district))].map((d) => ({ value: d, label: d }))}
            error={errors.district}
          />
          <Input label="Village / Location" placeholder="e.g. Berasia" value={form.village} onChange={(e) => update('village', e.target.value)} error={errors.village} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Harvest Date" type="date" value={form.harvestDate} onChange={(e) => update('harvestDate', e.target.value)} error={errors.harvestDate} />
          <Select
            label="Quality Grade"
            placeholder="Select grade"
            value={form.grade}
            onChange={(e) => update('grade', e.target.value)}
            options={[{ value: 'A', label: 'Grade A' }, { value: 'B', label: 'Grade B' }, { value: 'C', label: 'Grade C' }]}
            error={errors.grade}
          />
        </div>

        <Textarea label="Product Description" rows={4} placeholder="Describe quality, moisture content, packaging, etc." value={form.description} onChange={(e) => update('description', e.target.value)} />

        <div>
          <label className="text-sm font-medium text-soil-900">Image Upload</label>
          <div className="mt-1.5 flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-soil-100 bg-soil-50 px-4 py-8 text-center">
            <UploadCloud size={22} className="text-soil-900/40" />
            <span className="text-sm text-soil-900/50">Prototype only — image upload is not wired up.</span>
          </div>
        </div>

        <Select
          label="Contact Preference"
          value={form.contactPreference}
          onChange={(e) => update('contactPreference', e.target.value)}
          options={[{ value: 'call', label: 'Phone Call' }, { value: 'sms', label: 'SMS' }, { value: 'app', label: 'In-app messages' }]}
        />

        <Button type="submit" size="lg" fullWidth disabled={submitting}>
          {submitting ? 'Publishing...' : 'Publish Listing'}
        </Button>
      </form>
    </div>
  );
}
