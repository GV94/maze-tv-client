import { FC, PropsWithChildren } from 'react';
import './Page.scss';
export const Page: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="page">
            <h1>Astra TV</h1>
            {children}
        </div>
    );
};
