import Section from "../../components/Section/Section";
import background from "../../assets/juicy-steak-medium-rare-beef-with-spices-grilled-vegetables.jpg"
import Input from "../../components/Input/Input";
import {useState} from "react";
import styles from "./Contact.module.css"
import Button from "../../components/Button/Button";

function Contact(){
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');

    function run(){
        console.log(`Ik ga nu een mail versturen met als onderwerp ${subject} en opmerking ${comment} `)
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
                    placeholder="Subject"
                    onChange={(e) => setSubject(e.target.value)}
                />

                <textarea
                    className={styles[`textarea-field`]}
                    name="comment"
                    placeholder="Enter your question and/or comment here."
                    cols="85"
                    rows="10"
                    onChange={(e) => setComment(e.target.value)}
                />

                <Button
                    name="Send"
                    type="button"
                    styleName="button-body"
                    onClick={run}
                />
            </form>
        </Section>

    );
}

export default Contact;