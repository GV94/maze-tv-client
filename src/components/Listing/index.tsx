import { FC } from 'react';
import { Card } from '../Card';
import { CardProps } from '../Card/CardProps';
import './Listing.scss';
type ListingProps = {
    listItems: (CardProps & { id: string })[];
};

export const Listing: FC<ListingProps> = ({ listItems }) => {
    return (
        <div className="listing">
            {listItems.map((item) => {
                return (
                    <div className="item">
                        <Card
                            key={item.id}
                            title={item.title}
                            summary={item.summary}
                            image={item.image}
                        />
                    </div>
                );
            })}
        </div>
    );
};
