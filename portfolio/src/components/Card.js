import {React} from "react";
import { NavLink } from "react-router-dom";

function Card(props) {
  return (
    <NavLink 
      to={props.id} 
      className={`card ${props.color}`}
    >
      test {props.categ.join(' ')}
    </NavLink>
  );
}

export default Card