import './SignUp.css';
import {Link} from "react-router-dom";
import {useState} from "react";

function SignUp(){
    const [user, setUser] = useState({
        username: null,
        email: null,
        password: null
    });
    //const history = useHistory();

    function handleChange(evt) {
        const value = evt.target.value;

        setUser({
            ...user,
            [evt.target.name]: value
        });
    }

    async function createUserRequest() {
        // 1. Request maken naar de backend waarin we vragen of deze inloggegevens kloppen
        /*try {
            await axios.post('http://localhost:3000/register', user,{
                CancelToken: source.token,
            });
            // 2.1 Als dat zo is, krijgen wij een token terug
            history.push("/signin");
            // 3. Die token is super interessant, daar willen we wat mee, dus die geven we door aan de context. Als je hier ook al gebruikersgegevens hebt, geef je die ook door
            //login(response.data.accessToken);
        } catch(e) {
            console.error(e);
        }*/
    }

    return(
      <>
          <section>
              <form>
                  <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
                  <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
                  <input type="password" name="password" placeholder="Wachtwoord" onChange={handleChange}/>
                  <button type="button" onClick={createUserRequest}>Registreren</button>
              </form>
              <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
          </section>
      </>
    );
}

export default SignUp;