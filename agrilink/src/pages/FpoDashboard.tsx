import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  BarChart3, ClipboardList, IndianRupee, LayoutDashboard, Package, ShoppingCart, Users, Wallet,
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { StatCard } from '../components/StatCard';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/format';

const sections = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Farmers', icon: Users },
  { label: 'Crop Listings', icon: ClipboardList },
  { label: 'Bulk Produce', icon: Package },
  { label: 'Buyer Orders', icon: ShoppingCart },
  { label: 'Transactions', icon: Wallet },
  { label: 'Reports', icon: BarChart3 },
];

const recentOrders = [
  { buyer: 'FreshKart Foods', crop: 'Wheat', quantity: '120 Q', value: 288000, status: 'Processing' },
  { buyer: 'GreenBasket Retail', crop: 'Tomato', quantity: '80 Q', value: 176000, status: 'Confirmed' },
  { buyer: 'Sahyadri Organics', crop: 'Onion', quantity: '65 Q', value: 130000, status: 'Pending' },
];

const farmers = [
  { name: 'Ramesh Patil', village: 'Nandgaon', crops: 'Wheat, Onion', listings: 8, status: 'Active' },
  { name: 'Sunita Shinde', village: 'Khed', crops: 'Tomato, Soybean', listings: 6, status: 'Active' },
  { name: 'Mohan Jadhav', village: 'Baramati', crops: 'Wheat', listings: 4, status: 'Review due' },
  { name: 'Kavita More', village: 'Indapur', crops: 'Onion, Tomato', listings: 7, status: 'Active' },
];

const cropListings = [
  { crop: 'Wheat', farmers: 32, quantity: '214 Q', averagePrice: 2400, status: 'Open' },
  { crop: 'Tomato', farmers: 24, quantity: '168 Q', averagePrice: 2200, status: 'Open' },
  { crop: 'Onion', farmers: 18, quantity: '126 Q', averagePrice: 2000, status: 'Open' },
  { crop: 'Soybean', farmers: 12, quantity: '94 Q', averagePrice: 4600, status: 'Draft' },
];

const bulkProduce = [
  { crop: 'Wheat', grade: 'A', quantity: '120 Q', farmers: 18, destination: 'FreshKart Foods' },
  { crop: 'Tomato', grade: 'A', quantity: '80 Q', farmers: 11, destination: 'GreenBasket Retail' },
  { crop: 'Onion', grade: 'B', quantity: '65 Q', farmers: 9, destination: 'Sahyadri Organics' },
];

const transactions = [
  { date: '08 Sep 2026', reference: 'TXN-1048', party: 'FreshKart Foods', amount: 288000, status: 'Received' },
  { date: '05 Sep 2026', reference: 'TXN-1047', party: 'GreenBasket Retail', amount: 176000, status: 'Received' },
  { date: '02 Sep 2026', reference: 'TXN-1046', party: 'Sahyadri Organics', amount: 130000, status: 'Pending' },
  { date: '29 Aug 2026', reference: 'TXN-1045', party: 'AgriFresh Market', amount: 214000, status: 'Received' },
];

const reportDetails: Record<string, { summary: string; metrics: [string, string][] }> = {
  'Monthly sales summary': {
    summary: 'Sales collected from buyer orders during the current month.',
    metrics: [['Gross sales', formatINR(1248000)], ['Orders completed', '27'], ['Average order value', formatINR(46222)]],
  },
  'Farmer contribution report': {
    summary: 'Farmer participation and listing contribution across the FPO network.',
    metrics: [['Active farmers', '248'], ['Farmers with listings', '86'], ['New farmers this month', '12']],
  },
  'Crop-wise performance': {
    summary: 'Produce volume and average price performance by crop.',
    metrics: [['Top crop by volume', 'Wheat · 214 Q'], ['Highest average price', 'Soybean · ₹4,600/Q'], ['Crops listed', '9']],
  },
  'Buyer order fulfilment': {
    summary: 'Order delivery and fulfilment performance across buyers.',
    metrics: [['Fulfilment rate', '94%'], ['Orders fulfilled', '27'], ['Orders needing attention', '2']],
  },
};

