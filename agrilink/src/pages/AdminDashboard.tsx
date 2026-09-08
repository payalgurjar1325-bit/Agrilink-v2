import React, { useState } from 'react';
import { LayoutDashboard, Users, MessageSquare, Star, Package, LogOut, Eye, Check, X } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { EmptyState, Modal } from '../components/Feedback';
import { Input, Textarea } from '../components/FormControls';
import { StatCard } from '../components/StatCard';
import { useApp } from '../context/AppContext';
import { ContactRequest, ContactRequestStatus, Review } from '../types';
import { productListings } from '../data/marketplace';

type Section = 'dashboard' | 'users' | 'contact' | 'reviews' | 'listings';
const sections: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'contact', label: 'Contact Requests', icon: MessageSquare },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'listings', label: 'Marketplace Listings', icon: Package },
];
const statuses: ContactRequestStatus[] = ['Pending', 'Approved', 'Rejected', 'Resolved'];

export default function AdminDashboard() {
  const { adminLoggedIn, adminLogout, contactRequests, updateContactRequest, registeredUsers, reviews, updateReview } = useApp();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>('dashboard');
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [solution, setSolution] = useState('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  if (!adminLoggedIn) return <Navigate to="/admin/login" replace />;

  const pending = contactRequests.filter((request) => request.status === 'Pending').length;
  const approved = contactRequests.filter((request) => request.status === 'Approved').length;
  const resolved = contactRequests.filter((request) => request.status === 'Resolved').length;
  const openRequest = (request: ContactRequest) => { setSelectedRequest(request); setSolution(request.solution); };
  const saveSolution = () => {
    if (!selectedRequest) return;
    updateContactRequest(selectedRequest.id, { solution, status: 'Resolved' });
    setSelectedRequest(null);
  };
  const logout = () => { adminLogout(); navigate('/admin/login'); };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
      <aside className="w-full shrink-0 rounded-card border border-soil-100 bg-white p-3 lg:w-60">
        <div className="mb-3 px-3 py-2 text-sm font-semibold text-soil-900">Admin Panel</div>
        <nav className="grid grid-cols-2 gap-1 lg:grid-cols-1">
          {sections.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setSection(id)} className={`flex items-center gap-2 rounded-card px-3 py-2.5 text-left text-sm font-medium ${section === id ? 'bg-field-50 text-field-700' : 'text-soil-900/70 hover:bg-soil-50'}`}><Icon size={16} />{label}</button>)}
          <button onClick={logout} className="flex items-center gap-2 rounded-card px-3 py-2.5 text-left text-sm font-medium text-soil-900/70 hover:bg-soil-50"><LogOut size={16} />Logout</button>
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        {section === 'dashboard' && <>
          <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">Admin Dashboard</h1>
          <p className="mt-1.5 text-soil-900/60">Overview of AgriLink activity.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Users} label="Total Users" value={String(registeredUsers.length)} />
            <StatCard icon={Users} label="Total Farmers" value={String(registeredUsers.filter((user) => user.role === 'farmer').length)} />
            <StatCard icon={Users} label="Total Buyers" value={String(registeredUsers.filter((user) => user.role === 'buyer').length)} />
            <StatCard icon={MessageSquare} label="Total Contact Requests" value={String(contactRequests.length)} />
            <StatCard icon={MessageSquare} label="Pending Requests" value={String(pending)} />
            <StatCard icon={Check} label="Approved Requests" value={String(approved)} />
            <StatCard icon={Check} label="Resolved Requests" value={String(resolved)} />
            <StatCard icon={Star} label="Total Reviews" value={String(reviews.length)} />
          </div>
        </>}
        {section === 'users' && <UserSection users={registeredUsers} />}
        {section === 'contact' && <ContactSection requests={contactRequests} openRequest={openRequest} />}
        {section === 'reviews' && <ReviewSection reviews={reviews} onView={setSelectedReview} onStatus={updateReview} />}
        {section === 'listings' && <ListingSection />}
      </main>

      <Modal open={!!selectedRequest} onClose={() => setSelectedRequest(null)} title="Contact Request">
        {selectedRequest && <div className="space-y-4">
          <Input label="Name" value={selectedRequest.name} readOnly /><Input label="Contact" value={selectedRequest.contact} readOnly /><Input label="Subject" value={selectedRequest.subject} readOnly /><Textarea label="Message" value={selectedRequest.message} rows={4} readOnly />
          <div className="flex flex-wrap gap-2">{statuses.map((status) => <Button key={status} size="sm" variant={status === selectedRequest.status ? 'primary' : 'secondary'} onClick={() => { updateContactRequest(selectedRequest.id, { status }); setSelectedRequest({ ...selectedRequest, status }); }}>{status}</Button>)}</div>
          <Textarea label="Solution / Reply" value={solution} rows={4} onChange={(event) => setSolution(event.target.value)} /><Button fullWidth onClick={saveSolution}>Save Reply and Resolve</Button>
        </div>}
      </Modal>
      <Modal open={!!selectedReview} onClose={() => setSelectedReview(null)} title="Review">
        {selectedReview && <div className="space-y-4"><p className="text-sm text-soil-900/70">{selectedReview.review}</p><div className="flex gap-2"><Button onClick={() => { updateReview(selectedReview.id, 'Approved'); setSelectedReview(null); }}>Approve</Button><Button variant="danger" onClick={() => { updateReview(selectedReview.id, 'Rejected'); setSelectedReview(null); }}>Remove</Button></div></div>}
      </Modal>
    </div>
  );
}

