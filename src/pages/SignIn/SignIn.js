import './SignIn.module.css';
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import background from "../../assets/vegetables-set-left-black-slate.jpg";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import styles from "../Home/Home.module.css";

function SignIn(){
    const { login } = useContext(AuthContext);
    const [error, toggleError] = useState(false);

    const [user, setUser] = useState({
        username: null,
        password: null
    });

    function handleChange(e){
        const value = e.target.value;

        setUser({
            ...user,
            [e.target.name]: value
        });
    }

    async function getToken() {

        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', user,{
                //CancelToken: source.token,
            });

            login(response.data.accessToken);

        } catch(e) {
            toggleError(true);
        }
    }

    return(
        <Section
            background={background}
        >
            <Form>
                <Input
                    type="text"
                    name="username"
                    placeholder="Gebruikersnaam"
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Wachtwoord"
                    onChange={handleChange}
                />
                <p>Geen account? <Link to="/signup">Registreer hier</Link></p>
                {error && <p className={styles[`error`]}>Combinatie van wachtwoord en gebruikersnaam zijn onjuist!</p>}
                <Button
                    onClick={getToken}
                    name="Inloggen"
                    styleName="button-body"
                />
            </Form>
        </Section>
    );
}

export default SignIn;