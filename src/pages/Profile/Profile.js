import Section from "../../components/Section/Section";
import background from "../../assets/food-with-ingredients.jpg"
import styles from "./Profile.module.css"
import Form from "../../components/Form/Form";
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";
import Input from "../../components/Input/Input";
import {useState} from "react"
import Button from "../../components/Button/Button";


function Profile(){
    const { user } = useContext(AuthContext);

    const [pageUser, setPageUser] = useState({
        username: user.username,
        email: user.email,
        password: null
    });

    function handleChange(e){
        const value = e.target.value;

        setPageUser({
            ...pageUser,
            [e.target.name]: value
        });
    }

    function saveUserData(){
        console.log("Opslaan.....")
        /*TODO Userdata opslaan*/
    }

    return(
        <Section
            background={background}
        >
            <Form>
                <label className={styles[`label-container`]}>
                    Gebruikersnaam
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={pageUser.username}
                    />
                </label>
                <label className={styles[`label-container`]}>
                    Emailadres
                    <Input
                        type="email"
                        name="email"
                        placeholder="Emailadres"
                        onChange={handleChange}
                        value={pageUser.email}
                    />
                </label>
                <label className={styles[`label-container`]}>
                    Wachtwoord
                    <Input
                        type="password"
                        name="password"
                    />
                </label>

                <Button
                    type="button"
                    styleName="button-body"
                    name="Opslaan"
                    onClick={saveUserData}
                >

                </Button>
            </Form>
        </Section>

    );
}

export default Profile;