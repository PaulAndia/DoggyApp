import styles from "./CardsHome.module.css"
import { Link } from "react-router-dom";

export function CardsHome({dogsShown}) {
    return (
            <ul className={styles.grid}>
                {dogsShown.map(dog => (
                    <li key={dog.id} className={styles.cards}>
                        <Link to={`/dogs/${dog.id}`}>
                            <h3><strong>{dog.name.toUpperCase()}</strong></h3>
                                <br/>
                                <img src={dog.image} alt={dog.name}
                                width={160} height={160}
                                onError={e => {
                                    e.target.onerror = null;
                                    e.target.src = "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ce8b1e76965389.5c7945b0cffef.gif";    
                                }}/>
                                <p><strong>Temperaments:</strong> <br/>{dog.temperaments}</p>
                                <p><strong>Weight:</strong> <br/>{dog.weight} Kg.</p>
                        </Link>
                    </li>
                ))}
            </ul>
    )
}
