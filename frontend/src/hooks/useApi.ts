import { useMemo, useState } from 'react';
import { clientFactory } from '../api/clientFactory';
import { RequestStatus } from '../api/RequestStatus';
import { Client } from '../api/client';

export const useApi = (): RequestStatus & { client: Client } => {
    const baseUrl = 'http://localhost:3000';
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
