import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useRecipeList} from "../../../hooks/api";

const RecipeListItem = (props) => {
  return (<div>
    <span>{props.title}</span>
    <Link to={'/recipes/' + props.id}>
      <button>
        Go!
      </button>
    </Link>
  </div>)
}

export default  () =>{
  const recipes = useRecipeList();
  if (!recipes) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      Recipes:
      {recipes.map(r => <RecipeListItem {...r} />)}
    </div>
  )
}
