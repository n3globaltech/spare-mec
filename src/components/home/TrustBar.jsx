import { FiMessageSquare, FiZap, FiClock, FiTruck } from 'react-icons/fi';
import Reveal from '../ui/Reveal';

const items = [
    { icon: FiMessageSquare, title: 'ORDER ON WHATSAPP', desc: 'Fast and convenient ordering' },
    { icon: FiZap, title: 'QUICK RESPONSE', desc: 'Fast replies from our team' },
    { icon: FiClock, title: '24/7 SUPPORT', desc: 'Support whenever you need it' },
    { icon: FiTruck, title: 'FREE SHIPPING', desc: 'Available on eligible orders' },
];

export default function TrustBar() {
    const doubledItems = [...items, ...items];

    return (
        <section className="border-y border-neutral-200/60 bg-white pt-1 pb-4 overflow-hidden">
            {/* Mobile Continuous Scrolling Loop */}
            <div className="flex sm:hidden overflow-hidden w-full select-none py-1.5">
                <div className="flex animate-marquee gap-10 pr-10">
                    {doubledItems.map((it, i) => (
                        <div key={`${it.title}-${i}`} className="flex items-start gap-4 shrink-0 min-w-[250px]">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 text-neutral-600">
                                <it.icon size={17} />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-ink tracking-tight">{it.title}</h3>
                                <p className="mt-0.5 text-[10px] leading-relaxed text-neutral-500 font-medium">{it.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop & Tablet Grid View */}
            <div className="container-x hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-neutral-200/50 py-1">
                {items.map((it, i) => (
                    <Reveal key={it.title} delay={i * 0.06} className="flex items-center gap-4.5 px-4 py-3 lg:px-8">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-100 text-neutral-600">
                            <it.icon size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-ink tracking-tight">{it.title}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-neutral-500 font-medium">{it.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
