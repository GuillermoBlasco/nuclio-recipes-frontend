import logo from './logo.svg';
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

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/recipes/:id">
            <RecipeOne />
          </Route>
          <Route path="/recipes">
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
