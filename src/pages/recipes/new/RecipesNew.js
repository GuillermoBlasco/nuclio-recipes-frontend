import {useCreateRecipeHandler} from "../../../hooks/api";
import './RecipesNew.css'
import {useRef} from "react";
import {usePages} from "../../../hooks/usePages";
export default  () =>{
  const titleRef = useRef();
  const keywordRef = useRef();
  const {loading, handler:createRecipeHandler} = useCreateRecipeHandler();
  const {goToRecipePage} = usePages();
  const handleCreate = () => {
    createRecipeHandler({
      title: titleRef.current.value,
      keywords: keywordRef.current.value.split(','),
    }).then(response => goToRecipePage(response.id))
  }
  return (
    <div className="RecipesNew">
      <h2>New Recipe</h2>
      <input type="text" placeholder="title" ref={titleRef} />
      <input type="text" placeholder="keywords" ref={keywordRef} />
      <button onClick={handleCreate} disabled={loading}>
        {loading ? 'Loading' : 'Create'}
      </button>
    </div>
  )
}
