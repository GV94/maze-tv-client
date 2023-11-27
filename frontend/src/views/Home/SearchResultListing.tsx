import { FC } from 'react';
import { SearchResponse } from '../../api/responses/SearchResponse';
import fallbackImg from '../../assets/thumbnail_fallback.webp';
import { Listing } from '../../components/Listing';
import { getTodaysDate } from '../../utils/date';
import { stripHtmlOfTags } from '../../utils/text';

type SearchResultListingProps = {
    searchResults: SearchResponse;
};

export const SearchResultListing: FC<SearchResultListingProps> = ({
    searchResults,
}) => {
    return (
        <>
            <h2>Today's Schedule</h2>
            <p>{getTodaysDate()}</p>
            <Listing
                listItems={searchResults.map(({ show }) => ({
                    id: show.id,
                    navigationLink: `/show/${show.id}`,
                    title: show.name,
                    summary: stripHtmlOfTags(show.summary ?? '').slice(0, 100),
                    image: show.image?.original ?? fallbackImg,
                }))}
            />
        </>
    );
};
