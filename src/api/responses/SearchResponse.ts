import { ShowResponse } from './ShowResponse';

export type SearchResponse = {
    score: number;
    show: ShowResponse;
}[];
