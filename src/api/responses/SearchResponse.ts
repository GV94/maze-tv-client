import { Show } from '../Show';

export type SearchResponse = {
    score: number;
    show: Show;
}[];
