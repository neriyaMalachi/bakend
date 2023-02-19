import "react-toastify/dist/ReactToastify.css";
import NavBarForwhidthBiger from "./NavBarForwhidthBiger";
import NavBarForwhidthstandart from "./NavBarForwhidthstandart";
import Media from "react-media";

function NavBar() {

  return (
    <Media query="(min-width: 900px)">
      {(matches) => {
        return matches ? <NavBarForwhidthBiger /> : <NavBarForwhidthstandart />;
      }}
    </Media>
  );
}

export default NavBar;
