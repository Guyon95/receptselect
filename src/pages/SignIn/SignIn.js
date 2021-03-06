import {useContext, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import background from "../../assets/top-view-food-frame-with-copy-space.jpg";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import styles from "../SignIn/SignIn.module.css";
import Logo from "../../components/Logo/Logo";



function SignIn(){
    const { login } = useContext(AuthContext);
    const [error, toggleError] = useState(false);
    const [user, setUser] = useState({
        username: null,
        password: null
    });
    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
        // eslint-disable-next-line
    }, []);

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
                cancelToken: source.token,
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
                <Logo />
                <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <p className={styles[`link-text`]}>No account? <Link to="/signup">Sign up here</Link></p>
                {error && <p className={styles[`error`]}>Combination of password and username are incorrect!</p>}
                <div className={styles[`inlog-button-container`]}>
                    <Button
                        onClick={getToken}
                        name="Sign In"
                        styleName="button-body"
                    />
                </div>

            </Form>
        </Section>
    );
}

export default SignIn;