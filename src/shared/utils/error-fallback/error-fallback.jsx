import styles from './error-fallback.module.css';
import PropTypes from 'prop-types';
export const ErrorFallback = ({ errorMessage }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>{errorMessage}</h1>
        </div>
    );
};

ErrorFallback.propTypes = {
    errorMessage: PropTypes.string.isRequired
};
