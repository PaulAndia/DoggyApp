import { Search } from '../Search/Search';
import {Link} from 'react-router-dom';
import styles from './NavBar.module.css'
import logo from '../Images/log.png'
import gif from '../Images/G1.gif'
import  {GrMenu}  from "react-icons/gr"
import Swal from 'sweetalert2';  

export function NavBar({backHome}) {

    function modal () {
        return  Swal.fire({
            title: '<strong>Paul Andrés Andia</strong>',
            html:
              '<img style="border-radius: 90px" src="https://avatars.githubusercontent.com/u/98241120?v=4" width = "170px" height = "170px"></img> <br/> ' + 
              '<h4>Full Stack Web Developer</h4> <br/>' + 
              '<a target="_blank" href="https://www.linkedin.com/in/paulandia/"><img style="padding-right: 50px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png" width = "67px" height = "67px"></img> </a>' +
              '<a target="_blank" href="https://github.com/PaulAndia"><img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/github-square-512.png" width = "73px" height = "73px"></img></a>',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Great!',
        })
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to = "/home">
                        <img src={logo} width={"50px"} height={"50px"} alt='logo'/> 
                        <span>DOGGY APP</span>
                    <img className = {styles.gif } src={gif} width={"170px"} height={"50px"} alt='gif'/> 
                </Link>
               <button className={styles.toggle}>
                    <GrMenu/>
               </button>
               
                <ul>

                <li>
                    <button onClick={modal} >ABOUT</button>
                </li>

                <li>
                    <Link to="/home">
                        <button onClick={backHome}>HOME</button>
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