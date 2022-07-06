import styles from "./RecipeDetail.module.css"
import food from "../../assets/juicy-steak-medium-rare-beef-with-spices-grilled-vegetables.jpg"
import addIcon from "../../assets/add.png"
import minusIcon from "../../assets/minus.png"
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function RecipeDetail(){
    const location = useLocation();
    const [countPerson, setCountPerson] = useState(2);


    useEffect(() =>{
        if (location.state !== {}) {
            setCountPerson(location.state.countPerson);
        }
    },[])



    return(
        <>
            <section>
                <article className={styles[`article-container`]}>
                    <div className={styles[`article-content`]}>
                        <h2>Titel</h2>
                        <p>Bereidingstijd:</p>
                        <p>soortkeuken</p>
                        <p>soortGerecht</p>
                    </div>
                    <img className={styles[`img`]} src={food} alt="food"/>
                </article>
                <article className={styles[`article-container`]}>
                    <div className={styles[`ingredient-content`]}>
                        <div className={styles[`person-counter-container`]}>
                            <p>{countPerson} personen</p>
                            <button
                                type="button"
                                className={styles[`round-button`]}
                                name="minus-button"
                                disabled={countPerson === 0}
                                onClick={() => setCountPerson(countPerson - 1)}
                            >
                                <img className={styles[`add-minus-icon`]} src={minusIcon} alt="minus"/>
                            </button>
                            <button
                                type="button"
                                className={styles[`round-button`]}
                                name="add-button"
                                disabled={countPerson === 20}
                                onClick={() => setCountPerson(parseInt(countPerson) + 1)}
                            >
                                <img className={styles[`add-minus-icon`]} src={addIcon} alt="add"/>
                            </button>
                        </div>
                        <ul className={styles[`list-container`]}>
                            <li>....</li>
                            <li>....</li>
                            <li>....</li>
                            <li>....</li>
                            <li>....</li>
                            <li>....</li>
                            <li>....</li>
                            <li>etc...</li>

                        </ul>
                    </div>
                    <div className={styles[`food-prepare-container`]}>
                        <h2>Bereidingswijze</h2>
                        <ul className={styles[`list-container`]}>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, illum!</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, rem!</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum dolorem harum non, provident rem saepe sunt unde. Deleniti dolores eius modi nostrum quod tenetur. A at cum cumque, dolores facere hic illo illum non, nostrum obcaecati, quas quia sequi.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat fugit impedit iste iure quisquam? Doloribus eligendi facilis illo nihil odit!</li>

                        </ul>
                    </div>
                </article>
            </section>
        </>

    );
}

export default RecipeDetail;