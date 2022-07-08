import styles from "./RecipeDetail.module.css"
import food from "../../assets/juicy-steak-medium-rare-beef-with-spices-grilled-vegetables.jpg"
import addIcon from "../../assets/add.png"
import minusIcon from "../../assets/minus.png"
import {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Label from "../../components/Label/Label";
import clock from "../../assets/four-oclock.png";

function RecipeDetail(){
    const { id, countPerson } = useParams();
    const [countPersonPage, setCountPerson] = useState(2);
    const [recipeData, setRecipeData] = useState({})
    const [calorie, setCalorie] = useState({})





    useEffect(() =>{
        setCountPerson(countPerson);

        async function getData() {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                    params: {
                        apiKey: '3755023c41ec48de9cb4752756b64fe4',
                        includeNutrition: true,
                    },
                    //cancelToken:source.token,
                });
                setRecipeData(response.data);

                const calorie = response.data.nutrition.nutrients.find((nutrient) => {
                    return nutrient.name === 'Calories'
                });

                setCalorie(calorie);
            }
            catch (e) {
                console.log(e);
            }


        }

        getData().then();
    },[])




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
                                        onClick={() => setCountPerson(countPersonPage - 1)}
                                    >
                                        <img className={styles[`add-minus-icon`]} src={minusIcon} alt="minus"/>
                                    </button>
                                    <button
                                        type="button"
                                        className={styles[`round-button`]}
                                        name="add-button"
                                        disabled={countPerson === 20}
                                        onClick={() => setCountPerson(parseInt(countPersonPage) + 1)}
                                    >
                                        <img className={styles[`add-minus-icon`]} src={addIcon} alt="add"/>
                                    </button>
                                </div>
                                <ul className={styles[`ingredient-list-container`]}>
                                    {recipeData.extendedIngredients &&
                                        <>
                                        {recipeData.extendedIngredients.map((ingredient) =>{
                                            return (<li key={ingredient.id}>{ingredient.original}</li>);
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
                                            {recipeData.analyzedInstructions[0].steps.map((step) => {
                                                return (
                                                    <li key={step.number}>{step.step}</li>
                                                )
                                            })}
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