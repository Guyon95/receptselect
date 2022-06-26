import styles from './App.module.css';
import {Redirect, Route, Switch} from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import {useContext} from "react";
import { AuthContext } from './context/AuthContext';
import Contact from "./pages/Contact/Contact";
import Recipes from "./pages/Recipes/Recipes";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import Profile from "./pages/Profile/Profile";

function App() {
  const {isAuth} = useContext(AuthContext);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className={styles[`main-container`]}>
        <Switch>
          <Route exact path="/">
            {isAuth ? <Home /> : <Redirect to="/signin" />}
          </Route>

          <Route path="/contact">
            {isAuth ? <Contact /> : <Redirect to="/signin" />}
          </Route>

          <Route path="/recipes">
            {isAuth ? <Recipes /> : <Redirect to="/signin" />}
          </Route>

          <Route path="/recipe/:id">
            {isAuth ? <RecipeDetail /> : <Redirect to="/signin" />}
          </Route>

          <Route path="/profile">
            {isAuth ? <Profile /> : <Redirect to="/signin" />}
          </Route>

          <Route exact path ="/signin">
            <SignIn />
          </Route>
          <Route exact path ="/signup">
            <SignUp />
          </Route>

        </Switch>
      </main>

      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;
