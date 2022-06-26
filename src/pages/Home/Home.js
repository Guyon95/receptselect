import './Home.module.css'
import Radio from "../../components/Radio/Radio";
import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import background from "../../assets/golden-cutlery-with-textile-plate-dark-background-top-view.jpg"
import styles from "./Home.module.css"
import Button from "../../components/Button/Button";
import {useState} from "react";

function Home(){
    const [mood, setMood] = useState('');
    const [company, setCompany] = useState(0);
    const [motivation, setMotivation] = useState('');

    function resetInput(){
        setMood('');
        setCompany(0);
        setMotivation('');
    }

    function handleChange(e){
        setCompany(e.target.value);
    }

    function log(){
        console.log(mood);
        console.log(company);
        console.log(motivation);
    }

    return(
        <Section
            background={background}
        >
            <Form>
                <div className={styles[`question-container`]}>
                    <p className={styles[`question`]}>Wat is uw stemming?</p>
                    <span className={styles[`radio-container`]}>
                        <Radio
                            id="Verdrietig"
                            type="radio"
                            name="stemming"
                            value="sad"
                            checked={mood === 'sad'}
                            onChange={() => setMood('sad')}
                        />
                        <Radio
                            id="Neutraal"
                            type="radio"
                            name="stemming"
                            value="neutral"
                            checked={mood === 'neutral'}
                            onChange={() => setMood('neutral')}
                        />
                        <Radio
                            id="Blij"
                            type="radio"
                            name="stemming"
                            value="happy"
                            checked={mood === 'happy'}
                            onChange={() => setMood('happy')}
                        />
                    </span>
                </div>
                <div className={styles[`question-container`]}>
                    <p className={styles[`question`]}>Met hoeveel eet u?</p>
                    <input className={styles[`input-field`]} type="number" value={company} name="number" max="20" min="0" onChange={handleChange}/>
                </div>
                <div className={styles[`question-container`]}>
                    <p className={styles[`question`]}>Heeft u zin om te koken?</p>
                    <span className={styles[`radio-container`]}>
                        <Radio
                            id="Ja"
                            type="radio"
                            name="motivatie"
                            checked={motivation === 'yes'}
                            onChange={() => setMotivation('yes')}
                        />
                        <Radio
                            id="Nee"
                            type="radio"
                            name="motivatie"
                            checked={motivation === 'no'}
                            onChange={() => setMotivation('no')}
                        />
                    </span>
                </div>
                <div className={styles[`button-container`]}>
                    <Button
                        onClick={resetInput}
                        name="Reset"
                        styleName="reset-button"
                    />
                    <Button
                        /*TODO OnClick*/
                        onClick={log}
                        name="Zoek recept"
                        styleName="home-button"
                    />
                </div>
            </Form>
        </Section>


    );

}

export default Home;