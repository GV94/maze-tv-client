export type GetScheduleResponse = {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    type: string;
    airdate: string;
    airtime: string;
    airstamp: string;
    runtime: number;
    rating: { average: number | null };
    image: { medium: string; original: string } | null;
    summary: string | null;
    _links: {
        self: { href: string };
        show: { href: string };
    };
    _embedded: {
        show: {
            id: number;
            url: string;
            name: string;
            type: string;
            language: string;
            genres: string[];
            status: string;
            runtime: number;
            averageRuntime: number;
            premiered: string;
            ended: string | null;
            officialSite: string;
            schedule: { time: string; days: string[] };
            rating: { average: number | null };
            weight: number;
            network: string | null;
            webChannel: {
                id: number;
                name: string;
                country: {
                    name: string;
                    code: string;
                    timezone: string;
                };
                officialSite: string | null;
            };
            dvdCountry: string | null;
            externals: {
                tvrage: number | null;
                thetvdb: number | null;
                imdb: string | null;
            };
            image: { medium: string; original: string };
            summary: string;
            updated: number;
            _links: {
                self: { href: string };
                previousepisode: { href: string };
            };
        };
    };
}[];
