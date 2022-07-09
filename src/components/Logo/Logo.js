import styles from "./Logo.module.css";
import logo from "../../assets/roast-food.png";


function Logo(){
    return(
        <img className={styles[`logo-container-img`]} src={logo} alt="logo"/>
    )
}

export default Logo;