import { FC } from 'react';
import { GetScheduleResponse } from '../../api/responses/ScheduleListResponse';
import fallbackImg from '../../assets/thumbnail_fallback.webp';
import { Listing } from '../../components/Listing';
import { stripHtmlOfTags } from '../../utils/text';

type ScheduleListingProps = {
    scheduledShows: GetScheduleResponse;
};

export const ScheduleListing: FC<ScheduleListingProps> = ({
    scheduledShows,
}) => {
    return (
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
                    image: scheduleEntry.show.image?.original ?? fallbackImg,
                }))}
        />
    );
};
