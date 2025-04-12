import styles from './_loader.module.scss';

export const Loader: React.FC = ()=>{
    return (
        <div className={styles.overlay} data-testid = 'loader'>
            <div className={styles.background}></div>
            <div className={styles.loader}></div>
        </div>
    )
}