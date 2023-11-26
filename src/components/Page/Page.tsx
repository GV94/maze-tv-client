import { FC, PropsWithChildren } from 'react';
import './Page.scss';
export const Page: FC<PropsWithChildren> = ({ children }) => {
    return <div className="page">{children}</div>;
};
