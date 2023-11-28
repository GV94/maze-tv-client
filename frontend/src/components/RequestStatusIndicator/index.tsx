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
            <div className="error" data-cy="request-error">
                {error?.message || 'Something went wrong 😕'}
            </div>
        );
    }

    if (isLoading && isDelayed) {
        childComponent = (
            <p className="loading" data-cy="request-loader__delayed">
                Loading... Things are taking longer than usual, check your
                internet connection 🐌
            </p>
        );
    }

    if (isLoading && !isDelayed) {
        childComponent = (
            <p className="loading" data-cy="request-loader">
                Loading...
            </p>
        );
    }

    return childComponent ? (
        <div className="requestStatusIndicator">{childComponent}</div>
    ) : null;
};
