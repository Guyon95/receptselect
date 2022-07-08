import styles from './Label.module.css'

function Label({value}){
    return(
      <span className={styles[`label-box`]}>
          {value}
      </span>
    );
}

export default Label