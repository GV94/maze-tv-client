import { FC } from 'react';

type ListingProps = {
    listItems: {
        id: number;
        title: string;
        summary: string;
        image: string;
    }[];
};

export const Listing: FC<ListingProps> = ({ listItems }) => {
    return (
        <div>
            {listItems.map((item) => {
                return (
                    <div key={item.id}>
                        <img src={item.image} alt="" width="400px" />
                        <h2>{item.title}</h2>
                        <p>{item.summary}</p>
                    </div>
                );
            })}
        </div>
    );
};
