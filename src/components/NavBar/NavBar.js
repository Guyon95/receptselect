import { useHistory, Link } from 'react-router-dom';
import styles from "./NavBar.module.css";
import {useContext} from "react";
import { AuthContext } from '../../context/AuthContext';
import Button from "../Button/Button";
import Logo from "../Logo/Logo";

function NavBar() {
    const {isAuth, logout} = useContext(AuthContext);
    const history = useHistory();

    return (
        <nav className={styles[`nav-container`]}>
            <Link to="/">
                <span className={styles[`logo-container`]}>
                    <Logo />
                    <h2>Recipe Select</h2>
                </span>
        </Link>
            {isAuth ?
                <div className={styles[`button-container`]}>
                        <Button
                            name="Home"
                            onClick={() => history.push('/')}
                            styleName="button-nav"
                        />
                        <Button
                            name="Recipes"
                            onClick={() => history.push('/recipes')}
                            styleName="button-nav"
                        />
                        <Button
                            name="Contact"
                            onClick={() => history.push('/contact')}
                            styleName="button-nav"
                        />
                        <Button
                            name="My profile"
                            onClick={() => history.push('/profile')}
                            styleName="button-nav"
                        />
                        <Button
                            name="Sign out"
                            onClick={logout}
                            styleName="button-nav"
                        />
                </div>
                :
                <div className={styles[`button-container`]}>
                    <Button
                        name="Sign in"
                        onClick={() => history.push('/signin')}
                        styleName="button-nav"
                    />
                    <Button
                        name="Sign Up"
                        onClick={() => history.push('/signup')}
                        styleName="button-nav"
                    />
                </div>
            }
        </nav>
    );
}

export default NavBar;