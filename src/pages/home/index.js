import {Link} from "react-router-dom";

export default () => {
  return (<div>
    Home!
    You may want to visit our recipes
    <Link to="/recipes">
      <button>Go!</button>
    </Link>
  </div>)
}
