import React from 'react'

export default function usePostApi(newEmployee, url) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEmployee)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => console.error(error));
}
