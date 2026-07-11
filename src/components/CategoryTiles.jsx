import Link from 'next/link';
import { FiGrid } from 'react-icons/fi';
import { getCategoryArt } from '@/config/categoryArt';

/**
 * Reusable "Shop by Category" tile grid — a thumbnail + name card per main category, linking to its
 * category page. Shared by the navbar mega-menu and the category page so both stay identical.
 * The active category (activeSlug) is highlighted in brand red. `size='sm'` for the dropdown.
 */
export function CategoryTiles({ categories = [], activeSlug, size = 'md', onNavigate }) {
    const sm = size === 'sm';
    return (
        <div className={`grid gap-2.5 sm:gap-3 ${sm ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
            {categories.map((c) => {
                const art = getCategoryArt(c.slug);
                const active = c.slug === activeSlug;
                return (
                    <Link
                        key={c.id}
                        href={`/category/${c.slug}`}
                        onClick={onNavigate}
                        className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${active
                            ? 'border-[#EF4444] bg-[#FEF2F2]'
                            : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'}`}
                    >
                        <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border ${active ? 'border-[#FBD5D5] bg-white' : 'border-neutral-100 bg-neutral-50'} ${sm ? 'h-9 w-9' : 'h-11 w-11'}`}>
                            {art.image
                                // eslint-disable-next-line @next/next/no-img-element
                                ? <img src={art.image} alt="" className={`object-contain ${sm ? 'h-7 w-7' : 'h-9 w-9'} transition-transform duration-300 group-hover:scale-105`} />
                                : <FiGrid className={active ? 'text-[#EF4444]' : 'text-neutral-400'} size={sm ? 15 : 18} />}
                        </span>
                        <span className={`min-w-0 truncate font-bold ${sm ? 'text-[13px]' : 'text-sm'} ${active ? 'text-[#EF4444]' : 'text-neutral-800 group-hover:text-neutral-950'}`}>
                            {c.name}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
