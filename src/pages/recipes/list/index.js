import {Link, useLocation} from "react-router-dom";
import {useRecipeList} from "../../../hooks/api";
import {recipeNew, recipeOf} from "../../../constants/urls";

const RecipeListItem = (props) => {
  return (<div>
    <span>{props.title}</span>
    <Link to={recipeOf(props.id)}>
      <button>
        Go!
      </button>
    </Link>
  </div>)
}
const parseQueryString = (queryString) => {
  var search = queryString.substring(1);
  return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
}
export default  () =>{
  const location = useLocation();
  const queryString = parseQueryString(location.search);
  const recipes = useRecipeList();
  if (!recipes) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <Link to={recipeNew}>
          <button>Create</button>
        </Link>
      </div>
      Recipes {queryString.search || ''}:
      {recipes.map(r => <RecipeListItem {...r} />)}
    </div>
  )
}
