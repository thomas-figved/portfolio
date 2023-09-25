const filter_correspondances = {
  "front": {
    ico_class: "fa-solid fa-code",
    name: "Frontend",
  },
  "back": {
    ico_class: "fa-solid fa-computer",
    name: "Backend",
  },
  "wordpress": {
    ico_class: "fa-brands fa-wordpress",
    name: "WordPress",
  },
  "gsap": {
    ico_class: "ico ico--gsap",
    name: "GSAP",
  },
  "webpack": {
    ico_class: "ico ico--webpack",
    name: "Webpack",
  },
  "sass": {
    ico_class: "fa-brands fa-sass",
    name: "SASS",
  },
  "joomla": {
    ico_class: "fa-brands fa-joomla",
    name: "Joomla",
  },
  "aws": {
    ico_class: "fa-brands fa-aws",
    name: "AWS",
  },
  "sql": {
    ico_class: "fa-solid fa-database",
    name: "SQL",
  },
  "codeigniter": {
    ico_class: "ico ico--codeigniter",
    name: "CodeIgniter",
  }
};


export function get_cat_name(cat) {
  return cat in filter_correspondances ? filter_correspondances[cat].name : cat;
}

export function get_cat_ico(cat) {
  return cat in filter_correspondances ? filter_correspondances[cat].ico_class : cat;
}