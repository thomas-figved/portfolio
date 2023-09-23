import  'styles/main.scss';

import {React} from "react";
import {Route, Routes } from "react-router-dom";
import Nav from 'components/Nav'
import PageHome from 'components/pages/PageHome'
import PageWorks from 'components/pages/PageWorks'
import PageResume from 'components/pages/PageResume'


function App() {
  return (
    <>
      <header className="header">
        <div className="header__presentation">
          <h1 className="header__title">
            Thomas Figved
          </h1>
          <h2 className="header__subtitle">
            Full Stack Developer
          </h2>
        </div>
        <Nav/>
      </header>
      <main className="page-wrap">
        <Routes>
          <Route element={<PageHome/>} path="/"/>
          <Route element={<PageResume/>} path="/resume"/>
          <Route element={<PageWorks/>} path="/works"/>
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
              Read some of <a href="/" className='footer__link'>my code on GitHub</a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default App;
