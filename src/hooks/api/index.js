import {useEffect, useState} from "react";

export const useRecipeList = () => {
  const [response, setResponse] = useState();
  useEffect(() => {
    fetch('http://localhost:8000/recipes', {
      method: 'GET',
    }).then(response => response.json())
      .then(response => {
        setResponse(response);
      })
  }, []);
  return response;
}

export const useRecipe = (id) => {
  const [response, setResponse] = useState();
  useEffect(() => {
    fetch('http://localhost:8000/recipes/' + id, {
      method: 'GET',
    }).then(response => response.json())
      .then(response => {
        setResponse(response);
      })
  }, [id]);
  return response;
}

export const useDeleteRecipeHandler = (id) => {
  return () => fetch('http://localhost:8000/recipes/' + id, {
    method: 'DELETE',
  });
}
