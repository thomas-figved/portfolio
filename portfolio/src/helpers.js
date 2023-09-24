export function get_cat_name(cat) {
  const filter_correspondances = {
    "front": "Frontend",
    "back": "Backend",
    "wordpress": "WordPress",
    "gsap": "GSAP",
    "webpack": "Webpack",
    "sass": "SASS",
    "joomla": "Joomla",
    "aws": "AWS",
    "sql": "SQL",
    "codeigniter":"CodeIgniter",
  }

  return cat in filter_correspondances ? filter_correspondances[cat]: cat;
}