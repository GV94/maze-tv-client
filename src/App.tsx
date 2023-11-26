import { useEffect, useState } from 'react';
import './App.scss';
import { client } from './api/client';
import { GetScheduleResponse } from './api/responses/ScheduleListResponse';
import { SearchResponse } from './api/responses/SearchResponse';
import fallbackImg from './assets/thumbnail_fallback.webp';
import { Listing } from './components/Listing';
import { Search } from './components/Search';
import { getTodaysDate } from './utils/date';

function App() {
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

    const stripHtmlOfTags = (html: string): string => {
        return html.replace(/<[^>]*>?/gm, '');
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
                    listItems={scheduledShows.map((show) => ({
                        id: show.id,
                        title: show.name,
                        summary: stripHtmlOfTags(show.summary ?? '').slice(
                            0,
                            100
                        ),
                        image: show.image?.original ?? fallbackImg,
                    }))}
                />
            )}
        </div>
    );
}

export default App;
