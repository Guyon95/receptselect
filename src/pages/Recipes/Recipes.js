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
            let response;
            //real apikey: e4155c89a5914433a598f82f4041dd76
            //ad94f2ca2a5b46658368f8e3af1f0eca
            try {
                if(Object.keys(params).length === 0){
                    response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
                        params: {
                            apiKey: '665f6e1d6862458991d64691af3ef97f',
                            type: 'main course',
                            instructionsRequired: true,
                            number: 20,
                            //instructionsRequired: true,

                            //...params,
                        },
                        //cancelToken:source.token,
                    });
                    setRecipes(response.data.recipes);

                }
                else {
                    response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                        params: {
                            apiKey: 'e4155c89a5914433a598f82f4041dd76',
                            type: 'main course',
                            instructionsRequired: true,
                            number: 20,
                            ...params,
                        },
                        //cancelToken:source.token,
                    });
                    setRecipes(response.data.results);
                }



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
                {recipes && recipes.map((recipe) => {
                    return <RecipeCard key={recipe.id} data={recipe} countPerson={countPerson} />
                })}
            </>
            }
        </div>

    );
}

export default Recipes;