import './Header.css'
import { NavLink } from "react-router-dom";


export default function Header() {
  return (
    <header>
      <h1>NASA Images</h1><br/>
      <nav>
        <NavLink to="/image">Image</NavLink> | <NavLink to="/satellites">Orbiting Objects</NavLink>
      </nav>
    </header>
  )
}
