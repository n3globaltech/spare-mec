'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { CategoryTiles } from './CategoryTiles';

/**
 * Desktop "Categories" mega-menu: a full-width hover panel with a "Shop by Category" tile grid of the
 * main categories. Clicking a tile opens its category page (/category/[slug]); the tile for the
 * category you're currently viewing stays highlighted. Falls back to a plain /categories link when
 * there are no categories yet, so the nav item never dead-ends.
 */
export function CategoryMegaMenu({ active, tree = [] }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const closeTimer = useRef(null);
    const rootRef = useRef(null);

    const openNow = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
    };

    const closeSoon = () => {
        if (isLocked) return;
        closeTimer.current = setTimeout(() => {
            setOpen(false);
        }, 120);
    };

    const closeAll = () => {
        setOpen(false);
        setIsLocked(false);
    };

    const handleClick = () => {
        if (isLocked) {
            setOpen(false);
            setIsLocked(false);
        } else {
            setOpen(true);
            setIsLocked(true);
        }
    };

    // Close the dropdown on navigation and on any outside click (needed because it's click-toggleable,
    // not just hover — a click-open shouldn't stay stuck when the user clicks elsewhere).
    useEffect(() => {
        closeAll();
    }, [pathname]);

    useEffect(() => {
        if (!open) return;
        const onDown = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                closeAll();
            }
        };
        document.addEventListener('mousedown', onDown);
        return () => document.removeEventListener('mousedown', onDown);
    }, [open]);

    const activeSlug = pathname?.startsWith('/category/') ? decodeURIComponent(pathname.slice('/category/'.length)) : null;
    const hasTree = tree.length > 0;
    const linkCls = `relative flex items-center gap-1 text-[12px] font-extrabold uppercase tracking-widest transition-all duration-300 py-6 ${
        active ? 'text-[#EF4444]' : 'text-neutral-500 hover:text-[#EF4444]'
    }`;

    return (
        <div ref={rootRef} className="h-[72px] flex items-center" onMouseEnter={hasTree ? openNow : undefined} onMouseLeave={hasTree ? closeSoon : undefined}>
            {hasTree ? (
                <button type="button" onClick={handleClick} className={linkCls} aria-haspopup="true" aria-expanded={open}>
                    <span>Categories</span>
                    <FiChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </button>
            ) : (
                <Link href="/categories" className={linkCls}>
                    <span>Categories</span>
                </Link>
            )}

            <AnimatePresence>
                {open && hasTree && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16 }}
                        className="fixed left-0 right-0 top-[72px] z-[105] border-t border-neutral-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                        onMouseEnter={openNow} onMouseLeave={closeSoon}
                    >
                        <div className="container-x lg:max-w-[96rem] py-7">
                            <div className="mb-5 flex items-center justify-between">
                                <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-neutral-400">Shop by Category</span>
                                <Link href="/categories" onClick={closeAll} className="text-[12px] font-extrabold uppercase tracking-widest text-[#EF4444] hover:underline">View All</Link>
                            </div>
                            <CategoryTiles categories={tree} activeSlug={activeSlug} size="sm" onNavigate={closeAll} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
