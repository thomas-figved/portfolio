import {React} from "react";

function Picture(props) {

  const get_img_path = function(folder, filename, format, density) {
    return process.env.PUBLIC_URL + `/medias/${folder}/${density}/${filename}.${format}`;
  }

  return (
    <>
      <picture className={props.className}>
        <source srcSet={`${get_img_path(props.folder, props.filename, 'jpg','1x')} 1x, ${get_img_path(props.folder, props.filename, 'jpg','2x')} 2x`} type="image/jpeg" />
        <source srcSet={`${get_img_path(props.folder, props.filename, 'webp','1x')} 1x, ${get_img_path(props.folder, props.filename, 'webp','2x')} 2x`} type="image/webp" />
        <img src={`${get_img_path(props.folder, props.filename, 'jpg','2x')}`} alt={props.alt}/>
      </picture>
    </>
  );
}

export default Picture