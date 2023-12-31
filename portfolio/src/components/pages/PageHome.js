import {React, useRef, useLayoutEffect} from "react";
import { Link } from "react-router-dom";

import { gsap } from 'gsap';


function PageHome() {

  const animation_ctx = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const title = self.selector('.about__title');
      const traits = self.selector('.about__traits');
      const content = self.selector('.about__content');
      const button = self.selector('.about__button');
      const list = self.selector('.about__list');


      let anim_timeline = gsap.timeline();

      anim_timeline.from(title,
      {
        opacity:0,
        duration: 0.5,
      });

      anim_timeline.from(traits,
      {
        x: -50,
        opacity:0,
        duration: 0.3,
        delay: 0.2,
      });

      anim_timeline.from(content,
      {
        y: 50,
        opacity:0,
        duration: 0.3,
        delay: 0.2,
      });

      anim_timeline.from(button,
      {
        y: 50,
        opacity:0,
        duration: 0.3,
        delay: 0.2,
      });

      anim_timeline.from(list,
      {
        y: 50,
        opacity:0,
        duration: 0.3,
      });

    }, animation_ctx); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);

  return (
    <div className="page-wrap__about">
      <div className="about" ref={animation_ctx}>
        <h1 className="about__title">
          Hi, I'm Thomas.
        </h1>
        <div className="about__traits">
          Here is what I can bring to your project:

          <dl className="about__desc-list">
            <dt className="about__desc-list-term">Experience:</dt>
            <dd className="about__desc-list-desc">I have been in the industry for about 15 years.</dd>
            <dt className="about__desc-list-term">Versatility:</dt>
            <dd className="about__desc-list-desc">Accustomed to wearing multiple hats.</dd>
            <dt className="about__desc-list-term">Autonomy and team play:</dt>
            <dd className="about__desc-list-desc">I work well in a team but am also used to getting things done on my own.</dd>
            <dt className="about__desc-list-term">A multicultural mindset:</dt>
            <dd className="about__desc-list-desc">Worked in EN, JA and FR environments.</dd>
          </dl>

        </div>
        <div className="about__content">
          Originally from France and currently based in Japan, I'm looking for new opportunities in London. Take a peek at my portfolio to see <Link to="works" className="link">some of my work</Link>, or have an overview of my <Link to="resume" className="link">15 years of experience</Link>.
          Let's connect and create something great together.

          <div className="about__button">
            <Link rel="noreferrer" to="https://www.linkedin.com/in/thomas-figved-0056b62b/" target="_blank" className='button button--cta'>
              Get in touch
            </Link>
          </div>

          <ul className="about__list">
            <li className="about__item">
              Connect on <Link rel="noreferrer" to="https://www.linkedin.com/in/thomas-figved-0056b62b/" target="_blank" className='link'><i className="fa-brands fa-linkedin"></i> LinkedIn <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
            </li>
            <li className="about__item">
              Read some of my <Link rel="noreferrer" to="https://github.com/thomas-figved" target="_blank" className='link'><i className="fa-brands fa-github"></i> code on GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
            </li>
            <li className="about__item">
            Check <Link rel="noreferrer" to="https://github.com/thomas-figved/portfolio" target="_blank" className='link'><i className="fa-brands fa-github"></i> this portfolio's code <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}
export default PageHome;