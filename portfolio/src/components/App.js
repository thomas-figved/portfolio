import  'styles/main.scss';

import {React, useRef} from "react";
import {Route, Routes } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";

import Nav from 'components/Nav'
import PageHome from 'components/pages/PageHome'
import PageWorks from 'components/pages/PageWorks'
import PageResume from 'components/pages/PageResume'
import PageWorkDetail from 'components/pages/PageWorkDetail'

// import { get_theme_vars } from 'helpers';

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

  const actionListRef = useRef();
  const colorInput = useRef();

  const handleToggleThemeList = function(e) {
    e.preventDefault();

    actionListRef.current.classList.toggle('action__list--open');
  }

  const handleSubmit = function(e){
    e.preventDefault();

    const color_val = colorInput.current.value;
    const complementary = hexToComplimentary(color_val);

    let r = document.querySelector(':root');
    r.style.setProperty('--primary-color', color_val);
    r.style.setProperty('--secondary-color', complementary);
    r.style.setProperty('--washed-primary-color', color_val + "94");
    r.style.setProperty('--svg-primary-filter', get_svg_filter(color_val));
    r.style.setProperty('--svg-secondary-filter', get_svg_filter(complementary));
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
          <button className="action__button" onClick={handleToggleThemeList}>
            <i className="fa-solid fa-palette"></i>
          </button>

          <ul className="action__list" ref={actionListRef}>
            <li className="action__item">
              <form onSubmit={handleSubmit}>
                <input type="text" ref={colorInput} />
              </form>
            </li>
            {/* <li className="action__item">
              Connect on <a rel="noreferrer" href="https://www.linkedin.com/in/thomas-figved-0056b62b/" target="_blank" className='link'><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
            </li>
            <li className="action__item">
              Download my <a rel="noreferrer" href="/" target="_blank" className='link'><i className="fa-solid fa-file-pdf"></i> resume as PDF</a>
            </li>
            <li className="action__item">
              Read some of <a rel="noreferrer" href="https://github.com/thomas-figved" target="_blank" className='link'><i className="fa-brands fa-github"></i> code on GitHub</a>
            </li>
            <li className="action__item">
            Check <a rel="noreferrer" href="https://github.com/thomas-figved/portfolio" target="_blank" className='link'><i className="fa-brands fa-github"></i> this portfolio's code</a>
            </li> */}
          </ul>
        </div>
      </div>


      {/* <div className="theme-switcher">
        <button className="theme-switcher__button" onClick={handleSwitchTheme} data-theme="original">
          Original
        </button>
        <button className="theme-switcher__button" onClick={handleSwitchTheme} data-theme="fancy">
          Fancy
        </button>
      </div> */}
      <ScrollToTop/>
    </div>
  );
}

export default App;
