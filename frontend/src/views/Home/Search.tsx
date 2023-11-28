import { FC } from 'react';
import { RequestStatus } from '../../api/RequestStatus';
import { Search as SearchComponent } from '../../components/Search';
type SearchProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    requestStatus: RequestStatus;
};

export const Search: FC<SearchProps> = ({ onChange, requestStatus }) => {
    return (
        <>
            <SearchComponent onChange={onChange} />
        </>
    );
};
