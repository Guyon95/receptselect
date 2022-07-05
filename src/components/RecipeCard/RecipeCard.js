import styles from "./RecipeCard.module.css"
import {useHistory} from "react-router-dom";

function RecipeCard({data, countPerson}){
    const history = useHistory();

    return(
        <button className={styles[`recipe-card`]}
            onClick={() => history.push(`/recipe/${data.id}`, {countPerson})}
        >
            {data &&
                <>
                    <img className={styles[`img`]}
                        alt="Afbeelding eten"
                        src={data.image}
                    />
                    <h4 className={styles[`recipe-title`]}>{data.title}</h4>
                </>
            }
        </button>
    );
}

export default RecipeCard;