import styles from './Footer.module.css'
import logo from "../../assets/roast-food.png";

function Footer(){
    return (
        <section className={styles[`footer-section`]}>
            <img className={styles[`footer-img`]} src={logo} alt="logo"/>
            <h2 className={styles[`footer-h2`]}>Recept Select</h2>
            <p className={styles[`footer-p`]}>&copy; Recept Select - alle rechten voorbehouden</p>
        </section>
    );
}

export default Footer;