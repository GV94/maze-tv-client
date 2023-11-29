import { FC } from 'react';
import { Search as SearchComponent } from '../../components/Search';

type SearchProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Search: FC<SearchProps> = ({ onChange }) => {
    return (
        <>
            <SearchComponent onChange={onChange} />
        </>
    );
};
