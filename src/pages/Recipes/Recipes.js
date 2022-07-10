import {useLocation} from 'react-router-dom';
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

    const [buttonClicks, setButtonClicks] = useState(0);
    const [randomButtonClicks, setRandomButtonClicks] = useState(0);

    useEffect(() => {
        if (location.state !== undefined) {
            setParams({
                minSugar: location.state.params.minSugar,
                maxSugar: location.state.params.maxSugar,
                maxReadyTime: location.state.params.maxReadyTime
            });
            setCountPerson(location.state.personCount);
        }

        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getRandomRecipes(number) {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
                    params: {
                        apiKey: apiKey,
                        type: 'main course',
                        instructionsRequired: true,
                        number: number,
                    },
                    cancelToken: source.token,
                });

                setRecipes(response.data.recipes);
            } catch (e) {
                console.log(e);
            }
        }

        getRandomRecipes(1).then();

        return function cleanup() {
            source.cancel();
        }

        // eslint-disable-next-line
    }, [randomButtonClicks])

    useEffect(() =>{
        const source = axios.CancelToken.source();

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
                    cancelToken:source.token,
                });

                setRecipes(response.data.results);
            }catch (e) {
                console.log(e);
            }
        }

        getRecipes(20).then();

        return function cleanup() {
            source.cancel();
        }


        // eslint-disable-next-line
    },[buttonClicks]);


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
                            placeholder="Search by ingredients or recipe. (Comma separated)"
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
                            onClick={() => setButtonClicks(buttonClicks + 1)}
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
                                onClick={() => setRandomButtonClicks(randomButtonClicks + 1)}
                            >
                                <img src={dinnerIcon} alt="dinnerIcon"/>
                                <p className={styles[`text`]}>Suprise me</p>
                            </button>
                        </div>
                    </div>
                </form>
            </Section>

            {recipes &&
            <>
                {recipes.length ?
                    recipes && recipes.map((recipe) => {
                        return <RecipeCard key={recipe.id} data={recipe} countPerson={countPerson} />
                    }) :

                    <h2>Unfortunately! We couldn't find any recipes</h2>
                }
            </>

            }
        </div>

    );
}

export default Recipes;