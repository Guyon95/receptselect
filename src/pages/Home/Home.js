import './Home.module.css'
import Radio from "../../components/Radio/Radio";
import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import background from "../../assets/golden-cutlery-with-textile-plate-dark-background-top-view.jpg"
import styles from "./Home.module.css"
import Button from "../../components/Button/Button";
import {useState} from "react";
import {useHistory} from "react-router-dom";

function Home(){
    const [mood, setMood] = useState('');
    const [company, setCompany] = useState(0);
    const [motivation, setMotivation] = useState('');

    const history = useHistory();

    function resetInput(){
        setMood('');
        setCompany(0);
        setMotivation('');
    }

    function handleChange(e){
        setCompany(e.target.value);
    }

    async function handleSubmit(){

        let maxReadyTime = null;
        let minSugar = null;
        let maxSugar = null

        if(motivation === 'no'){
            maxReadyTime = 20;
        }

        if(mood === 'sad'){
            minSugar = 30;
        }
        else if(mood === 'neutral'){
            minSugar = 15;
            maxSugar = 29;
        }
        else if(mood === 'happy') {
            maxSugar = 14;
        }


        const params = {
            minSugar: minSugar,
            maxSugar: maxSugar,
            maxReadyTime: maxReadyTime,
        }

        const data ={
            params,
            countPerson: company,
        }

        console.log(data)

        history.push('/recipes', data);

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
                            checked={mood === 'sad'}
                            onChange={() => setMood('sad')}
                        />
                        <Radio
                            id="Neutraal"
                            type="radio"
                            name="stemming"
                            checked={mood === 'neutral'}
                            onChange={() => setMood('neutral')}
                        />
                        <Radio
                            id="Blij"
                            type="radio"
                            name="stemming"
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
                        onClick={handleSubmit}
                        name="Zoek recept"
                        styleName="home-button"
                    />
                </div>
            </Form>
        </Section>


    );

}

export default Home;