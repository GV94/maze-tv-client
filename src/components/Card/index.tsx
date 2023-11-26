import { FC } from 'react';
import './Card.scss';
import { CardProps } from './CardProps';
export const Card: FC<CardProps> = ({ title, subtitle, summary, image }) => {
    const cropText = (title: string, length: number) => {
        if (title.length > 20) {
            return `${title.slice(0, length)}...`;
        } else {
            return title;
        }
    };
    return (
        <div className="card">
            <img src={image} alt="" className="thumbnail" />
            <div className="content">
                <h3 className="title">{cropText(title, 40)}</h3>
                {subtitle && <h5 className="subtitle">{subtitle}</h5>}
                <p className="summary">{summary || 'Summary missing'} </p>
            </div>
        </div>
    );
};
