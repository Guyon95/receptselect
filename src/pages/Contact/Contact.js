import Section from "../../components/Section/Section";
import background from "../../assets/juicy-steak-medium-rare-beef-with-spices-grilled-vegetables.jpg"
import Input from "../../components/Input/Input";
import {useState} from "react";
import styles from "./Contact.module.css"
import Button from "../../components/Button/Button";

function Contact(){
    const [contactForm, setContactForm] = useState({
        subject: '',
        comment: '',
    });

    function handleChange(e){
        const value = e.target.value;

        setContactForm({
            ...contactForm,
            [e.target.name]: value
        });
    }

    return(

        <Section
            background={background}
        >
            <form
                className={styles[`form-container`]}
            >
                <Input
                    type="text"
                    name="subject"
                    placeholder="Onderwerp"
                    onChange={handleChange}
                />

                <textarea
                    className={styles[`textarea-field`]}
                    name="comment"
                    placeholder="Vul hier uw vraag en/of opmerking in"
                    cols="85"
                    rows="10"
                />

                <Button
                    name="Verzend"
                    type="button"
                    styleName="button-body"
                    onClick={() => console.log("Formulier verzonden!!")}
                />
            </form>
        </Section>

    );
}

export default Contact;