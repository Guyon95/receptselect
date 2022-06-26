import Section from "../../components/Section/Section";
import searchIcon from "../../assets/magnifying-glass-3-64.png";
import styles from "../../pages/Recipes/Recipes.module.css";
import background from "../../assets/salmon-with-ingredients-table.jpg"
import dinnerIcon from "../../assets/dinner.png"


function Recipes(){
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
                        className={styles[`search-button`]}
                        name="Zoeken"
                        onClick={() => console.log("Ik zoek nu......")}
                    ><img className={styles[``]} src={searchIcon} alt="searchIcon"/></button>
                </div>
                <div className={styles[`random-container`]}>
                    <button className={styles[`random-recipe-button`]}><img className={styles[``]} src={dinnerIcon} alt="dinnerIcon"/><p>Verras me</p></button>
                </div>
            </form>
        </Section>

    );
}

export default Recipes;