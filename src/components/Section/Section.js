import styles from './Section.module.css';


function Section({children, background}){
    return(
        <section className={styles[`section-container`]} style={{ backgroundImage: `url(${background})`}}>
            {children}
        </section>
    );
}

export default Section;