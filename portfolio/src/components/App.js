import  'styles/main.scss';

import {React} from "react";
import {Route, Routes } from "react-router-dom";
import Nav from 'components/Nav'
import PageHome from 'components/pages/PageHome'
import PageWorks from 'components/pages/PageWorks'
import PageResume from 'components/pages/PageResume'
import PageWorkDetail from 'components/pages/PageWorkDetail'


function App() {

  const cat_choices = ['front','back','wp'];

  const works = [...Array(20)].map(function(x, i){
    return {
      work_id: i+1,
      work_content: 'blablabla',
      categories: [
        cat_choices[Math.floor(Math.random() * 3)],
        cat_choices[Math.floor(Math.random() * 3)],
      ]
    }
  });

  return (
    <>
      <header className="header">
        <div className="header__presentation">
          <h1 className="header__title">
            Thomas Figved
          </h1>
          <div className="header__subtitle">
            Full Stack Developer
          </div>
        </div>
        <Nav/>
      </header>
      <main className="page-wrap">
        <Routes>
          <Route element={<PageHome/>} path="/"/>
          <Route element={<PageResume/>} path="resume"/>
          <Route element={<PageWorks works={works}/>} path="works"/>
          <Route element={<PageWorkDetail/>} path="works/:id" />
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
