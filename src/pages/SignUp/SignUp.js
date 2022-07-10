import './SignUp.module.css';
import {Link, useHistory} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import background from "../../assets/top-view-food-frame-with-copy-space.jpg";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import styles from "../SignUp/SignUp.module.css";
import Logo from "../../components/Logo/Logo";


function SignUp(){
    const history = useHistory();
    const [user, setUser] = useState({
        username: null,
        email: null,
        password: null,
        role: ["user"]
    });
    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    function handleChange(evt) {
        const value = evt.target.value;

        setUser({
            ...user,
            [evt.target.name]: value
        });
    }

    async function createUserRequest() {
        try {

            await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', user,{
                cancelToken: source.token,
            });

           history.push('/signin');

        } catch(e) {
            alert(e.response.data.message);
        }
    }

    return(
        <Section
          background={background}
        >
          <Form>
              <Logo />
              <Input
                  type="text"
                  name="username"
                  placeholder="Username"
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
                  placeholder="Password"
                  onChange={handleChange}
              />
              <p>Do you already have an account? Press <Link to="/signin">here</Link> to sign in.</p>
              <div className={styles[`inlog-button-container`]}>
                <Button
                    onClick={createUserRequest}
                    name="Sign Up"
                    styleName="button-body"
                />
              </div>
          </Form>
        </Section>
    );
}

export default SignUp;