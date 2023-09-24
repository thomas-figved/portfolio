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
            Senior Web Developer
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
              Connect on <a href="/" className='footer__link'>LinkedIn</a>
            </li>
            <li className="footer__item">
              Download my <a href="/" className='footer__link'>resume as PDF</a>
            </li>
            <li className="footer__item">
              Read some of <a href="/" className='footer__link'>code on GitHub</a>
            </li>
            <li className="footer__item">
              Check <a href="/" className='footer__link'>this portfolio code</a>
            </li>
          </ul>
        </nav>
      </footer>
      <ScrollToTop/>
    </>
  );
}

export default App;
