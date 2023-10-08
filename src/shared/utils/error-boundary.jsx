import React from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        error: null
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error: ', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    fallback: PropTypes.elementType.isRequired
};
