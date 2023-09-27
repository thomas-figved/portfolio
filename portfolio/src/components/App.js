import  'styles/main.scss';

import {React, useRef, useState, useEffect, useLayoutEffect} from "react";
import {Route, Routes } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";

import Nav from 'components/Nav'
import PageHome from 'components/pages/PageHome'
import PageWorks from 'components/pages/PageWorks'
import PageResume from 'components/pages/PageResume'
import PageWorkDetail from 'components/pages/PageWorkDetail'

import { SliderPicker } from 'react-color';

import { hexToComplimentary, get_svg_filter } from 'helpers';

import works from 'data/works.json'

const all_filters = retrieve_filters(works);

function retrieve_filters(works) {
  let filters = [];

  works.forEach(function (work){
    filters = filters.concat(work.categories);
  });
  let uniqueFilters = [...new Set(filters)];

  return uniqueFilters;
}

function App() {

  const actionContentRef = useRef();
  const actionResponse = useRef();
  const [sliderPickerColor, setSliderPickerColor] = useState("#835eec");


  useEffect(function(){
    //read cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("themeColor="))
      ?.split("=")[1];

    if(cookieValue !== undefined) {
      setSliderPickerColor(cookieValue);
    }
  }, [])


  useLayoutEffect(() => {
    const complementary = hexToComplimentary(sliderPickerColor);

    let r = document.querySelector(':root');
    r.style.setProperty('--primary-color', sliderPickerColor);
    r.style.setProperty('--secondary-color', complementary);
    r.style.setProperty('--washed-primary-color', sliderPickerColor + "94");
    r.style.setProperty('--svg-primary-filter', get_svg_filter(sliderPickerColor));
    r.style.setProperty('--svg-secondary-filter', get_svg_filter(complementary));

  }, [sliderPickerColor]);


  const handleShowAction = function(e) {
    e.preventDefault();

    actionContentRef.current.classList.toggle('action__content--open');
  }

  const handleReset = function(e) {
    setSliderPickerColor("#835eec");
  }

  const handleColorChange = function(color, e) {
    setSliderPickerColor(color.hex);
  }

  const handleRandomColor = function(e) {
    let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    setSliderPickerColor(randomColor);
  }

  const handleSaveColor = function(e) {
    var domainName = window.location.hostname;
    document.cookie = `themeColor=${sliderPickerColor};max-age=604800;domain=${domainName}`;

    actionResponse.current.classList.add('action__response--show');

    setTimeout(() => {
      actionResponse.current.classList.remove('action__response--show');
    }, "1500");

  }


  return (
    <div className="app">
      <header className="header">
        <Nav/>
      </header>
      <main className="page-wrap">
        <Routes>
          <Route element={<PageHome/>} path="/"/>
          <Route element={<PageResume/>} path="resume"/>
          <Route element={<PageWorks works={works} filters={all_filters}/>} path="works"/>
          <Route element={<PageWorkDetail works={works}/>} path="works/:id"/>
        </Routes>
      </main>

      <div className="action">
        <div className="action__wrap">
          <button className="action__button" onClick={handleShowAction}>
            <i className="fa-solid fa-palette"></i>
          </button>

          <div className="action__content" ref={actionContentRef}>
            <div className="action__slider-picker">
                <SliderPicker
                  color={sliderPickerColor}
                  onChange={handleColorChange}
                />
            </div>
            <div className="action__button-row">
              <button className="button button--small" onClick={handleReset}>
                <i className="fa-solid fa-rotate-left"></i>
              </button>

              <button className="button button--small" onClick={handleRandomColor}>
                <i className="fa-solid fa-shuffle"></i>
              </button>

              <button className="button button--small" onClick={handleSaveColor}>
                <i className="fa-regular fa-floppy-disk"></i>
              </button>

              <div className="action__response" ref={actionResponse}>
                Saved !
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop/>
    </div>
  );
}

export default App;
