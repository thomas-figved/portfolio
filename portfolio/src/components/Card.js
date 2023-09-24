import {React} from "react";
import { NavLink } from "react-router-dom";
//import parse from 'html-react-parser';
import Picture from "components/Picture";

function Card(props) {
  return (
    <div className={props.alreadyAnimated ? "cover-anim cover-anim--animate" : "cover-anim"}>
      <div className="cover-anim__cover"></div>
      <div className="cover-anim__wrap">
        <NavLink 
        to={props.id} 
        className="card"
      >
        <Picture className="card__bg" folder={props.work.folder} filename={props.work.folder}/>
        <h3 className="card__title">
          {props.work.title}
        </h3>
      </NavLink>
      </div>
    </div>
  );
}

export default Card