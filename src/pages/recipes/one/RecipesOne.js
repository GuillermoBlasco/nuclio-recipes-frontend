import {
  useParams
} from "react-router-dom";
import {useDeleteRecipeHandler, useRecipe} from "../../../hooks/api";
import './RecipesOne.css'
import {usePages} from "../../../hooks/usePages";
export default  () =>{
  const {id} = useParams();
  const {goToRecipeList} = usePages();
  const recipe = useRecipe(id);
  const {loading, handler:deleteRecipeHandler} = useDeleteRecipeHandler(id);
  if (!recipe) {
    return <div>Loading...</div>;
  }
  const handleDelete = () => {
    deleteRecipeHandler()
      .then(() => goToRecipeList());
  }
  return (
    <div className="RecipesOne">
      <h2>{recipe.title}</h2>
      <div>
        {recipe.keywords?.map(keyword => <span>{keyword}</span>)}
      </div>
      <img src={recipe.photo} />
      <button onClick={handleDelete} disabled={loading}>Delete</button>
    </div>
  )
}
