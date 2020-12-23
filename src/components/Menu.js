const MainMenu = [
  {
    label: "Home",
    pathname: "/"
  },
  {
    label: "Devices",
    pathname: "/devices"
  }
  /*
  {
    label: "Users",
    pathname: "/users"
  },
  */
];

const SecondaryMenu = [
  {
    label: "Signup",
    pathname: "/signup",
    position: 'right'
  },
  {
    label: "Signin",
    pathname: "/signin"
  },
  /* this will be the orders
  {
    label: "Wizard",
    pathname: "/Wizard"
  },
  */
  {
    label: "Github",
    pathname: "https://github.com/worknenjoy/ahorta-client",
    icon: 'github',
    external: true
  }

];

export { MainMenu, SecondaryMenu };