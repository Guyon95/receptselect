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
    const [saveData, setSaveData] = useState(false)

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
        setSaveData(true);
    }

    return(
        <Section
            background={background}
        >
            <Form>
                <label className={styles[`label-container`]}>
                    Username
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={pageUser.username}
                    />
                </label>
                <label className={styles[`label-container`]}>
                    Email address
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={pageUser.email}
                    />
                </label>
                <label className={styles[`label-container`]}>
                    Password
                    <Input
                        type="password"
                        name="password"
                    />
                </label>
                <div className={styles[`label-container`]}>
                    <Button
                        type="button"
                        styleName="button-body"
                        name="Save"
                        onClick={saveUserData}
                    >

                    </Button>
                </div>
                {saveData && <p>Your settings has been submitted.</p>}
            </Form>
        </Section>

    );
}

export default Profile;