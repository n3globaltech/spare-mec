'use client';

import { useEffect, useState } from 'react';
import { fetchCategories, buildCategoryTree } from './catalog';

/**
 * Category loader for client components (navbar mega-menu / mobile tree).
 * Prefers `initial` (categories fetched server-side in the layout) so the dropdown has data on first
 * paint with no client request. Falls back to a module-cached client fetch when no initial data is
 * passed. Returns the flat list plus the built parent→children tree.
 */
let _cache = null;      // resolved flat array
let _promise = null;    // in-flight fetch (dedupe concurrent mounts)

export function useCategories(initial) {
    const hasInitial = Array.isArray(initial) && initial.length > 0;
    const [categories, setCategories] = useState(hasInitial ? initial : (_cache || []));
    const [loading, setLoading] = useState(!hasInitial && !_cache);

    useEffect(() => {
        if (hasInitial) { _cache = initial; return; } // seed cache from SSR data; no fetch needed
        let alive = true;
        if (_cache) { setCategories(_cache); setLoading(false); return; }
        if (!_promise) {
            _promise = fetchCategories()
                .then((list) => { _cache = Array.isArray(list) ? list : []; return _cache; })
                .catch(() => { _promise = null; return []; });
        }
        _promise.then((list) => { if (alive) { setCategories(list); setLoading(false); } });
        return () => { alive = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { categories, tree: buildCategoryTree(categories), loading };
}
