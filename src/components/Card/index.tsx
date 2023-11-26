import { FC } from 'react';
import './Card.scss';
import { CardProps } from './CardProps';
export const Card: FC<CardProps> = ({ title, summary, image }) => {
    const componentName = 'card';

    const cropText = (title: string, length: number) => {
        if (title.length > 20) {
            return `${title.slice(0, length)}...`;
        } else {
            return title;
        }
    };
    return (
        <div className={componentName}>
            <img src={image} alt="" className={`${componentName}-thumbnail`} />
            <div className="content">
                <h3 className={`${componentName}-title`}>
                    {cropText(title, 40)}
                </h3>
                <p className={`${componentName}-summary`}>
                    {summary || 'Summary missing'}{' '}
                </p>
            </div>
        </div>
    );
};
