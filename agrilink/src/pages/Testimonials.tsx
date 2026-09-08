import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Testimonials() {
  const { reviews, t } = useApp();
  const approvedReviews = reviews.filter((review) => review.status === 'Approved');

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-soil-900 sm:text-3xl">{t('Farmer Reviews')}</h1>
        <p className="mt-1.5 text-soil-900/60">{t('Real experiences from farmers using AgriLink to make better market decisions.')}</p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {approvedReviews.map((testimonial) => (
          <article key={testimonial.name} className="rounded-card border border-soil-100 bg-white p-5">
            <div className="flex items-center gap-3">
              <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <h2 className="font-semibold text-soil-900">{testimonial.name}</h2>
                <div className="mt-1 flex items-center gap-1 text-xs text-soil-900/50"><MapPin size={12} /> {testimonial.location}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1" aria-label={`${t('Rating')}: ${testimonial.rating} / 5`}>
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} className={index < testimonial.rating ? 'fill-wheat-500 text-wheat-500' : 'text-soil-100'} />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-soil-900/70">“{testimonial.review}”</p>
          </article>
        ))}
      </div>
    </div>
  );
}