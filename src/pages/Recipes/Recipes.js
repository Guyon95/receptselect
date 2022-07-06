import {useLocation} from 'react-router-dom';
import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./Recipes.module.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

function Recipes(){
    const [recipes, setRecipes] = useState([]);
    const [countPerson, setCountPerson] = useState(2);
    const [params, setParams] = useState({});
    const location = useLocation();

    useEffect(() => {
        if (location.state !== undefined) {
            setParams({
                minSugar: location.state.params.minSugar,
                maxSugar: location.state.params.maxSugar,
                maxReadyTime: location.state.params.maxReadyTime
            });

            setCountPerson(location.state.countPerson);
        }
    },[]);

    useEffect(() =>{
        async function getRecipesData() {

            //real apikey: e4155c89a5914433a598f82f4041dd76
            //ad94f2ca2a5b46658368f8e3af1f0eca
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                    params: {
                        apiKey: 'e4155c89a5914433a598f82f4041dd76',
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

        getRecipesData().then();

        console.log('finished');

    },[params]);




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