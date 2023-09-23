import {React, useState} from "react";

import Card from "components/Card";

function PageWorks(props) {

  const colors = ["card--red", "card--blue", "card--green"];

  const [filteredWorks, setFilteredWorks] = useState(props.works);
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = function(filtersArray, filterValue) {
    var filterValueIndex = filtersArray.indexOf(filterValue);
    if(filterValueIndex !== -1) {
      //Filter is already active -> we deactivate it
      filtersArray.splice(filterValueIndex, 1);
    } else {
      //Filter is not active -> we activate it
      filtersArray.push(filterValue);
    }
    setActiveFilters(filtersArray);

    //Return true if the filter is currently active, false otherwise
    return filterValueIndex === -1;
  }

  const filterWorks = function(e) {
    e.preventDefault();
    let filterValue = e.target.dataset.filter;
    let is_active = toggleFilter(activeFilters, filterValue);

    if(activeFilters.length !== 0) {
      const filteredList = props.works.filter(function(work){
        return activeFilters.every((filter)=>work.categories.includes(filter));
      });

      setFilteredWorks(filteredList);
    } else {
      setFilteredWorks(props.works);
    }

    e.target.classList.toggle('filter--active', is_active);
  }


  return (
    <>
      <h2 className="title">Works</h2>

      <div className="page-wrap__filter">
        <button className="filter" onClick={filterWorks} data-filter="front">
          Front end
        </button>
        <button className="filter" onClick={filterWorks} data-filter="back">
          Back end
        </button>
        <button className="filter" onClick={filterWorks} data-filter="wp">
          Wordpress
        </button>
      </div>
      <div className="page-wrap__card">
        { filteredWorks.map(function(work, i) {
            return (<Card color={colors[i%3]} key={work.work_id} id={`${work.work_id}`} categ={work.categories}/>)
          })
        }
      </div>
    </>
  );
}

export default PageWorks;