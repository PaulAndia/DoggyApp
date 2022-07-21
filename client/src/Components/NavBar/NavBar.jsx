import { Search } from '../Search/Search';
import {Link} from 'react-router-dom';
import styles from './NavBar.module.css'
import logo from '../Images/log.png'
import  {GrMenu}  from "react-icons/gr"

export function NavBar({backHome}) {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to = "/home">
                        <img src={logo} width={"50px"} height={"50px"} alt='logo'/> 
                <       span>DOGGY APP</span>
                </Link>
               <button className={styles.toggle}>
                    <GrMenu/>
               </button>
               
                <ul>
                <li>
                    <Link to="/home">
                        <button onClick={backHome}>HOME</button>
                    </Link>
                </li>

                <li>
                    <Link to="/temperaments">
                        <button onClick={backHome}>TEMPERAMENTS</button>
                    </Link>
                </li>

                <li>
                    <Link to="/dog">
                        <a className = {styles.add }href={"/dog"}> +ADD DOG</a>
                    </Link>
                </li>

                <li>
                    <Search/>
                </li>

                </ul>
            </nav>
        </header>
    )
}