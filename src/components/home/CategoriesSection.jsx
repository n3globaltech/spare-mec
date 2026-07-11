import CategoryCard from '../ui/CategoryCard';

// High-fidelity 3D spare-parts renders (served from /public/assets/sections/category).
const homeCategories = [
    { slug: 'engine', name: 'Engine & Powertrain', tagline: 'Peak engine power', image: '/assets/sections/category/engine.png', type: 'tall-white' },
    { slug: 'brakes-suspension', name: 'Brake Systems', tagline: 'Superior stopping force', image: '/assets/sections/category/brakes.png', type: 'tall-black' },
    { slug: 'steering', name: 'Suspension & Steering', tagline: 'Smooth road control', image: '/assets/sections/category/suspension.png', type: 'small-white', imageClass: 'absolute right-[-6%] bottom-[-8%] md:bottom-[-2%] w-[96%] sm:w-[88%] md:w-[56%] lg:w-[82%] lg:bottom-[1%] lg:right-[-4%] object-contain z-10 transition-all duration-700 ease-out group-hover:scale-105 group-hover:translate-x-1' },
    { slug: 'fuel-air', name: 'Filtration', tagline: 'Clean engine flow', image: '/assets/sections/category/filtration.png', type: 'small-white', imageClass: 'absolute right-[-4%] bottom-[-8%] md:bottom-[-2%] w-[94%] sm:w-[86%] md:w-[54%] lg:w-[80%] lg:bottom-[1%] lg:right-[-2%] object-contain z-10 transition-all duration-700 ease-out group-hover:scale-105 group-hover:translate-x-1' },
    { slug: 'electrical-lighting', name: 'Electrical', tagline: 'Reliable power systems', image: '/assets/sections/category/electrical.png', type: 'small-white', imageClass: 'absolute right-[-4%] bottom-[-6%] md:bottom-[-2%] w-[100%] sm:w-[92%] md:w-[56%] lg:w-[86%] lg:bottom-[10%] lg:right-[-2%] object-contain z-10 transition-all duration-700 ease-out group-hover:scale-105 group-hover:translate-x-1' },
    { slug: 'electrical-lighting', name: 'Lighting', tagline: 'Maximum road visibility', image: '/assets/sections/category/lighting.png', type: 'small-white', imageClass: 'absolute right-[-4%] bottom-[-6%] md:bottom-[-2%] w-[100%] sm:w-[92%] md:w-[56%] lg:w-[86%] lg:bottom-[10%] lg:right-[-2%] object-contain z-10 transition-all duration-700 ease-out group-hover:scale-105 group-hover:translate-x-1' },
    { slug: 'all', name: 'View All', type: 'yellow-cta' },
];

export default function CategoriesSection() {
    return (
        <section id="categories" className="bg-[#FAF9F6]/55 pt-10 pb-6 md:pt-16 md:pb-28 border-t border-neutral-200/30">
            <div className="container-x lg:max-w-[96rem]">
                <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-4xl md:text-5xl font-display font-light text-neutral-500 tracking-tight">
                        Shop by <span className="font-extrabold text-neutral-950">Category</span>
                    </h2>
                    <p className="text-neutral-500 text-sm md:text-base font-medium mt-4 max-w-xl mx-auto leading-relaxed">
                        Find the right spare parts faster through organized categories designed for easy browsing
                    </p>
                </div>

                {/* Desktop Custom Nested Grid Layout */}
                <div className="hidden lg:grid grid-cols-12 gap-6 h-[560px]">
                    <div className="col-span-4 h-full">
                        <CategoryCard category={homeCategories[0]} index={0} />
                    </div>
                    <div className="col-span-3 h-full">
                        <CategoryCard category={homeCategories[1]} index={1} />
                    </div>
                    <div className="col-span-5 h-full flex flex-col justify-between gap-6">
                        <div className="grid grid-cols-2 gap-6 h-[268px]">
                            <CategoryCard category={homeCategories[2]} index={2} />
                            <CategoryCard category={homeCategories[3]} index={3} />
                        </div>
                        <div className="grid grid-cols-3 gap-6 h-[268px]">
                            <CategoryCard category={homeCategories[4]} index={4} />
                            <CategoryCard category={homeCategories[5]} index={5} />
                            <CategoryCard category={homeCategories[6]} index={6} />
                        </div>
                    </div>
                </div>

                {/* Mobile Responsive Grid Layout */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 lg:hidden">
                    <div className="col-span-1 h-[280px] sm:h-[320px]"><CategoryCard category={homeCategories[0]} index={0} /></div>
                    <div className="col-span-1 h-[280px] sm:h-[320px]"><CategoryCard category={homeCategories[1]} index={1} /></div>
                    <div className="col-span-1 h-[180px] sm:h-[200px]"><CategoryCard category={homeCategories[2]} index={2} /></div>
                    <div className="col-span-1 h-[180px] sm:h-[200px]"><CategoryCard category={homeCategories[3]} index={3} /></div>
                    <div className="col-span-1 h-[180px] sm:h-[200px]"><CategoryCard category={homeCategories[4]} index={4} /></div>
                    <div className="col-span-1 h-[180px] sm:h-[200px]"><CategoryCard category={homeCategories[5]} index={5} /></div>
                    <div className="col-span-2 h-[76px] sm:h-[84px]"><CategoryCard category={homeCategories[6]} index={6} /></div>
                </div>
            </div>
        </section>
    );
}
