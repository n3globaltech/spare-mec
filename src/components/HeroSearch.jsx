import { AutocompleteSearch } from './AutocompleteSearch';

// Prominent catalogue search (in the showroom hero). Submits to /catalogue?q=…
export function HeroSearch({ initial = '' }) {
    return (
        <AutocompleteSearch
            initialValue={initial}
            placeholder="Search part name or number (e.g. LR011593)"
            formClassName="mt-6 w-full md:mt-8"
            inputClassName="relative z-10 w-full rounded-full border border-neutral-100 bg-white py-3.5 pl-12 pr-12 text-base text-neutral-850 placeholder:text-neutral-400 outline-none shadow-sm transition-shadow focus:shadow-md md:py-4 md:text-sm"
            iconClassName="left-5"
        />
    );
}