export default function FpoDashboard() {
  const { user, t } = useApp();
  const [activeSection, setActiveSection] = useState('Overview');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  if (user?.role !== 'fpo') return <Navigate to="/login" replace />;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
      <aside className="shrink-0 lg:w-56">
        <div className="rounded-card border border-soil-100 bg-white p-3">
          <div className="border-b border-soil-100 px-3 pb-4">
            <div className="text-xs font-medium uppercase tracking-wide text-soil-900/50">{t('FPO Workspace')}</div>
            <div className="mt-1 font-semibold text-soil-900">{user.name || t('FPO Manager')}</div>
          </div>
          <nav className="mt-3 space-y-1" aria-label="FPO dashboard sections">
            {sections.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setActiveSection(label)}
                className={`flex w-full items-center gap-3 rounded-card px-3 py-2.5 text-left text-sm font-medium transition-colors ${activeSection === label ? 'bg-field-50 text-field-700' : 'text-soil-900/65 hover:bg-soil-50 hover:text-soil-900'}`}
              >
                <Icon size={17} />
                {t(label)}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <section className="min-w-0 flex-1">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-field-700">{t('FPO Dashboard')}</p>
            <h1 className="mt-1 text-2xl font-semibold text-soil-900 sm:text-3xl">{t(activeSection)}</h1>
            <p className="mt-1 text-sm text-soil-900/60">{t('Coordinate your farmer network and produce sales.')}</p>
          </div>
          <Badge tone="green">{t('Operational')}</Badge>
        </div>

        {activeSection === 'Overview' && <OverviewContent setActiveSection={setActiveSection} />}
        {activeSection === 'Farmers' && <FarmersContent />}
        {activeSection === 'Crop Listings' && <CropListingsContent />}
        {activeSection === 'Bulk Produce' && <BulkProduceContent />}
        {activeSection === 'Buyer Orders' && <BuyerOrdersContent />}
        {activeSection === 'Transactions' && <TransactionsContent />}
        {activeSection === 'Reports' && <ReportsContent generatedAt={generatedAt} onGenerate={() => setGeneratedAt(new Date().toLocaleString('en-IN'))} onViewReport={setSelectedReport} />}
      </section>
      {selectedReport && reportDetails[selectedReport] && <ReportDetail reportName={selectedReport} report={reportDetails[selectedReport]} onClose={() => setSelectedReport(null)} />}
    </div>
  );
}

function OverviewContent({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const { t } = useApp();
  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Users} label={t('Registered Farmers')} value="248" sub={t('12 added this month')} />
        <StatCard icon={Package} label={t('Active Crop Listings')} value="86" sub={t('Across 9 crops')} />
        <StatCard icon={ShoppingCart} label={t('Open Buyer Orders')} value="14" sub={t('₹8.4L total value')} />
        <StatCard icon={IndianRupee} label={t("This Month's Sales")} value={formatINR(1248000)} sub={t('18% above last month')} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="rounded-card border border-soil-100 bg-white p-5 xl:col-span-3">
          <div className="flex items-center justify-between"><h2 className="font-semibold text-soil-900">{t('Recent Buyer Orders')}</h2><button className="text-sm font-medium text-field-700 hover:underline" onClick={() => setActiveSection('Buyer Orders')}>{t('View all')}</button></div>
          <div className="mt-4 overflow-x-auto"><OrderTable orders={recentOrders} /></div>
        </div>
        <div className="rounded-card border border-soil-100 bg-white p-5 xl:col-span-2">
          <div className="flex items-center justify-between"><h2 className="font-semibold text-soil-900">{t('Crop Listings')}</h2><button className="text-sm font-medium text-field-700 hover:underline" onClick={() => setActiveSection('Crop Listings')}>{t('Manage')}</button></div>
          <div className="mt-4 space-y-3">{cropListings.map((listing) => <div key={listing.crop} className="flex items-center justify-between rounded-card border border-soil-100 px-4 py-3"><div><div className="font-medium text-soil-900">{t(listing.crop)}</div><div className="text-xs text-soil-900/50">{listing.farmers} {t('Listings').toLowerCase()}</div></div><div className="text-sm text-soil-900/65">{listing.quantity}</div></div>)}</div>
        </div>
      </div>
      <ActivityContent />
    </>
  );
}

