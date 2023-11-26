import { Show } from './Show';
import { GetScheduleResponse } from './responses/ScheduleListResponse';
import { SearchResponse } from './responses/SearchResponse';

export const client = () => {
    const baseUrl = 'http://api.tvmaze.com';

    const get = async <T>(url: string): Promise<T> => {
        const response = await fetch(baseUrl + url);
        return response.json();
    };

    const getSchedule = async (
        date: string,
        country: string
    ): Promise<GetScheduleResponse> => {
        return get(`/schedule?country=${country}&date=${date}`);
    };

    const search = async (query: string): Promise<SearchResponse> => {
        return get(`/search/shows?q=${query}`);
    };

    const getShow = async (id: number): Promise<Show> => {
        return get(`/shows/${id}`);
    };

    return {
        getSchedule,
        search,
        getShow,
    };
};
