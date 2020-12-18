
import './Header.css';
import {usePages} from "../../hooks/usePages";


export default  () => {

  const {isRecipePage, goToRecipeList} = usePages();
  const searchHandler = e => {
    if (e.key === 'Enter') {
      const search = e.target.value;
      goToRecipeList(search);
    }
  }
  return (<div className="Header">

    {isRecipePage && (<span className="GoBack" onClick={e => goToRecipeList()}>
      Back
    </span>)}
    <input type="text" onKeyPress={searchHandler}/>
  </div>)
}
