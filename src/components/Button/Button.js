import styles from './Button.module.css'


function Button({onClick, name, styleName}){
    return(
        <div className={styles[`button-container`]}>
            <button className={styles[styleName]} type="button" onClick={onClick}>{name}</button>
        </div>

    );

}

export default Button;