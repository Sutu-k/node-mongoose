import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

  const selectors = {
    isLogged: () => localStorage.getItem('token') !== null,
  }

  const actions = {
    login: async (user) => {
      try {
        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        const content = await rawResponse.json();

        localStorage.setItem('token', content.token)
        localStorage.setItem('user', JSON.stringify(content.user))
        return Promise.resolve(true)
      } catch (error) {
        console.log(error)
        return Promise.reject(false)
      }
    },
    like: async (movieId) => {
      try {
        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/movies/${movieId}/like`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        if (rawResponse.status == 400) {
          return Promise.reject('Oups, il semble que vous ayez déjà aimé ce film')
        }
        const movie = await rawResponse.json();


        return Promise.resolve(movie)
      } catch (error) {
        return Promise.reject(false)
      }
    },
    dislike: async (movieId) => {
      try {
        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/movies/${movieId}/dislike`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        if (rawResponse.status == 400) {
          return Promise.reject("Oups, il semble que vous n'ayez pas encore aimé ce film")
        }
        const movie = await rawResponse.json();


        return Promise.resolve(movie)
      } catch (error) {
        return Promise.reject(false)
      }
    },
  }

  return <GlobalContext.Provider value={{ selectors, actions }}>
    {children}
  </GlobalContext.Provider>
}