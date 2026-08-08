import { useState, useMemo } from "react";
export default function useSortTable(data) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const handleSort = (key) => {
        setSortConfig((current) => {
            if (current.key === key) {
                return {
                    key,
                    direction:
                        current.direction === "asc"
                            ? "desc"
                            : "asc",
                };
            }

            return {
                key,
                direction: "asc",
            };
        });
    };
    const sortedData = useMemo(() => {
        if (!sortConfig.key) {
            return data;
        }

        return [...data].sort((a, b) => {
            const valueA = a[sortConfig.key];
            const valueB = b[sortConfig.key];

            if (typeof valueA === "string") {
                const result = valueA.localeCompare(valueB);

                return sortConfig.direction === "asc"
                    ? result
                    : -result;
            }

            if (valueA < valueB) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }

            if (valueA > valueB) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }

            return 0;
        });
    }, [data, sortConfig]);
    return { sortConfig, handleSort , sortedData};
}