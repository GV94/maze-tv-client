import { FC, useEffect, useState } from 'react';
import { GetScheduleResponse } from '../../api/responses/ScheduleListResponse';
import { SearchResponse } from '../../api/responses/SearchResponse';
import fallbackImg from '../../assets/thumbnail_fallback.webp';
import { Listing } from '../../components/Listing';
import { Page } from '../../components/Page';
import { RequestStatusIndicator } from '../../components/RequestStatusIndicator';
import { Search } from '../../components/Search';
import { useApi } from '../../hooks/useApi';
import { useDebounce } from '../../hooks/useDebounce';
import { getTodaysDate } from '../../utils/date';
import { stripHtmlOfTags } from '../../utils/text';

export const Home: FC = () => {
    const [scheduledShows, setScheduledShows] = useState<GetScheduleResponse>(
        []
    );

    const [searchResults, setSearchResults] = useState<SearchResponse>([]);

    const { client, ...status } = useApi();

    useEffect(() => {
        const shouldFetchSchedule = () =>
            !scheduledShows || scheduledShows?.length == 0;

        if (shouldFetchSchedule()) {
            (async () => {
                const result = await client.getSchedule(getTodaysDate(), 'us');
                setScheduledShows(result);
            })();
        }
    }, [client, scheduledShows]);

    const doSearch = async (query: string) => {
        const result = await client.search(query);
        setSearchResults(result);
    };

    const debouncedSearch = useDebounce(doSearch, 500);

    return (
        <Page>
            <Search onChange={(e) => debouncedSearch(e.target.value)} />
            <RequestStatusIndicator {...status} />
            <h2>Today's Schedule</h2>
            <p>{getTodaysDate()}</p>
            {searchResults && searchResults?.length > 0 ? (
                <Listing
                    listItems={searchResults.map(({ show }) => ({
                        id: show.id,
                        navigationLink: `/show/${show.id}`,
                        title: show.name,
                        summary: stripHtmlOfTags(show.summary ?? '').slice(
                            0,
                            100
                        ),
                        image: show.image?.original ?? fallbackImg,
                    }))}
                />
            ) : (
                <Listing
                    listItems={scheduledShows
                        .filter(
                            (scheduleEntry) =>
                                new Date(scheduleEntry.airstamp) > new Date()
                        )
                        .map((scheduleEntry) => ({
                            id: scheduleEntry.id,
                            navigationLink: `/show/${scheduleEntry.show.id}`,
                            title: scheduleEntry.show.name,
                            subtitle: `Airs ${scheduleEntry.airtime}`,
                            summary: stripHtmlOfTags(
                                scheduleEntry.show.summary ?? ''
                            ).slice(0, 100),
                            image:
                                scheduleEntry.show.image?.original ??
                                fallbackImg,
                        }))}
                />
            )}
        </Page>
    );
};
