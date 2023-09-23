import {React} from "react";
import {useParams } from "react-router-dom";

function PageWorkDetail(props) {
  const { id } = useParams();


  return (
    <>
      <h2 className="title">Single work {id}</h2>
      {props.work_content}
    </>
  );
}

export default PageWorkDetail;