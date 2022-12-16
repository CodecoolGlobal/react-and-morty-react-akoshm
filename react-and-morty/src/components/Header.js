import { Link } from "react-router-dom";

function Landing() {
  let img = "./Rick_and_Morty.svg";
  return (
    <>
      <nav className="">
        <Link to={"/"}>
          <img id="logo" src={img} alt="img logo"></img>
        </Link>
        <div>
          <Link to={"/characters"}>
            <button className="button-27">Characters</button>
          </Link>
          <Link to={"/locations"}>
            <button className="button-27">Locations</button>
          </Link>
        </div>
      </nav>
    </>
  );
}
export default Landing;
