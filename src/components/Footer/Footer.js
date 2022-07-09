import styles from './Footer.module.css'
import Logo from "../Logo/Logo";

function Footer(){
    return (
        <section className={styles[`footer-section`]}>
            <Logo />
            <h2 className={styles[`footer-h2`]}>Recipe Select</h2>
            <p className={styles[`footer-p`]}>&copy; Recipe Select - All Rights Reserved.</p>
        </section>
    );
}

export default Footer;