function ActivityContent() {
  const { t } = useApp();
  return <div className="mt-6 rounded-card border border-soil-100 bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-semibold text-soil-900">{t('Network Activity')}</h2><span className="text-xs text-soil-900/50">{t('Last 30 days')}</span></div><div className="mt-5 grid grid-cols-3 gap-4 text-center sm:grid-cols-6">{[['Farmers onboarded', '12'], ['Listings added', '34'], ['Orders fulfilled', '27'], ['Payments received', '₹6.8L'], ['Pending reviews', '8'], ['Reports ready', '4']].map(([label, value]) => <div key={label} className="rounded-card bg-soil-50 px-2 py-3"><div className="text-lg font-semibold text-soil-900">{value}</div><div className="mt-1 text-xs text-soil-900/55">{t(label)}</div></div>)}</div></div>;
}

function FarmersContent() {
  const { t } = useApp();
  return <ContentTable title={t('Farmer Network')} action={t('Add farmer')} headers={[t('Farmer'), t('Village'), t('Primary Crops'), t('Listings'), t('Status')]} rows={farmers.map((farmer) => [<span className="font-medium text-soil-900">{farmer.name}</span>, farmer.village, farmer.crops.split(', ').map((crop) => t(crop)).join(', '), farmer.listings, <Badge tone={farmer.status === 'Active' ? 'green' : 'amber'}>{t(farmer.status)}</Badge>])} />;
}

function CropListingsContent() {
  const { t } = useApp();
  return <ContentTable title={t('Crop Listing Management')} action={t('Add listing')} headers={[t('Crop'), t('Farmers'), t('Quantity'), t('Average Price'), t('Status')]} rows={cropListings.map((listing) => [<span className="font-medium text-soil-900">{t(listing.crop)}</span>, listing.farmers, listing.quantity, `${formatINR(listing.averagePrice)}/Q`, <Badge tone={listing.status === 'Open' ? 'green' : 'neutral'}>{t(listing.status)}</Badge>])} />;
}

function BulkProduceContent() {
  const { t } = useApp();
  return <ContentTable title={t('Aggregated Bulk Produce')} action={t('Create batch')} headers={[t('Produce'), t('Grade'), t('Total Quantity'), t('Farmers'), t('Buyer / Destination')]} rows={bulkProduce.map((batch) => [<span className="font-medium text-soil-900">{t(batch.crop)}</span>, <Badge tone={batch.grade === 'A' ? 'green' : 'amber'}>{t('Grade')} {batch.grade}</Badge>, batch.quantity, batch.farmers, batch.destination])} />;
}

function BuyerOrdersContent() {
  const { t } = useApp();
  return <div className="mt-6 rounded-card border border-soil-100 bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-semibold text-soil-900">{t('Buyer Orders')}</h2><button className="text-sm font-medium text-field-700 hover:underline">{t('Export orders')}</button></div><div className="mt-4 overflow-x-auto"><OrderTable orders={recentOrders} detailed /></div></div>;
}

function TransactionsContent() {
  const { t } = useApp();
  return <ContentTable title={t('Transaction History')} action={t('Export history')} headers={[t('Date'), t('Reference'), t('Buyer'), t('Amount'), t('Status')]} rows={transactions.map((transaction) => [transaction.date, transaction.reference, transaction.party, formatINR(transaction.amount), <Badge tone={transaction.status === 'Received' ? 'green' : 'amber'}>{t(transaction.status)}</Badge>])} />;
}

function ReportsContent({ generatedAt, onGenerate, onViewReport }: { generatedAt: string | null; onGenerate: () => void; onViewReport: (reportName: string) => void }) {
  const { t } = useApp();
  return <>
    <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4"><StatCard icon={IndianRupee} label={t('Total Sales')} value={formatINR(6840000)} sub={t('This financial year')} /><StatCard icon={Users} label={t('Farmer Growth')} value="18%" sub={t('Compared with last year')} /><StatCard icon={Package} label={t('Produce Sold')} value="1,248 Q" sub={t('Across 9 crops')} /><StatCard icon={BarChart3} label={t('Order Fulfilment')} value="94%" sub={t('On-time delivery rate')} /></div>
    <div className="mt-6 rounded-card border border-soil-100 bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-semibold text-soil-900">{t('Available Reports')}</h2><button className="text-sm font-medium text-field-700 hover:underline" onClick={onGenerate}>{t('Generate report')}</button></div>{generatedAt && <div className="mt-3 text-xs text-soil-900/50">{t('Reports generated on')} {generatedAt}</div>}<div className="mt-4 space-y-3">{Object.keys(reportDetails).map((report, index) => <div key={report} className="flex items-center justify-between rounded-card border border-soil-100 px-4 py-3"><div><div className="font-medium text-soil-900">{t(report)}</div><div className="text-xs text-soil-900/50">{t('Updated')} {index + 1} {t(index === 0 ? 'day' : 'days')} {t('ago')}</div></div><button className="text-sm font-medium text-field-700 hover:underline" onClick={() => onViewReport(report)}>{t('View report')}</button></div>)}</div></div>
  </>;
}

