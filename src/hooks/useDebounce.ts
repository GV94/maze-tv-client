import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export const useDebounce = <T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    const latestCallback = useRef<T>();
    const debounceTimer = useRef<number | null>(null);

    useEffect(() => {
        latestCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);

    const debouncedFunction = (...args: Parameters<T>) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            latestCallback.current?.(...args);
        }, delay);
    };

    return debouncedFunction;
};
