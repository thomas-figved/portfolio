import {React} from "react";
import { NavLink } from "react-router-dom";
import Picture from "components/Picture";

import { get_cat_ico, get_cat_name } from "helpers";


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

        <div className="card__ico-wrap">

          { props.work.categories.map(function(category) {
            return (
              <i key={category} className={`card__ico ${get_cat_ico(category)}`} title={get_cat_name(category)}></i>
            )
          })}
        </div>

      </NavLink>
      </div>
    </div>
  );
}

export default Card