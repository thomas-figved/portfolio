import {React, useRef, useEffect, useLayoutEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import { get_cat_name } from "helpers";

import parse from 'html-react-parser';
import { NavLink } from "react-router-dom";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import password from "data/password.json";


gsap.registerPlugin(ScrollTrigger);


function PageWorkDetail(props) {
  const { id } = useParams();
  const workContent = useRef();
  const navigate = useNavigate();

  const work = props.works.filter(function(work){
    let int_id = parseInt(id);
    return work.work_id === int_id;
  }).pop();

  useEffect(function(){
    //read cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("password="))
      ?.split("=")[1];
    if(cookieValue !== password.password) {
      navigate("/works");
    }
  }, [navigate])


  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const fadeItems= self.selector('[data-fade-in]');
      fadeItems.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 100,
          duration: 0.5,
          onStart: function(){
            let video = item.querySelector("video");
            if(video !== null) {
              video.play();
            }
          },
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        });
      });
    }, workContent); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);


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
        <h1 className="work-intro__title">{work.title}</h1>

        <div className="work-intro__txt">
          {work.intro}
        </div>
        <div className="work-intro__category">
          Categories: {work.categories.map(get_cat_name).join(', ')}
        </div>
      </div>
      <div className="page-wrap__button">
        <Link rel="noreferrer" to="https://www.linkedin.com/in/thomas-figved-0056b62b/" target="_blank" className='button button--cta'>
          Ask me about this project
        </Link>
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
                <div key={idx} className="work-content__video" data-fade-in data-video-index={idx}>

                  <video preload="true" controls playsInline muted={true} loop className="video-player">
                    <source src={get_video_path(work.folder, content.filename, "webm")}  type='video/webm'/>
                    <source src={get_video_path(work.folder, content.filename, "mp4")}  type='video/mp4'/>
                  </video>
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