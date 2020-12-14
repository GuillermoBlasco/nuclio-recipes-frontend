import {useLocation, useHistory} from "react-router-dom";


export const usePages = () => {
  let location = useLocation();
  const history = useHistory();
  const isRecipePage = location.pathname.startsWith('/recipes/');
  return {
    isRecipePage,
    isRecipeList: location.pathname === '/recipes',
    isHome: location.pathname === '/',
    goToRecipeList: () => history.push('/recipes'),
    goToHome: () => history.push('/'),
    goToRecipePage: id => history.push('/recipes/' + id),
  }
}
