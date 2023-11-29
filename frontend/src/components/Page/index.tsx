import { FC, PropsWithChildren } from 'react';
import './Page.scss';

type HomeProps = {
    className?: string;
} & PropsWithChildren;
export const Page: FC<HomeProps> = ({ children, className }) => {
    const classes = className ? `page ${className}` : `page`;
    return (
        <div className={classes}>
            <h1>Maze TV 📺</h1>
            {children}
        </div>
    );
};
