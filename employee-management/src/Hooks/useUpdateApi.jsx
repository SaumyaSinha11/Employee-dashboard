import React from 'react'

export default function useUpdateApi(url, employee) {
    return fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
}
