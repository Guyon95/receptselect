import {useLocation} from 'react-router-dom';
import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./Recipes.module.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

function Recipes(){
    const [recipes, setRecipes] = useState([]);
    const [countPerson, setCountPerson] = useState(2);
    const location = useLocation();


    useEffect(() =>{
        async function getRecipesData() {

            let params = null;

            if (location.state !== undefined) {
                params = {
                    minSugar: location.state.params.minSugar,
                    maxSugar: location.state.params.maxSugar,
                    maxReadyTime: location.state.params.maxReadyTime
                };

                setCountPerson(location.state.countPerson);
            }
            //real apikey: e4155c89a5914433a598f82f4041dd76

            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                    params: {
                        apiKey: 'ad94f2ca2a5b46658368f8e3af1f0eca',
                        type: 'main course',
                        instructionsRequired: true,
                        number: 20,
                        ...params,
                    },
                    //cancelToken:source.token,
                });
                setRecipes(response.data);


            } catch (e) {

            }
        }

        getRecipesData();

    },[]);




    return(
        <div className={styles['recipes-container']}>
            {recipes &&
            <>
                {recipes.results && recipes.results.map((recipe) => {
                    return <RecipeCard key={recipe.id} data={recipe} countPerson={countPerson} />
                })}
            </>
            }
        </div>

    );
}

export default Recipes;