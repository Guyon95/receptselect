import styles from './Form.module.css'

function Form({children}){
    return(
        <form className={styles[`form-container`]}>
            {children}
        </form>
    );
}

export default Form;