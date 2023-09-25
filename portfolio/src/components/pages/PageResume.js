import {React, useLayoutEffect, useRef, useState, useEffect} from "react";
import { get_cat_name } from "helpers";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PageResume() {

  const timelineRef = useRef();
  const [screenSize, setScreenSize] = useState(window.screen.width);

  useEffect(()=>{
    window.addEventListener('resize', () => {
      setScreenSize(window.screen.width);
    });
  },[setScreenSize]);



  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const line = self.selector('.timeline__line');
      const timeline = self.selector('.timeline');

      gsap.from(line, {
        height: 150,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 10%",
          end: function(){
            if(screenSize < 780) {
              return "90% bottom";
            }else {
              return "90% bottom";
            }
          },
          once: true,
          scrub: true,
        },
      });

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
              return "top 50%";
            }else {
              return "top 40%";
            }
          },
        },
      });
    });

    }, timelineRef); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, [screenSize]);




  return (
    <div className="timeline" ref={timelineRef}>
      <div className="timeline__line"></div>

      <div className="timeline__point">
        <div className="timeline__wrap">
          <div className="timeline__year">Today</div>
          <div className="timeline__content">
            Looking for opening a new chapter of my career in a different corner of the world.
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
            Creating websites from markup to delivery. Mostly creating bespoke WordPress theme with a strong accent on the frontend. Worked on more that 25 projects of different sizes, from single static pages to bigger project with multiple WordPress.
            As part of a small team I had to work in almost complete autonomy. Had to tackle various technical challenges which range from coding to security and 3D modeling.
          </div>
          <div className="timeline__technologies">
            {get_cat_name("front")} {get_cat_name("wordpress")} {get_cat_name("sass")} {get_cat_name("gsap")}
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
          <div className="timeline__technologies">
            {get_cat_name("front")} {get_cat_name("back")} {get_cat_name("wordpress")} {get_cat_name("sass")} {get_cat_name("sql")}
          </div>
        </div>
      </div>

      <div className="timeline__point">
        <div className="timeline__wrap">
          <div className="timeline__year">2014 to 2019</div>
          <h2 className="timeline__title">
            Software developer at HD Media
          </h2>
          <div className="timeline__content">
            Developing and maintaining a web platform to manage virtual tours (360° pictures). Developing and maintaining a web-based ERP/CRM tool for our sales partners. Customer support. Manual image corrections with Gimp.
          </div>
          <div className="timeline__technologies">
            {get_cat_name("front")} {get_cat_name("back")} {get_cat_name("wordpress")} {get_cat_name("sass")} {get_cat_name("sql")}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PageResume;