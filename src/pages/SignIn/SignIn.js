import './SignIn.css';
import {useState} from "react";
import {Link} from "react-router-dom";

function SignIn(){
    const [user, setUser] = useState({
        email: null,
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
        /*try {
            const response = await axios.post('http://localhost:3000/login', user,{
                CancelToken: source.token,
            });

            login(response.data.accessToken);

        } catch(e) {
            console.error(e);
        }*/
    }


    return(
    <>
        <section>
            <form>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Wachtwoord" onChange={handleChange} />
                <p>Geen account? <Link to="/signup">Registreer hier.</Link></p>
                <button type="button" onClick={getToken}>Inloggen</button>
            </form>
        </section>
    </>
    );
}

export default SignIn;