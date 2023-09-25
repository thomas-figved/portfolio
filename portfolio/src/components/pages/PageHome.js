import {React} from "react";
import { Link } from "react-router-dom";

function PageHome() {
  return (
    <div className="page-wrap__home">
      I'm a web developer with <Link to="resume" className="link">15 years of experience</Link>. Originally from France and currently based in Japan, I'm looking for new opportunities elsewhere. Take a peek at my portfolio to see <Link to="works" className="link">some of my work</Link>. Let's connect and create something great together.
    </div>
  );
}
export default PageHome;