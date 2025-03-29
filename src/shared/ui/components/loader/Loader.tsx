import { RingLoader } from 'react-spinners';
import styles from './_loader.module.scss';

export const Loader: React.FC = ()=>{
    return(
        <div className={styles.loader}></div>
    )
}