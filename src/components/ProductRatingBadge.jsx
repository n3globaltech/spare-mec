'use client';

import { useId, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export function ProductRatingBadge({ rating, reviewCount = 0, ratingSource, compact = false, className = '' }) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const tooltipId = useId();
    if (rating == null || Number.isNaN(Number(rating))) return null;

    const numericRating = Math.min(5, Math.max(0, Number(rating)));
    const score = numericRating.toFixed(1);
    const starSize = compact ? 10 : 12;
    const count = Math.max(0, Number(reviewCount) || 0);
    const hasCustomerRatings = count > 0 || ratingSource === 'customers';
    const tooltip = hasCustomerRatings
        ? 'Based on customer ratings.'
        : 'Based on offline customer feedback.';

    return (
        <button
            type="button"
            className={`relative z-20 inline-flex w-fit items-center rounded-md text-neutral-900 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${compact ? 'gap-1 py-0.5' : 'gap-1.5 py-1'} ${className}`.trim()}
            aria-label={`${score} out of 5 stars. ${tooltip}`}
            aria-describedby={tooltipId}
            aria-expanded={tooltipOpen}
            onPointerEnter={(event) => { if (event.pointerType === 'mouse') setTooltipOpen(true); }}
            onPointerLeave={(event) => { if (event.pointerType === 'mouse') setTooltipOpen(false); }}
            onPointerDown={(event) => {
                if (event.pointerType === 'touch' || event.pointerType === 'pen') {
                    event.preventDefault();
                    event.stopPropagation();
                    setTooltipOpen((open) => !open);
                }
            }}
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (event.detail === 0) setTooltipOpen((open) => !open);
            }}
            onFocus={() => setTooltipOpen(true)}
            onBlur={() => setTooltipOpen(false)}
        >
            <span className="flex shrink-0 items-center gap-px" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((index) => {
                    const fill = Math.min(100, Math.max(0, (numericRating - index) * 100));
                    return (
                        <span key={index} className="relative block shrink-0" style={{ width: starSize, height: starSize }}>
                            <FaStar size={starSize} className="absolute inset-0 text-neutral-300" />
                            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill}%` }}>
                                <FaStar size={starSize} className="max-w-none text-amber-400 drop-shadow-[0_1px_1px_rgba(245,158,11,0.2)]" />
                            </span>
                        </span>
                    );
                })}
            </span>
            <span className={`${compact ? 'text-[11px]' : 'text-xs'} font-black leading-none`}>{score}</span>
            <span
                id={tooltipId}
                role="tooltip"
                className={`absolute left-0 top-full z-50 mt-1.5 w-[125px] rounded-lg bg-neutral-950 px-2.5 py-1.5 text-left text-[9px] font-semibold leading-snug text-white shadow-lg transition duration-150 sm:w-[150px] sm:text-[10px] md:w-max md:max-w-[210px] ${tooltipOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
            >
                {tooltip}
            </span>
        </button>
    );
}
