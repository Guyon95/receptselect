import styles from './Footer.module.css'
import logo from "../../assets/roast-food.png";

function Footer(){
    return (
        <section className={styles[`footer-section`]}>
            <img className={styles[`footer-img`]} src={logo} alt="logo"/>
            <h2 className={styles[`footer-h2`]}>Recipe Select</h2>
            <p className={styles[`footer-p`]}>&copy; Recipe Select - All Rights Reserved.</p>
        </section>
    );
}

export default Footer;