function UserSection({ users }: { users: ReturnType<typeof useApp>['registeredUsers'] }) {
  return <SectionFrame title="Users"><DataTable headers={['Name', 'Role', 'Contact', 'Status', 'Registration Date']} rows={users.map((user) => [user.name, user.role, user.contact, user.status, new Date(user.registrationDate).toLocaleDateString('en-IN')])} empty="No registered users yet." /></SectionFrame>;
}

function ContactSection({ requests, openRequest }: { requests: ContactRequest[]; openRequest: (request: ContactRequest) => void }) {
  return <SectionFrame title="Contact Requests"><DataTable headers={['Name', 'Contact', 'Subject', 'Date', 'Status', '']} rows={requests.map((request) => [request.name, request.contact, request.subject, new Date(request.date).toLocaleDateString('en-IN'), request.status, <button className="font-medium text-field-700 hover:underline" onClick={() => openRequest(request)}>View</button>])} empty="No contact requests yet." /></SectionFrame>;
}

function ReviewSection({ reviews, onView, onStatus }: { reviews: Review[]; onView: (review: Review) => void; onStatus: (id: string, status: 'Approved' | 'Rejected' | 'Pending') => void }) {
  return <SectionFrame title="Reviews"><DataTable headers={['Name', 'Location', 'Rating', 'Status', '']} rows={reviews.map((review) => [review.name, review.location, `${review.rating} / 5`, <Badge tone={review.status === 'Approved' ? 'green' : review.status === 'Rejected' ? 'red' : 'amber'}>{review.status}</Badge>, <div className="flex gap-2"><button className="font-medium text-field-700" onClick={() => onView(review)}>View</button><button className="font-medium text-clay-500" onClick={() => onStatus(review.id, 'Rejected')}><X size={15} /></button></div>])} empty="No reviews yet." /></SectionFrame>;
}

function ListingSection() {
  return <SectionFrame title="Marketplace Listings"><DataTable headers={['Crop', 'Farmer', 'Location', 'Quantity', 'Price']} rows={productListings.map((listing) => [listing.cropId, listing.farmerName, `${listing.location}, ${listing.district}`, `${listing.quantity} ${listing.quantityUnit}`, `₹${listing.price.toLocaleString('en-IN')}${listing.priceUnit}`])} empty="No marketplace listings yet." /></SectionFrame>;
}

function SectionFrame({ title, children }: { title: string; children: React.ReactNode }) { return <><h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">{title}</h1><div className="mt-6">{children}</div></>; }
function DataTable({ headers, rows, empty }: { headers: string[]; rows: React.ReactNode[][]; empty: string }) {
  if (!rows.length) return <EmptyState title={empty} description="" />;
  return <div className="overflow-hidden rounded-card border border-soil-100 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-soil-50 text-xs uppercase tracking-wide text-soil-900/50"><tr>{headers.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} className="border-t border-soil-100">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3.5">{cell}</td>)}</tr>)}</tbody></table></div></div>;
}