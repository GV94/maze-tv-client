import { FC } from 'react';
import { RequestStatusIndicatorProps } from './RequestStatusIndicator.props';
import './RequestStatusIndicator.scss';
export const RequestStatusIndicator: FC<RequestStatusIndicatorProps> = ({
    isLoading,
    isDelayed,
    error,
}) => {
    let childComponent = null;

    if (error) {
        childComponent = (
            <div className="error">
                {error?.message || 'Something went wrong 😕'}
            </div>
        );
    }

    if (isLoading && isDelayed) {
        childComponent = (
            <p className="loading">
                Loading... Things are taking longer than usual, check your
                internet connection 🐌
            </p>
        );
    }

    if (isLoading) {
        childComponent = <p className="loading">Loading...</p>;
    }

    return childComponent ? (
        <div className="requestStatusIndicator">{childComponent}</div>
    ) : null;
};
