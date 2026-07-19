'use client';

import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import StarRating from './ui/StarRating';
import { submitProductRating } from '@/lib/catalog';

export function ProductRatingPanel({ product }) {
    const [summary, setSummary] = useState({
        rating: product.rating != null ? Number(product.rating) : null,
        reviewCount: Number(product.reviewCount) || 0,
        ratingSource: product.ratingSource || null,
    });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [orderNumber, setOrderNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        if (!selectedRating) {
            setError('Choose a star rating first.');
            return;
        }
        setIsSubmitting(true);
        setError('');
        try {
            const next = await submitProductRating(product.slug, {
                orderNumber: orderNumber.trim(),
                phone: phone.trim(),
                rating: selectedRating,
            });
            setSummary(next);
            setSuccess(true);
            setIsOpen(false);
        } catch (requestError) {
            setError(requestError?.response?.data?.message || 'We could not submit your rating. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50/70 p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                    {summary.rating != null ? (
                        <div className="flex flex-wrap items-center gap-2">
                            <StarRating rating={summary.rating} size={13} starClassName="text-amber-400" />
                            <span className="text-sm font-black text-neutral-900">{Number(summary.rating).toFixed(1)}</span>
                            <span className="text-xs font-medium text-neutral-500">
                                {summary.reviewCount > 0
                                    ? `${summary.reviewCount} verified ${summary.reviewCount === 1 ? 'rating' : 'ratings'}`
                                    : 'Based on offline customer feedback'}
                            </span>
                        </div>
                    ) : (
                        <span className="text-sm font-semibold text-neutral-600">No customer ratings yet</span>
                    )}
                </div>
                {!success && (
                    <button type="button" onClick={() => { setIsOpen((value) => !value); setError(''); }} className="shrink-0 text-xs font-bold text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-950">
                        {isOpen ? 'Cancel' : 'Rate this product'}
                    </button>
                )}
            </div>

            {success && <p role="status" className="mt-2 text-xs font-semibold text-emerald-700">Thank you—your verified rating is now included.</p>}

            {isOpen && (
                <form onSubmit={submit} className="mt-4 border-t border-neutral-200 pt-4">
                    <p className="text-xs font-semibold text-neutral-700">Your rating</p>
                    <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Choose a rating from 1 to 5 stars">
                        {[1, 2, 3, 4, 5].map((value) => {
                            const SelectedIcon = value <= selectedRating ? FaStar : FaRegStar;
                            return (
                                <button key={value} type="button" role="radio" aria-checked={selectedRating === value} aria-label={`${value} star${value === 1 ? '' : 's'}`} onClick={() => setSelectedRating(value)} className="grid h-9 w-9 place-items-center rounded-lg text-amber-400 transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                                    <SelectedIcon size={20} />
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <label className="text-xs font-semibold text-neutral-600">
                            Order ID
                            <input value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} required placeholder="ORD-000001-…" autoCapitalize="characters" className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-base font-medium text-neutral-900 outline-none focus:border-neutral-400 sm:text-sm" />
                        </label>
                        <label className="text-xs font-semibold text-neutral-600">
                            Mobile number used for the order
                            <input value={phone} onChange={(event) => setPhone(event.target.value)} required type="tel" inputMode="tel" autoComplete="tel" placeholder="+971 50 000 0000" className="mt-1.5 h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-base font-medium text-neutral-900 outline-none focus:border-neutral-400 sm:text-sm" />
                        </label>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">Ratings are available after delivery. Your Order ID and mobile number are used only to verify the purchase.</p>
                    {error && <p role="alert" className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
                    <button type="submit" disabled={isSubmitting} className="mt-3 rounded-xl bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50">
                        {isSubmitting ? 'Submitting…' : 'Submit verified rating'}
                    </button>
                </form>
            )}
        </div>
    );
}
