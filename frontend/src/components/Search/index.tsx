import { FC } from 'react';
import './Search.scss';

type SearchProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Search: FC<SearchProps> = ({ onChange }) => {
    return (
        <div className="search">
            <label htmlFor="search" className="label">
                🔎
            </label>
            <input
                className="input"
                id="search"
                type="text"
                placeholder="Search.."
                onChange={onChange}
            />
        </div>
    );
};
