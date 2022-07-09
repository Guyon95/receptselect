import styles from "./RecipeDetail.module.css"
import addIcon from "../../assets/add.png"
import minusIcon from "../../assets/minus.png"
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Label from "../../components/Label/Label";
import clock from "../../assets/four-oclock.png";
import {AuthContext} from "../../context/AuthContext";

function RecipeDetail(){
    const { id, countPerson } = useParams();
    const [countPersonPage, setCountPersonPage] = useState(2);
    const [recipeData, setRecipeData] = useState({})
    const [calorie, setCalorie] = useState({})
    const [ingredients, setIngredients] = useState([]);
    const {apiKey} = useContext(AuthContext)

    useEffect(() =>{
        setCountPersonPage(parseInt(countPerson));

        async function getData() {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                    params: {
                        apiKey: apiKey,
                        includeNutrition: true,
                    },
                    //cancelToken:source.token,
                });
                setRecipeData(response.data);

                const calorie = response.data.nutrition.nutrients.find((nutrient) => {
                    return nutrient.name === 'Calories'
                });

                setIngredients(response.data.extendedIngredients)

                //calcIngredients(response.data.extendedIngredients, response.data.servings, parseInt(countPerson))
                setCalorie(calorie);
            }
            catch (e) {
                console.log(e);
            }


        }

        getData().then();
    },[])

    function addPerson(){
        const newCountPersons = countPersonPage + 1;
        setCountPersonPage(newCountPersons)

        calcIngredients(ingredients, countPersonPage, newCountPersons);
    }

    function minusPerson(){
        const newCountPersons = countPersonPage - 1;
        setCountPersonPage(newCountPersons)

        calcIngredients(ingredients, countPersonPage, newCountPersons);
    }

    function calcIngredients(ingredients, currentCountPersons, newCountPersons){
        ingredients.map((ingredient, index) =>{
            ingredients[index].measures.metric.amount = ingredient.measures.metric.amount / currentCountPersons * newCountPersons;
        })

        setIngredients(ingredients);
    }

    return(
        <section>
            {recipeData &&
                <>
                    <section>
                        <article className={styles[`article-container`]}>
                            <div className={styles[`article-content`]}>
                                <h2>{recipeData.title}</h2>
                                <span className={styles[`logo-container`]}>
                                    <img className={styles[`clock-img`]} src={clock} alt="clock"/>
                                    <p>{recipeData.readyInMinutes} min</p>
                                </span>

                                <p>Vegatarisch: {recipeData.vegetarian ? 'Ja' : 'Nee'}</p>
                                <p>Gluten vrij: {recipeData.glutenfree ? 'Ja' : 'Nee'}</p>
                                <p>{Math.round(calorie.amount)} kcal</p>

                                {recipeData.dishTypes &&
                                    <div className={styles[`label-container`]}>
                                        {recipeData.dishTypes.map((dishType) =>{
                                            return (<Label key={dishType} value={dishType}></Label>);
                                        })}
                                    </div>
                                }
                            </div>
                            <img className={styles[`img`]} src={recipeData.image} alt="food"/>
                        </article>
                        <article className={styles[`article-container`]}>
                            <div className={styles[`ingredient-content`]}>
                                <div className={styles[`person-counter-container`]}>
                                    <p>{countPersonPage} personen</p>
                                    <button
                                        type="button"
                                        className={styles[`round-button`]}
                                        name="minus-button"
                                        disabled={countPerson === 0}
                                        onClick={minusPerson}
                                    >
                                        <img className={styles[`add-minus-icon`]} src={minusIcon} alt="minus"/>
                                    </button>
                                    <button
                                        type="button"
                                        className={styles[`round-button`]}
                                        name="add-button"
                                        disabled={countPerson === 20}
                                        onClick={addPerson}
                                    >
                                        <img className={styles[`add-minus-icon`]} src={addIcon} alt="add"/>
                                    </button>
                                </div>
                                <ul className={styles[`ingredient-list-container`]}>
                                    {recipeData.extendedIngredients &&
                                        <>
                                            {recipeData.extendedIngredients.map((ingredient, index) =>{
                                                return (
                                                    <li key={index}>{Math.round(ingredient.measures.metric.amount / recipeData.servings * countPersonPage)} {ingredient.measures.metric.unitShort} {ingredient.originalName}</li>
                                                );
                                            })}
                                        </>
                                    }

                                </ul>
                            </div>
                            <div className={styles[`food-prepare-container`]}>
                                <h2>Bereidingswijze</h2>
                                <ul className={styles[`list-container`]}>
                                    {recipeData.analyzedInstructions &&
                                        <>
                                        {recipeData.analyzedInstructions.length ?
                                            recipeData.analyzedInstructions[0].steps.map((step) => {
                                                return (
                                                    <li className={styles[`listStyle`]} key={step.number}>{step.step}</li>
                                                )
                                            }) :
                                            <p>Unfortunately! We couldn't find any instructions</p>}
                                        </>
                                    }

                                </ul>
                            </div>
                        </article>
                    </section>
                </>
            }
        </section>

    );
}

export default RecipeDetail;