import { ShowResponse } from './responses/ShowResponse';
import { GetScheduleResponse } from './responses/ScheduleListResponse';
import { SearchResponse } from './responses/SearchResponse';

const defaultExecutor = async <T>(url: string): Promise<T> => {
    const response = await fetch('http://localhost:3000' + url);
    return response.json();
};

export const clientFactory = (
    requestExecutor: <T>(url: string) => Promise<T> = defaultExecutor
) => {
    const getSchedule = async (
        date: string,
        country: string
    ): Promise<GetScheduleResponse> => {
        return requestExecutor(`/schedule?country=${country}&date=${date}`);
    };

    const search = async (query: string): Promise<SearchResponse> => {
        return requestExecutor(`/search/shows?q=${query}`);
    };

    const getShow = async (id: number): Promise<ShowResponse> => {
        return requestExecutor(`/shows/${id}`);
    };

    return {
        getSchedule,
        search,
        getShow,
    };
};
