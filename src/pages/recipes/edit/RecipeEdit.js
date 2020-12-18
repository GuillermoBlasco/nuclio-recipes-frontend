import { useRecipe, useUpdateRecipeHandler} from "../../../hooks/api";
import './RecipeEdit.css'
import {useEffect, useState} from "react";
import {usePages} from "../../../hooks/usePages";
import {useParams} from "react-router-dom";
export default  () =>{
  const [title, setTitle] = useState();
  const [keywords, setKeywords] = useState();
  const {id} = useParams();
  const {goToRecipeList} = usePages();
  const recipe = useRecipe(id);
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setKeywords(recipe.keywords.join(','));
    }
  }, [recipe]);
  const {loading, handler:updateRecipeHandler} = useUpdateRecipeHandler(id);
  const {goToRecipePage} = usePages();
  const handleUpdate = () => {
    updateRecipeHandler({
      title,
      keywords: keywords.split(','),
    }).then(response => goToRecipePage(response.id))
  }
  return (
    <div className="RecipesNew">
      <h2>Edit Recipe</h2>
      <input type="text" placeholder="title" onChange={e => setTitle(e.target.value)} value={title} />
      <input type="text" placeholder="keywords" onChange={e => setKeywords(e.target.value)} value={keywords} />
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? 'Loading' : 'Update'}
      </button>
    </div>
  )
}
