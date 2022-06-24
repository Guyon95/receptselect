import styles from './Radio.module.css'


function Radio({id, name, checked, onChange}){

    return(
      <div className={styles[`radio-button-container`]}>
          <input className={styles[`radio-button`]} id={id} name={name} type="radio" checked={checked} onChange={onChange}/>
          <label className={styles[`radio-label`]} htmlFor={id}>{id}</label>
      </div>
    );

}

export default Radio;