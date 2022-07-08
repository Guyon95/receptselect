import styles from './Label.module.css'

function Label({value}){
    return(
      <p className={styles[`label-box`]}>
          {value}
      </p>
    );
}

export default Label