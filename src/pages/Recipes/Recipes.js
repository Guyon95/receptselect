import Section from "../../components/Section/Section";
import searchIcon from "../../assets/magnifying-glass-3-64.png";
import styles from "../../pages/Recipes/Recipes.module.css";
import background from "../../assets/salmon-with-ingredients-table.jpg"
import dinnerIcon from "../../assets/dinner.png"


function Recipes(){

    function getRandomRecipe(){
        console.log("pannenkoeken");
    }

    function searchRecipes(){
        console.log("Ik ben aan het zoeken.....");
    }


    return(
        <Section
            background={background}
        >
            <form className={styles[`form-container`]}>
                <div className={styles[`searchbar-container`]}>
                    <input
                        className={styles[`input-field`]}
                        type="text"
                        placeholder="Zoek op ingrediënten of recept"
                        name="recipe-searchbar"
                    />
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
                    <button
                        type="button"
                        className={styles[`random-recipe-button`]}
                        name="random-recipe-button"
                        onClick={getRandomRecipe}
                    >
                        <img src={dinnerIcon} alt="dinnerIcon"/>
                        <p>Verras me</p>
                    </button>
                </div>
            </form>
        </Section>

    );
}

export default Recipes;