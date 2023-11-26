import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ShowResponse } from '../../api/responses/ShowResponse';
import fallbackThumbnail from '../../assets/thumbnail_fallback.webp';
import { Hero } from '../../components/Hero';
import { Page } from '../../components/Page';
import { stripHtmlOfTags } from '../../utils/text';
import './ShowDetailsPage.scss';
export const ShowDetailsPage: FC = () => {
    const { show } = useLoaderData() as { show: ShowResponse };

    return (
        <Page>
            <div className="container">
                <Hero
                    title={show.name}
                    image={show.image.original ?? fallbackThumbnail}
                />

                <div className="content">
                    <h2>Details</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Rating</th>
                                <td>{show.rating.average ?? '-'}</td>
                            </tr>
                            <tr>
                                <th>Language</th>
                                <td>{show.language}</td>
                            </tr>
                            <tr>
                                <th>Genres</th>
                                <td>{show.genres.join(', ') || '-'}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{show.status}</td>
                            </tr>
                            <tr>
                                <th>Runtime</th>
                                <td>{show.runtime} minutes</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2>Summary</h2>
                    <p>{stripHtmlOfTags(show.summary)}</p>
                </div>
            </div>
        </Page>
    );
};
