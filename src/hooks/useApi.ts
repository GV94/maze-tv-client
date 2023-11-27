import { useMemo, useState } from 'react';
import { clientFactory } from '../api/clientFactory';

export const useApi = () => {
    const baseUrl = 'http://api.tvmaze.com';
    const [isLoading, setIsLoading] = useState(false);
    const [isDelayed, setIsDelayed] = useState(false);
    const [error, setError] = useState<Error>();

    const client = useMemo(
        () =>
            clientFactory(async (url: string) => {
                setIsLoading(true);
                setIsDelayed(false);
                setError(undefined);
                const timeoutId = setTimeout(() => setIsDelayed(true), 1500);

                try {
                    const response = await fetch(baseUrl + url);
                    clearTimeout(timeoutId);
                    return response.json();
                } catch (err) {
                    setError(err as Error);
                    throw err;
                } finally {
                    setIsLoading(false);
                    clearTimeout(timeoutId);
                }
            }),
        []
    );

    return {
        isLoading,
        isDelayed,
        error,
        client,
    };
};
