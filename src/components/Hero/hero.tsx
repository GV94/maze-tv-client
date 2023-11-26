import { FC } from 'react';
import { HeroProps } from './Hero.props';
import './hero.scss';

export const Hero: FC<HeroProps> = ({ title, image }) => {
    return (
        <div className="hero">
            <div className="image-container">
                <img className="img" src={image} alt={title} />
            </div>
            <h3 className="title">{title}</h3>
        </div>
    );
};
