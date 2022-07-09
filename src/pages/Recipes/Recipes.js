import {useHistory, useLocation} from 'react-router-dom';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import styles from "./Recipes.module.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import background from "../../assets/salmon-with-ingredients-table.jpg";
import searchIcon from "../../assets/magnifying-glass-3-64.png";
import resetIcon from "../../assets/x-mark-32.png"
import dinnerIcon from "../../assets/dinner.png";
import Section from "../../components/Section/Section";
import {AuthContext} from "../../context/AuthContext";

function Recipes(){
    const [recipes, setRecipes] = useState([]);
    const [countPerson, setCountPerson] = useState(2);
    const [params, setParams] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const {apiKey} = useContext(AuthContext);
    const location = useLocation();
    const source = axios.CancelToken.source();
    const history = useHistory();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function getRandomRecipes(number){
        try{
            const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
                params: {
                    apiKey: apiKey,
                    type: 'main course',
                    instructionsRequired: true,
                    number: number,
                },
                //cancelToken:source.token,
            });

            history.push(`/recipe/${response.data.recipes[0].id}/2`)
        }
        catch (e){
            console.log(e);
        }
    }

    async function getRecipes(number){
        try{
           const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    ...params,
                    apiKey: apiKey,
                    type: 'main course',
                    instructionsRequired: true,
                    number: number,
                    query:searchValue,

                },
                //cancelToken:source.token,
            });

            setRecipes(response.data.results);
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (location.state !== undefined) {
            setParams({
                minSugar: location.state.params.minSugar,
                maxSugar: location.state.params.maxSugar,
                maxReadyTime: location.state.params.maxReadyTime
            });
            setCountPerson(location.state.personCount);
        }
    },[]);

    useEffect(() =>{
        async function getRecipesData() {

            await getRecipes(20);

        }

        getRecipesData().then();

    },[]);


    async function getRandomRecipe(){
        await getRandomRecipes(1);
    }

    async function searchRecipes(){
        await getRecipes(10);
    }

    return(
        <div className={styles['recipes-container']}>
            <Section
                background={background}
            >
                <form className={styles[`form-container`]}>
                    <div className={styles[`searchbar-container`]}>
                        <input
                            className={styles[`input-field`]}
                            type="text"
                            value={searchValue}
                            placeholder="Zoek op ingrediënten of recept"
                            name="recipe-searchbar"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button
                            type="button"
                            className={styles[`reset-button`]}
                            name="reset-button"
                            onClick={() => setSearchValue('')}
                        >
                            <img src={resetIcon} alt="searchIcon"/>
                        </button>
                        <button
                            type="button"
                            className={styles[`search-button`]}
                            name="search-button"
                            onClick={searchRecipes}
                        >
                            <img src={searchIcon} alt="searchIcon"/>
                        </button>
                    </div>
                    <div className={styles[`random-container`]}>
                        <div className={styles[`random-button-container`]}>
                            <button
                                type="button"
                                className={styles[`random-recipe-button`]}
                                name="random-recipe-button"
                                onClick={getRandomRecipe}
                            >
                                <img src={dinnerIcon} alt="dinnerIcon"/>
                                <p className={styles[`text`]}>Verras me</p>
                            </button>
                        </div>
                    </div>
                </form>
            </Section>

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