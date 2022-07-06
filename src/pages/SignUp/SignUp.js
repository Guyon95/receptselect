import './SignUp.module.css';
import {Link, useHistory} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import background from "../../assets/vegetables-set-left-black-slate.jpg";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";

function SignUp(){
    const history = useHistory();
    const [user, setUser] = useState({
        username: null,
        email: null,
        password: null,
        role: ["user"]
    });

    function handleChange(evt) {
        const value = evt.target.value;

        setUser({
            ...user,
            [evt.target.name]: value
        });
    }

    async function createUserRequest() {
        // 1. Request maken naar de backend waarin we vragen of deze inloggegevens kloppen
        try {

            await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', user,{
                //CancelToken: source.token,
            });

           history.push('/signin');

        } catch(e) {
            console.error(e);
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
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
              />
              <Input
                  type="password"
                  name="password"
                  placeholder="Wachtwoord"
                  onChange={handleChange}
              />
              <p>Heb je al een account? <Link to="/signin">Klik hier</Link> om  in te loggen.</p>
              <Button
                  onClick={createUserRequest}
                  name="Registreren"
                  styleName="button-body"
              />
          </Form>
        </Section>
    );
}

export default SignUp;