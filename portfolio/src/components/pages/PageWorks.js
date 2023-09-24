import {React, useState, useRef, useLayoutEffect} from "react";

import Card from "components/Card";
import { get_cat_name } from "helpers";

import { gsap } from 'gsap';

function PageWorks(props) {

  const [filteredWorks, setFilteredWorks] = useState(props.works);
  const [activeFilters, setActiveFilters] = useState([]);
  const [alreadyAnimated, setAlreadyAnimated] = useState(false);

  const animation_trigger = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const cover_items = self.selector('.cover-anim');

      let cover_timeline = gsap.timeline({
        onComplete: function(){
          setAlreadyAnimated(true);
        }
      });

      cover_items.forEach(function(item){
        cover_timeline.to(item, 
        {
          delay: 0,
          duration: 0.3,
          onEnd() {
            this.targets()[0].classList.add('cover-anim--animate');
          },
        }, '<30%');
      })

    }, animation_trigger); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);


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
      <div className="page-wrap__filter-txt">
        Filter by categories:
      </div>
      <div className="page-wrap__filter">
        { props.filters.map(function(filter, i) {
            return (
              <button className="filter" key={filter} onClick={filterWorks} data-filter={filter}>
                {get_cat_name(filter)}
              </button>
            )
          })
        }
      </div>
      <div className="page-wrap__card" ref={animation_trigger}>
        { filteredWorks.map(function(work, i) {
            return (<Card key={work.work_id} id={`${work.work_id}`} work={work} alreadyAnimated={alreadyAnimated}/>)
          })
        }
      </div>
    </>
  );
}

export default PageWorks;