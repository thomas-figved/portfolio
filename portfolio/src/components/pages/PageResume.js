import {React, useLayoutEffect, useRef, useState, useEffect} from "react";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function PageResume() {

  const timelineRef = useRef();
  const skillsRef = useRef();

  const [screenSize, setScreenSize] = useState(window.screen.width);

  useEffect(()=>{
    window.addEventListener('resize', () => {
      setScreenSize(window.screen.width);
    });
  },[setScreenSize]);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const skillsWraps = self.selector('.skills__wrap');

      skillsWraps.forEach((wrap, idx)=>{

        let anim_timeline = gsap.timeline();
        let skillsItems = wrap.querySelectorAll(".skills__item");


        skillsItems.forEach(function(item){
          anim_timeline.from(item, 
          {
            opacity: 0,
            y: 30,
            duration: 0.3,
          }, '<40%');
        })
      });
    }, skillsRef); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  },[]);



  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {

      const points= self.selector('.timeline__point');
      points.forEach((item) => {
        gsap.to(item, {
          duration: 1,
          onStart: function(){
            item.classList.add('timeline__point--animate')
          },
          scrollTrigger: {
            trigger: item,
            start: function(){
              if(screenSize < 780) {
                return "top 40%";
              }else {
                return "top 70%";
              }
            },
          },
        });
      });

    }, timelineRef); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, [screenSize]);


  return (

    <>
      <div className="page-wrap__title">
        <h1 className="title">Resume</h1>
      </div>

      <div className="page-wrap__subtitle">
        <h2 className="subtitle">Techs</h2>
      </div>

      <div className="skills" ref={skillsRef}>
        <div className="skills__section">
          <h2 className="skills__section-header">
            Frontend
          </h2>

          <div className="skills__wrap">
            <div className="skills__item">
              <i className="fa-brands fa-square-js"></i> JavaScript
            </div>
            <div className="skills__item">
              <i className="fa-brands fa-react"></i> React.js
            </div>
            <div className="skills__item">
              <i className="ico ico--gsap"></i> GSAP
            </div>
            <div className="skills__item">
              <i className="ico ico--jquery"></i> jQuery
            </div>
            <div className="skills__item">
              <i className="fa-brands fa-sass"></i> SASS
            </div>
          </div>
        </div>

        <div className="skills__section">
          <h2 className="skills__section-header">
            Backend
          </h2>

          <div className="skills__wrap">
            <div className="skills__item">
              <i className="fa-brands fa-php"></i> PHP
            </div>
            <div className="skills__item">
             <i className="fa-brands fa-wordpress"></i> WordPress
            </div>
            <div className="skills__item">
              <i className="fa-brands fa-python"></i> Python
            </div>
            <div className="skills__item">
            <i className="ico ico--django"></i> Django
            </div>
            <div className="skills__item">
              <i className="fa-solid fa-database"></i> SQL
            </div>
          </div>
          
        </div>
      </div>

      <div className="page-wrap__subtitle">
        <h2 className="subtitle"> <i className="fa-solid fa-language"></i> Languages</h2>
      </div>

      <div className="page-wrap__extra-skills">
        <div className="extra-skills">
            <div className="extra-skills__item">
              <img src={require('images/fr.png')} alt="" className="extra-skills__flag" /> French <span className="extra-skills__item--small">(native)</span>
            </div>
            <div className="extra-skills__item">
              <img src={require('images/uk.png')} alt="" className="extra-skills__flag" /> English <span className="extra-skills__item--small">(full working proficiency)</span>
            </div>
            <div className="extra-skills__item">
              <img src={require('images/jp.png')} alt="" className="extra-skills__flag" /> Japanese <span className="extra-skills__item--small">(intermediary level, JLPT N3)</span>
            </div>
            <div className="extra-skills__item">
              <img src={require('images/it.png')}alt="" className="extra-skills__flag" /> Italian <span className="extra-skills__item--small">(notions)</span>
            </div>
          </div>
      </div>


      <div className="page-wrap__subtitle">
        <h2 className="subtitle">Work & Education</h2>
      </div>

      <div className="timeline" ref={timelineRef}>
        <div className="timeline__scroll">
          Scroll ↓
        </div>
        <div className="timeline__line"></div>

        <div className="timeline__point">
          <div className="timeline__wrap">
            <div className="timeline__year">Today</div>
            <div className="timeline__content">
              Looking to open a new chapter of my career in a different corner of the world.
            </div>
          </div>
        </div>
        <div className="timeline__point">
          <div className="timeline__wrap">
            <div className="timeline__year">from 2019</div>
            <h2 className="timeline__title">
              Web developer at Matoi Creative
            </h2>
            <div className="timeline__content">
              Creating websites from markup to delivery. Mostly creating bespoke WordPress themes with a strong accent on the frontend. Worked on over 30 projects of different sizes, from single static pages to bigger projects with multiple WordPress instances.
              As part of a small team I had to work in almost complete autonomy. Had to tackle various technical challenges which range from coding to security to 3D modeling.
            </div>
            <div className="timeline__language">
              Language: <img src={require('images/jp.png')} alt="" className="timeline__flag" /><br/>
              Location: <img src={require('images/jp.png')} alt="" className="timeline__flag" />
            </div>
          </div>
        </div>

        <div className="timeline__point">
          <div className="timeline__wrap">
            <div className="timeline__year">2014 to 2019</div>
            <h2 className="timeline__title">
              Web developer at Netwise
            </h2>
            <div className="timeline__content">
              Developing and maintaining websites based on CodeIgniter, WordPress, Joomla and Magento. Handling front and backend development from design reception to website/feature delivery. Setting up servers with AWS EC2 and migrating websites. Coding and testing newsletters. Content management and EC site support.
            </div>
            <div className="timeline__language">
              Language: <img src={require('images/uk.png')} alt="" className="timeline__flag" /><br/>
              Location: <img src={require('images/jp.png')} alt="" className="timeline__flag" />
            </div>
          </div>
        </div>

        <div className="timeline__point">
          <div className="timeline__wrap">
            <div className="timeline__year">2008 to 2013</div>
            <h2 className="timeline__title">
              Software developer at HD Media
            </h2>
            <div className="timeline__content">
              Developing and maintaining a web platform to manage virtual tours (360° pictures). Developing and maintaining a web-based ERP/CRM tool for our sales partners. Customer support. Manual image corrections with Gimp.
            </div>
            <div className="timeline__language">
              Language: <img src={require('images/fr.png')} alt="" className="timeline__flag" /><br/>
              Location: <img src={require('images/fr.png')} alt="" className="timeline__flag" />
            </div>
          </div>
        </div>

        <div className="timeline__point">
          <div className="timeline__wrap">
            <div className="timeline__year">2009 to 2011</div>
            <h2 className="timeline__title">
              <i className="fa-solid fa-user-graduate"></i> Bachelor's degree in Computer Science at Sup2i <span className="timeline__title--smaller">(Titre RNCP Concepteur développeur informatique)</span>
            </h2>
            <div className="timeline__content">
              In apprenticeship at HDMedia <br />
              Learning web development, OOP, C#, Java
            </div>
          </div>
        </div>

        <div className="timeline__point">
          <div className="timeline__wrap">
            <div className="timeline__year">2007 to 2009</div>
            <h2 className="timeline__title">
              <i className="fa-solid fa-user-graduate"></i> Level 5 degree in Computer Science at Sup2i <span className="timeline__title--smaller">(BTS informatique de gestion)</span>
            </h2>
            <div className="timeline__content">
              Including one year in apprenticeship at HDMedia <br />
              Learning algorithmics, relational database design, SQL , C, networks...
            </div>
          </div>
        </div>
      </div>

      <div className="page-wrap__subtitle">
        <h2 className="subtitle">Online classes and certifications</h2>
      </div>

      <div className="page-wrap__extra-skills">
        <div className="extra-skills">
            <div className="extra-skills__item">
              <Link target="_blank" to="https://www.credly.com/badges/9795f977-e019-4187-8e8c-4ad6dbf58d0b/linked_in_profile" className="link link--no-deco">Meta Back-End Developer Certificate <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
            </div>
            <div className="extra-skills__item">
              <Link target="_blank" to="https://www.credly.com/badges/66236373-f7ef-4142-9a30-7484b4463ca6/linked_in_profile" className="link link--no-deco">Meta Front-End Developer Certificate <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
            </div>

            <div className="extra-skills__item">
              Google Analytics Individual Qualification (2019)
            </div>
            <div className="extra-skills__item">
              Machine learning
            </div>
            <div className="extra-skills__item">
              Gamification
            </div>
          </div>
      </div>

      <div className="page-wrap__button">
        <Link rel="noreferrer" to="https://www.linkedin.com/in/thomas-figved-0056b62b/" target="_blank" className='button button--cta'>
          Get in touch
        </Link>
      </div>
    </>
  );
}
export default PageResume;