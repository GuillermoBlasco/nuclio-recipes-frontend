import {Link, useLocation} from "react-router-dom";
import {useRecipeList} from "../../../hooks/api";
import {recipeNew, recipeOf} from "../../../constants/urls";
import {useState} from "react";

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
  if (!queryString) {
    return {};
  }
  var search = queryString.substring(1);
  return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
}
export default  () =>{
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const location = useLocation();
  const queryString = parseQueryString(location.search);
  const {
    loading,
    response,
    error,
    refresh,
  } = useRecipeList({
    keywords: queryString.search,
    page,
    pageSize,
  });
  if (error) {
    return <div>{error.toString()}</div>
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <Link to={recipeNew}>
          <button>Create</button>
        </Link>
        <button onClick={refresh}>Refresh</button>
      </div>
      Recipes {queryString.search || ''}:
      {response.contents.map(r => <RecipeListItem {...r} />)}
      <div>
        <div>total elements: {response.totalElements}</div>
        <button onClick={() => setPage(page - 1)}>Prev Page</button>
        <span>{page}</span>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div>
    </div>
  )
}
