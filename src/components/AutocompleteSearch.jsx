'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiX } from 'react-icons/fi';
import { searchProducts } from '@/lib/catalog';

const MIN_QUERY_LENGTH = 2;
const MAX_SUGGESTIONS = 6;

export function AutocompleteSearch({
    initialValue = '',
    placeholder = 'Search by part number, name, or brand…',
    autoFocus = false,
    formClassName = '',
    inputClassName = '',
    iconClassName = 'left-3.5',
    onNavigate,
}) {
    const router = useRouter();
    const listboxId = useId();
    const rootRef = useRef(null);
    const requestIdRef = useRef(0);
    const [query, setQuery] = useState(initialValue);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => { setQuery(initialValue); }, [initialValue]);

    useEffect(() => {
        const term = query.trim();
        const requestId = ++requestIdRef.current;
        setActiveIndex(-1);

        if (term.length < MIN_QUERY_LENGTH) {
            setSuggestions([]);
            setIsLoading(false);
            setIsOpen(false);
            return undefined;
        }

        setIsLoading(true);
        setIsOpen(true);
        const timer = setTimeout(async () => {
            try {
                const products = await searchProducts(term, { limit: MAX_SUGGESTIONS });
                if (requestId !== requestIdRef.current) return;
                setSuggestions(products.slice(0, MAX_SUGGESTIONS));
                setIsOpen(true);
            } catch {
                if (requestId !== requestIdRef.current) return;
                setSuggestions([]);
                setIsOpen(true);
            } finally {
                if (requestId === requestIdRef.current) setIsLoading(false);
            }
        }, 250);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const closeOnOutsidePress = (event) => {
            if (!rootRef.current?.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('pointerdown', closeOnOutsidePress);
        return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
    }, []);

    const navigate = (href) => {
        setIsOpen(false);
        onNavigate?.();
        router.push(href);
    };

    const submit = (event) => {
        event.preventDefault();
        if (activeIndex >= 0 && suggestions[activeIndex]) {
            navigate(`/product/${suggestions[activeIndex].slug}`);
            return;
        }
        const term = query.trim();
        navigate(term ? `/catalogue?q=${encodeURIComponent(term)}` : '/catalogue');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown' && suggestions.length) {
            event.preventDefault();
            setIsOpen(true);
            setActiveIndex((current) => (current + 1) % suggestions.length);
        } else if (event.key === 'ArrowUp' && suggestions.length) {
            event.preventDefault();
            setIsOpen(true);
            setActiveIndex((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
        } else if (event.key === 'Escape') {
            setIsOpen(false);
            setActiveIndex(-1);
        }
    };

    const clear = () => {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
        setActiveIndex(-1);
    };

    const showPanel = isOpen && query.trim().length >= MIN_QUERY_LENGTH;

    return (
        <form ref={rootRef} onSubmit={submit} className={`relative ${formClassName}`.trim()} role="search">
            <FiSearch className={`pointer-events-none absolute ${iconClassName} top-1/2 z-30 -translate-y-1/2 text-neutral-400`} size={16} />
            <input
                type="text"
                inputMode="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => { if (query.trim().length >= MIN_QUERY_LENGTH) setIsOpen(true); }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                autoFocus={autoFocus}
                autoComplete="off"
                enterKeyHint="search"
                aria-label="Search products"
                aria-autocomplete="list"
                aria-controls={showPanel ? listboxId : undefined}
                aria-expanded={showPanel}
                aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
                className={inputClassName}
            />
            {query && (
                <button type="button" onClick={clear} aria-label="Clear search" className="absolute right-3 top-1/2 z-30 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700">
                    <FiX size={15} />
                </button>
            )}

            {showPanel && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[130] overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left text-neutral-900 shadow-[0_18px_50px_-16px_rgba(0,0,0,0.28)]">
                    <div id={listboxId} role="listbox" aria-label="Product suggestions" className="max-h-[min(360px,55vh)] overflow-y-auto p-1.5">
                        {isLoading ? (
                            <div className="px-4 py-5 text-center text-sm text-neutral-500">Searching products…</div>
                        ) : suggestions.length ? (
                            suggestions.map((product, index) => (
                                <button
                                    key={product.id || product.slug}
                                    id={`${listboxId}-${index}`}
                                    type="button"
                                    role="option"
                                    aria-selected={activeIndex === index}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => navigate(`/product/${product.slug}`)}
                                    className={`flex w-full min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${activeIndex === index ? 'bg-neutral-100' : 'hover:bg-neutral-50'}`}
                                >
                                    <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50">
                                        {product.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={product.image} alt="" className="h-full w-full object-contain p-1" />
                                        ) : (
                                            <FiSearch size={15} className="text-neutral-300" />
                                        )}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-sm font-bold text-neutral-900">{product.name}</span>
                                        <span className="mt-0.5 block truncate text-[11px] text-neutral-500">
                                            {[product.brand, product.partNumber && `Part: ${product.partNumber}`].filter(Boolean).join(' · ') || product.categoryName}
                                        </span>
                                    </span>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-5 text-center text-sm text-neutral-500">No matching products found</div>
                        )}
                    </div>
                    <button type="submit" className="flex w-full items-center justify-between border-t border-neutral-100 bg-neutral-50 px-4 py-3 text-xs font-bold text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950">
                        <span className="truncate">View all results for “{query.trim()}”</span>
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            )}
        </form>
    );
}
