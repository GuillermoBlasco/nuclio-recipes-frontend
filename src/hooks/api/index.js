import {useEffect, useState} from "react";

const hostname = 'http://localhost:8000';
const options = {
  headers: {
    'Content-Type': 'application/json',
    'Accepts': 'application/json',
  }
}

export const useGet = (url) => {
  const [response, setResponse] = useState();
  useEffect(() => {
    fetch(hostname + url, {
      method: 'GET',
      ...options,
    }).then(response => response.json())
      .then(response => {
        setResponse(response);
      })
  }, [url]);
  return response;
}

export const useRecipeList = () => useGet('/recipes');
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
