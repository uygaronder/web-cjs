import React from 'react';
import './css/LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner">
                <div className="spinner-inner">
                    <div className="spinner-inner-inner"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;