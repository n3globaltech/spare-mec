export function ProductPartNumber({ value, className = '' }) {
    if (!value) return null;

    return (
        <p className={`flex w-fit max-w-full items-center gap-1 rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono leading-snug ring-1 ring-inset ring-neutral-200/70 ${className}`.trim()}>
            <span className="shrink-0 font-extrabold text-neutral-600">Part No:</span>
            <span className="min-w-0 truncate font-extrabold text-neutral-600">{value}</span>
        </p>
    );
}
