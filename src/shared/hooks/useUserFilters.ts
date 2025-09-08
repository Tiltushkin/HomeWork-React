import { useMemo, useState } from 'react';
import type { FullUser } from '../types';

export function useUserFilters(users: FullUser[]) {
    const [query, setQuery] = useState('');
    const [city, setCity] = useState<string>('all');
    const [company, setCompany] = useState<string>('all');

    const cities = useMemo(
        () => Array.from(new Set(users.map((u) => u.address?.city).filter(Boolean))).sort(),
        [users]
    );

    const companies = useMemo(
        () => Array.from(new Set(users.map((u) => u.company?.name).filter(Boolean))).sort(),
        [users]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return users.filter((u) => {
            const cityOk = city === 'all' || u.address?.city === city;
            const companyOk = company === 'all' || u.company?.name === company;
            if (!q) return cityOk && companyOk;
            const haystack = [
            u.name,
            u.username,
            u.email,
            u.phone,
            u.website,
            u.address?.street,
            u.address?.suite,
            u.address?.city,
            u.address?.zipcode,
            u.company?.name,
            u.company?.catchPhrase,
            u.company?.bs,
            ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
            return haystack.includes(q) && cityOk && companyOk;
        });
    }, [users, query, city, company]);

    const clearFilters = () => {
        setQuery('');
        setCity('all');
        setCompany('all');
    };

    return {
        query, setQuery,
        city, setCity,
        company, setCompany,
        cities, companies,
        filtered,
        clearFilters,
    };
}

export default useUserFilters;