import { GetScheduleResponse } from './responses/ScheduleListResponse';

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

    return {
        getSchedule,
    };
};
