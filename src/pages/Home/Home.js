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
    const [error, toggleError] = useState(false);
    const history = useHistory();

    const [data, setData] = useState({
        params:{
            minSugar: null,
            maxSugar: null,
            maxReadyTime: null,
        },
        personCount: 0,

    })



    function resetInput(){
        setMood('');
        setCompany(0);
        setMotivation('');
        toggleError(false);
    }

    function handleChangeCompany(e){
        const {value} = e.target;

        setCompany(value);

        setData({
            params: {
                minSugar: data.params.minSugar,
                maxSugar: data.params.maxSugar,
                maxReadyTime: data.params.maxReadyTime,
            },
            personCount: e.target.value,
        });
    }

    function handleChangeMood(e){

        const value = e.target.id;

        setMood(value);

        let minSugar = null;
        let maxSugar = null;

        if(value === 'sad'){
            minSugar = 30;
        }
        else if(value === 'neutral'){
            minSugar = 15;
            maxSugar = 29;
        }
        else if(value === 'happy') {
            maxSugar = 14;
        }

        setData({
            params: {
                minSugar: minSugar,
                maxSugar: maxSugar,
                maxReadyTime: data.params.maxReadyTime,
            },
            personCount: data.personCount
        });

    }

    function handleChangeMotivation(e){
        const value = e.target.id;

        setMotivation(value);

        let maxReadyTimeValue = null;

        if(value === 'no'){
            maxReadyTimeValue = 20;
        }

        setData({
            params: {
                minSugar: data.params.minSugar,
                maxSugar: data.params.maxSugar,
                maxReadyTime: maxReadyTimeValue,
            },
            personCount: data.personCount
        });
    }

    function handleSubmit(){
        if(mood === '' || company === 0 || motivation === '') {
            toggleError(true);
        }
        else{
            history.push('/recipes', data);
        }
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
                            id="sad"
                            type="radio"
                            name="stemming"
                            description="Verdrietig"
                            checked={mood === 'sad'}
                            onChange={handleChangeMood}
                        />
                        <Radio
                            id="neutral"
                            type="radio"
                            name="stemming"
                            description="Neutraal"
                            checked={mood === 'neutral'}
                            onChange={handleChangeMood}
                        />
                        <Radio
                            id="happy"
                            type="radio"
                            name="stemming"
                            description="Blij"
                            checked={mood === 'happy'}
                            onChange={handleChangeMood}
                        />
                    </span>
                </div>
                <div className={styles[`question-container`]}>
                    <p className={styles[`question`]}>Met hoeveel eet u?</p>
                    <input className={styles[`input-field`]} type="number" value={company} name="number" max="20" min="0" onChange={handleChangeCompany}/>
                </div>
                <div className={styles[`question-container`]}>
                    <p className={styles[`question`]}>Heeft u zin om te koken?</p>
                    <span className={styles[`radio-container`]}>
                        <Radio
                            id="yes"
                            type="radio"
                            name="motivatie"
                            description="Ja"
                            checked={motivation === 'yes'}
                            onChange={handleChangeMotivation}
                        />
                        <Radio
                            id="no"
                            type="radio"
                            name="motivatie"
                            description="Nee"
                            checked={motivation === 'no'}
                            onChange={handleChangeMotivation}
                        />
                    </span>
                </div>
                {error && <p className={styles[`error`]}>Niet alle velden zijn gevuld!</p>}
                <div className={styles[`button-container`]}>
                    <Button
                        onClick={resetInput}
                        name="Reset"
                        styleName="reset-button"
                    />
                    <Button
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