import { FC, useEffect, useState } from 'react';
import { client } from '../../api/client';
import { GetScheduleResponse } from '../../api/responses/ScheduleListResponse';
import { SearchResponse } from '../../api/responses/SearchResponse';
import fallbackImg from '../../assets/thumbnail_fallback.webp';
import { Listing } from '../../components/Listing';
import { Search } from '../../components/Search';
import { getTodaysDate } from '../../utils/date';
import { stripHtmlOfTags } from '../../utils/text';

export const Home: FC = () => {
    const [scheduledShows, setScheduledShows] = useState<GetScheduleResponse>(
        []
    );

    const [searchResults, setSearchResults] = useState<SearchResponse>([]);

    useEffect(() => {
        (async () => {
            const result = await client().getSchedule(getTodaysDate(), 'us');
            setScheduledShows(result);
        })();
    }, []);

    const search = async (query: string) => {
        const result = await client().search(query);
        setSearchResults(result);
    };

    return (
        <div>
            <h1>Astra TV</h1>
            <Search onChange={(e) => search(e.target.value)} />
            <h2>Today's Schedule</h2>
            <p>{getTodaysDate()}</p>
            {searchResults && searchResults?.length > 0 ? (
                <Listing
                    listItems={searchResults.map(({ show }) => ({
                        id: show.id,
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
                    listItems={scheduledShows.map((scheduleEntry) => ({
                        id: scheduleEntry.show.id,
                        title: scheduleEntry.show.name,
                        summary: stripHtmlOfTags(
                            scheduleEntry.show.summary ?? ''
                        ).slice(0, 100),
                        image:
                            scheduleEntry.show.image?.original ?? fallbackImg,
                    }))}
                />
            )}
        </div>
    );
};
