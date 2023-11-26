import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../Card';
import { CardProps } from '../Card/CardProps';
import './Listing.scss';
type ListingProps = {
    listItems: (CardProps & { id: number })[];
};

export const Listing: FC<ListingProps> = ({ listItems }) => {
    return (
        <div className="listing">
            {listItems.map((item) => {
                return (
                    <Link to={`/show/${item.id}`} key={item.id}>
                        <div className="item">
                            <Card
                                title={item.title}
                                summary={item.summary}
                                image={item.image}
                            />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
