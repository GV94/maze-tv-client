import { FC, useEffect, useState } from 'react';
import { GetScheduleResponse } from '../../api/responses/ScheduleListResponse';
import { SearchResponse } from '../../api/responses/SearchResponse';
import { Page } from '../../components/Page';
import { RequestStatusIndicator } from '../../components/RequestStatusIndicator';
import { useApi } from '../../hooks/useApi';
import { useDebounce } from '../../hooks/useDebounce';
import { getTodaysDate } from '../../utils/date';
import './Home.scss';
import { ScheduleListing } from './ScheduleListing';
import { Search } from './Search';
import { SearchResultListing } from './SearchResultListing';

export const Home: FC = () => {
    const [scheduledShows, setScheduledShows] = useState<GetScheduleResponse>(
        []
    );
    const [searchResults, setSearchResults] = useState<SearchResponse>([]);
    const { client, ...status } = useApi();

    const fetchSchedule = async () => {
        const result = await client.getSchedule(getTodaysDate(), 'us');
        setScheduledShows(result);
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    const doSearch = async (query: string) => {
        const result = await client.search(query);
        setSearchResults(result);
    };

    const debouncedSearch = useDebounce(doSearch, 500);

    return (
        <Page className="home">
            <Search
                onChange={(e) => debouncedSearch(e.target.value)}
                requestStatus={status}
            />
            <RequestStatusIndicator {...status} />
            <div className="home-listing">
                {searchResults && searchResults?.length > 0 ? (
                    <SearchResultListing searchResults={searchResults} />
                ) : (
                    <ScheduleListing scheduledShows={scheduledShows} />
                )}
            </div>
        </Page>
    );
};
