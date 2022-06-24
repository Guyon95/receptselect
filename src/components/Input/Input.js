import styles from './Input.module.css'

function Input({type, placeholder, name, onChange, value}){

    return(
        <input className={styles[`input-field`]} type={type} name={name} placeholder={placeholder} onChange={onChange} value={value}/>
    );

}

export default Input;