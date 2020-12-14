import {useLocation, useHistory} from "react-router-dom";
import {recipeList, recipeOf} from "../constants/urls";


export const usePages = () => {
  let location = useLocation();
  const history = useHistory();
  const isRecipePage = location.pathname.startsWith('/recipes/');
  return {
    isRecipePage,
    isRecipeList: location.pathname === recipeList,
    isHome: location.pathname === '/',
    goToRecipeList: search => history.push(recipeList + (search ? ('?search=' + search) : '')),
    goToHome: () => history.push('/'),
    goToRecipePage: id => history.push(recipeOf(id)),
  }
}
