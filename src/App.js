import './App.css';
import Home from './pages/home';
import RecipeList from './pages/recipes/list';
import RecipeOne from './pages/recipes/one/RecipesOne';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/header/Header";
import RecipesNew from "./pages/recipes/new/RecipesNew";
import {editRecipeOf, recipeList, recipeNew, recipeOf} from "./constants/urls";
import RecipeEdit from "./pages/recipes/edit/RecipeEdit";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path={editRecipeOf(":id")}>
            Edit!
            <RecipeEdit />
          </Route>
          <Route path={recipeNew}>
            <RecipesNew />
          </Route>
          <Route path={recipeOf(":id")}>
            <RecipeOne />
          </Route>
          <Route path={recipeList}>
            <RecipeList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