function ReportDetail({ reportName, report, onClose }: { reportName: string; report: { summary: string; metrics: [string, string][] }; onClose: () => void }) {
  const { t } = useApp();
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-soil-900/30 px-4" role="dialog" aria-modal="true" aria-labelledby="report-detail-title"><div className="w-full max-w-lg rounded-card border border-soil-100 bg-white p-5 shadow-card"><div className="flex items-start justify-between gap-4"><div><div className="text-xs font-medium uppercase tracking-wide text-field-700">{t('FPO Report')}</div><h2 id="report-detail-title" className="mt-1 text-xl font-semibold text-soil-900">{t(reportName)}</h2></div><button className="text-sm font-medium text-soil-900/60 hover:text-soil-900" onClick={onClose}>{t('Close')}</button></div><p className="mt-4 text-sm text-soil-900/60">{t(report.summary)}</p><div className="mt-5 space-y-3">{report.metrics.map(([label, value]) => <div key={label} className="flex items-center justify-between rounded-card bg-soil-50 px-4 py-3"><span className="text-sm text-soil-900/60">{t(label)}</span><span className="font-semibold text-soil-900">{translateReportValue(t, value)}</span></div>)}</div><div className="mt-5 flex justify-end"><button className="text-sm font-medium text-field-700 hover:underline" onClick={onClose}>{t('Close report')}</button></div></div></div>;
}

function translateReportValue(t: (key: string) => string, value: string) {
  return value.split(' · ').map((part) => t(part)).join(' · ');
}

function OrderTable({ orders, detailed = false }: { orders: typeof recentOrders; detailed?: boolean }) {
  const { t } = useApp();
  return <table className="w-full min-w-[560px] text-left text-sm"><thead className="text-xs uppercase tracking-wide text-soil-900/50"><tr><th className="py-2 pr-4">{t('Buyer')}</th><th className="py-2 pr-4">{t('Produce')}</th>{detailed && <th className="py-2 pr-4">{t('Order details')}</th>}<th className="py-2 pr-4">{t('Amount')}</th><th className="py-2">{t('Status')}</th></tr></thead><tbody>{orders.map((order) => <tr key={order.buyer} className="border-t border-soil-100"><td className="py-3 pr-4 font-medium text-soil-900">{order.buyer}</td><td className="py-3 pr-4 text-soil-900/70">{t(order.crop)}</td>{detailed && <td className="py-3 pr-4 text-soil-900/70">{order.quantity} · {t('Delivery scheduled')}</td>}<td className="py-3 pr-4 text-soil-900/70">{formatINR(order.value)}</td><td className="py-3"><Badge tone={order.status === 'Confirmed' ? 'green' : order.status === 'Pending' ? 'amber' : 'neutral'}>{t(order.status)}</Badge></td></tr>)}</tbody></table>;
}

function ContentTable({ title, action, headers, rows }: { title: string; action: string; headers: string[]; rows: React.ReactNode[][] }) {
  return <div className="mt-6 rounded-card border border-soil-100 bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-semibold text-soil-900">{title}</h2><button className="text-sm font-medium text-field-700 hover:underline">{action}</button></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="text-xs uppercase tracking-wide text-soil-900/50"><tr>{headers.map((header) => <th key={header} className="py-2 pr-4">{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className="border-t border-soil-100">{row.map((cell, cellIndex) => <td key={cellIndex} className="py-3 pr-4 text-soil-900/70">{cell}</td>)}</tr>)}</tbody></table></div></div>;
}