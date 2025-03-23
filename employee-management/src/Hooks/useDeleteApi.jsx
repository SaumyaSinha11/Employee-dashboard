import React from 'react'

export default function useDeleteApi(url) { 
  return fetch(url, {
    method: 'DELETE',
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Delete operation failed");
    }
    console.log("Delete successful");
  })
  .catch(error => console.error(error));
}
