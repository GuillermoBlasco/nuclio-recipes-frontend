import {Link} from "react-router-dom";
import {recipeList} from "../../constants/urls";

export default () => {
  return (<div>
    Home!
    You may want to visit our recipes
    <Link to={recipeList}>
      <button>Go!</button>
    </Link>
  </div>)
}
