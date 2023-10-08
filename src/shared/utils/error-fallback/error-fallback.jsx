import styles from './error-fallback.module.css';
export const ErrorFallback = ({ errorMessage }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>{errorMessage}</h1>
        </div>
    );
};
