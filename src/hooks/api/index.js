import {useEffect, useReducer, useState} from "react";

const hostname = 'http://localhost:8000';
const options = {
  headers: {
    'Content-Type': 'application/json',
    'Accepts': 'application/json',
  }
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'request-start':
      return {...state, loading: true, error: undefined, response: undefined}
    case 'request-end':
      return {...state, loading:false, error: action.error, response: action.response}
  }
  return state;
};

export const useGet = (url) => {
  const [state, dispatch] = useReducer(reducer, {loading: true});
  const [forceRerender, setForceRerender] = useState(0);

  useEffect(() => {
    dispatch({type: 'request-start'});
    fetch(hostname + url, {
      method: 'GET',
      ...options,
    }).then(response => response.json())
      .then(response => {
        dispatch({type: 'request-end', response });
      }).catch(error => {
        dispatch({type: 'request-end', error });
    })
  }, [url, forceRerender]);
  const refresh = () => {
    setForceRerender(forceRerender + 1);
  };
  return {
    ...state,
    refresh,
  };
}

export const useRecipeList = (listParams) => {
  let url = '/recipes';
  const params = Object.keys(listParams)
    .filter(key => listParams[key] !== undefined)
    .reduce((prev,next) => ({...prev,[next]:listParams[next]}), {});
  const queryString = new URLSearchParams(params).toString();
  if (queryString) {
    url = url + '?' + queryString;
  }
  return useGet(url);
}
export const useRecipe = (id) => useGet('/recipes/' + id);

export const useUpdateRecipeHandler = (id) => {
  const [loading, setLoading] = useState(false);
  return {
    handler: (body) => {
      setLoading(true);
      return fetch(hostname + '/recipes/' + id, {
        method: 'PUT',
        body: JSON.stringify(body),
        ...options,
      }).then(response => response.json())
        .then(response => {
          setLoading(false);
          return response;
        })
    },
    loading,
  }
}

export const useCreateRecipeHandler = () => {
  const [loading, setLoading] = useState(false);
  return {
    handler: (body) => {
      setLoading(true);
      return fetch(hostname + '/recipes', {
        method: 'POST',
        body: JSON.stringify(body),
        ...options,
      }).then(response => response.json())
        .then(response => {
          setLoading(false);
          return response;
        })
    },
    loading,
  }
}

export const useDeleteRecipeHandler = (id) => {
  const [loading, setLoading] = useState(false);
  return {
    handler: () => {
      setLoading(true);
      return fetch(hostname + '/recipes/' + id, {
        method: 'DELETE',
        ...options,
      }).then(result => {
        setLoading(false)
        return result;
      });
    },
    loading,
  };
}
