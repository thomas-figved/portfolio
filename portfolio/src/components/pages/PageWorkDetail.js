import {React, useRef, useLayoutEffect} from "react";
import {useParams } from "react-router-dom";

import { get_cat_name } from "helpers";

import parse from 'html-react-parser';
import { Player, ControlBar } from 'video-react';
import { NavLink } from "react-router-dom";

import "video-react/dist/video-react.css"; // import css

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


function PageWorkDetail(props) {
  const { id } = useParams();
  const workContent = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const fadeItems= self.selector('[data-fade-in]');
      fadeItems.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 100,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
          },
        });
      });
    }, workContent); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);


  const work = props.works.filter(function(work){
    let int_id = parseInt(id);
    return work.work_id === int_id;
  }).pop();

  const get_video_path = function(folder, filename, format) {
    return process.env.PUBLIC_URL + `/medias/${folder}/${filename}.${format}`;
  }

  return (
    <>
      <NavLink 
        to="/works" 
        className="back-to-works"
      >
        ← Back to works
      </NavLink>
      <div className="work-intro">
        <h2 className="work-intro__title">{work.title}</h2>

        <div className="work-intro__txt">
          {work.intro}
        </div>
        <div className="work-intro__category">
          Categories: {work.categories.map(get_cat_name).join(', ')}
        </div>
      </div>
      <div className="work-content" ref={workContent}>
        {
          work.content.map(function(content, idx){
            if(content.type === "text"){
              return (
                <p className="work-content__paragraph" key={idx} data-fade-in>
                  {parse(content.text)}
                </p>
              )
            }else if(content.type === "video"){
              return (
                <div className="work-content__video" data-fade-in>
                  <Player
                    playsInline
                    autoPlay
                    loop={true}
                    muted={true}
                    src={get_video_path(work.folder, content.filename,"webm")}
                  >
                    <ControlBar autoHide={false}/>
                  </Player>
                </div>
              )
            }else{
              return "";
            }
          })
        }
      </div>
      <NavLink 
        to="/works" 
        className="back-to-works"
      >
        ← Back to works
      </NavLink>
    </>
  );
}

export default PageWorkDetail;