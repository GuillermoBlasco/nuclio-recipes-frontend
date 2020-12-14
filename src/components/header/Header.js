
import './Header.css';
import {useHistory, useLocation} from "react-router-dom";
import {usePages} from "../../hooks/usePages";


export default  () => {

  let history = useHistory();
  const {isRecipePage} = usePages();
  return (<div className="Header">

    {isRecipePage && (<span className="GoBack" onClick={history.goBack}>
      Back
    </span>)}
  </div>)
}
