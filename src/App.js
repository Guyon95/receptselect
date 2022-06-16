import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  const {isAuth} = true;

  return (
    <>
        {/*TODO Header*/}

        <Switch>
          <Route exact path ="/signin">
            <SignIn />
          </Route>
          <Route exact path ="/signup">
            <SignUp />
          </Route>

          {isAuth ?
              <Route exact path="/">
                {/*TODO Home*/}
              </Route>
              : <Redirect to="/signin" />
          }

          {isAuth ?
              <Route path="/contact">
                {/*TODO Contact*/}
              </Route>
              : <Redirect to="/signin" />
          }

          {isAuth ?
              <Route path="/recipes">
                {/*TODO Recipes*/}
              </Route>
              : <Redirect to="/signin" />
          }

          {isAuth ?
              <Route path="/recipe/:id">
                {/*TODO Recipes*/}
              </Route>
              : <Redirect to="/signin" />
          }

          {isAuth ?
              <Route path="/profile">
                {/*TODO Profile*/}
              </Route>
              : <Redirect to="/signin" />
          }
        </Switch>


      {/*TODO Footer*/}
    </>
  );
}

export default App;
