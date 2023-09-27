import {React, useState, useRef, useLayoutEffect, useEffect} from "react";

import Card from "components/Card";
import { get_cat_name, get_cat_ico } from "helpers";

import { gsap } from 'gsap';
import password from "data/password.json";

function PageWorks(props) {

  const [filteredWorks, setFilteredWorks] = useState(props.works);
  const [activeFilters, setActiveFilters] = useState([]);
  const [alreadyAnimated, setAlreadyAnimated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const animation_trigger = useRef();
  const password_input = useRef();
  const filterList = useRef();


  useLayoutEffect(() => {
    if(isLoggedIn) {
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
          }, '<40%');
        })

      }, animation_trigger); // <- Scope!
      return () => ctx.revert(); // <- Cleanup!
    }
  }, [isLoggedIn]);


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

    let filterValue = e.currentTarget.dataset.filter;
    let is_active = toggleFilter(activeFilters, filterValue);

    if(activeFilters.length !== 0) {
      const filteredList = props.works.filter(function(work){
        return activeFilters.every((filter)=>work.categories.includes(filter));
      });

      setFilteredWorks(filteredList);
    } else {
      setFilteredWorks(props.works);
    }

    e.currentTarget.classList.toggle('filter--active', is_active);
  }

  useEffect(function(){
    //read cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("password="))
      ?.split("=")[1];
    if(cookieValue === password.password) {
      setIsLoggedIn(true);
    }
  }, [])

  const displayError = function(msg) {
    document.querySelector('.login__error').textContent = msg;
  }

  const verifyPassword = function(e) {
    e.preventDefault();

    const is_input_valid = password_input.current.checkValidity();

    if(is_input_valid) {
      const input_val = password_input.current.value;

      if(input_val === password.password) {
        var domainName = window.location.hostname;
        document.cookie = `password=${input_val};max-age=604800;domain=${domainName}`
        setIsLoggedIn(true);
      } else {
        displayError("Wrong password");
      }
    } else {
      displayError("Please enter a password");
    }
  }

  const handleToggleShowFilters = function(e) {
    e.preventDefault()

    e.currentTarget.classList.toggle('button--active');
    filterList.current.classList.toggle('page-wrap__filter--open');
  }


  return (
    <>

      {!isLoggedIn &&
        <form className="login">
          <label htmlFor="pwd" className="login__label">Enter password:</label>

          <div className="login__row">
            <input type="password" className="login__input" ref={password_input} id="pwd" required/>
            <div className="login__button">
              <button className="button" onClick={verifyPassword} type="submit">Login</button>
            </div>
          </div>

          <div className="login__error"></div>
        </form>
      }

      {isLoggedIn &&
        <>
          <div className="page-wrap__filter-button">
            <button className="page-wrap__filter-button button" onClick={handleToggleShowFilters}>
              <i className="fa-solid fa-filter"></i> Filter by tech / work
            </button>
          </div>


          <div className="page-wrap__filter" ref={filterList}>
            { props.filters.map(function(filter, i) {
                return (
                  <button className="filter" key={filter} onClick={filterWorks} data-filter={filter}>
                    <i className={`filter__ico ${get_cat_ico(filter)}`}></i>
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
      }
    </>
  );
}

export default PageWorks;