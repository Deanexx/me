import "./header.scss"
import { useEffect } from "react"
import Eye from "./Eye/Eye"

const Header = () => {

    return <header className="header">
        <Eye/>
        <div className="header__menu">
            <button>Listen my music</button>
            <button>My favorite game</button>
            <button>More about me</button>
        </div>
    </header>
}

export default Header;