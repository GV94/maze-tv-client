export type ShowResponse = {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number | null;
    averageRuntime: number;
    premiered: string;
    ended: string | null;
    officialSite: string;
    schedule: {
        time: string;
        days: string[];
    };
    rating: {
        average: number | null;
    };
    weight: number;
    network: {
        id: number | null;
        name: string | null;
        country: {
            name: string;
            code: string;
            timezone: string;
        } | null;
        officialSite: string | null;
    } | null;
    webChannel: {
        id: number | null;
        name: string | null;
        country: string | null;
        officialSite: string | null;
    };
    dvdCountry: string | null;
    externals: {
        tvrage: number | null;
        thetvdb: number | null;
        imdb: string | null;
    };
    image: {
        medium: string;
        original: string;
    };
    summary: string;
    updated: number;
    _links: {
        self: {
            href: string;
        };
        previousepisode: {
            href: string;
        };
        nextepisode?: {
            href: string;
        };
    };
};
