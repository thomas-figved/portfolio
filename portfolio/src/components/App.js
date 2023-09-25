import  'styles/main.scss';

import {React} from "react";
import {Route, Routes } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";

import Nav from 'components/Nav'
import PageHome from 'components/pages/PageHome'
import PageWorks from 'components/pages/PageWorks'
import PageResume from 'components/pages/PageResume'
import PageWorkDetail from 'components/pages/PageWorkDetail'


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
  return (
    <>
      <header className="header">
        <div className="header__presentation">
          <h1 className="header__title">
            Thomas Figved
          </h1>
          <div className="header__subtitle">
            Web Developer
          </div>
        </div>
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
      <footer className="footer">
        <nav className="footer__nav">
          <ul className="footer__list">
            <li className="footer__item">
              Connect on <a rel="noreferrer" href="https://www.linkedin.com/in/thomas-figved-0056b62b/" target="_blank" className='link'><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
            </li>
            <li className="footer__item">
              Download my <a rel="noreferrer" href="/" target="_blank" className='link'><i className="fa-solid fa-file-pdf"></i> resume as PDF</a>
            </li>
            <li className="footer__item">
              Read some of <a rel="noreferrer" href="https://github.com/thomas-figved" target="_blank" className='link'><i className="fa-brands fa-github"></i> code on GitHub</a>
            </li>
            <li className="footer__item">
              Check <a rel="noreferrer" href="https://github.com/thomas-figved/portfolio" target="_blank" className='link'><i className="fa-brands fa-github"></i> this portfolio's code</a>
            </li>
          </ul>
        </nav>
      </footer>
      <ScrollToTop/>
    </>
  );
}

export default App;
