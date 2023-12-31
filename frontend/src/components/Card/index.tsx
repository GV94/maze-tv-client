import { FC } from 'react';
import { cropText } from '../../utils/text';
import './Card.scss';
import { CardProps } from './CardProps';

export const Card: FC<CardProps> = ({ title, subtitle, summary, image }) => {
    return (
        <div className="card" data-cy="card">
            <img src={image} alt="" className="thumbnail" />
            <div className="content">
                <h3 className="title">{cropText(title, 40)}</h3>
                {subtitle && <h5 className="subtitle">{subtitle}</h5>}
                <p className="summary">{summary || 'Summary missing'}</p>
            </div>
        </div>
    );
};
