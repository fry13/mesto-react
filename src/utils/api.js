import {identity} from './utils'

class Api {
  constructor({token, url}) {
    this._token = token;
    this._url = url;
  }

// response handlers

  _handleResponse(res) {
    if (res.ok) {        
      return res.json();
    } else {
      return Promise.reject(`Oops! Error: ${res.status}`);
    }
  }  

  _handleError(error) {
    console.error(error);
    return Promise.reject(error.message)
  }

// cards

  getInitialCards() {
    return fetch(`${this._url}/cards`, { 
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      } 
    })
    .then(this._handleResponse)
    .catch(this._handleError)
  }

  createCard(name, link) {
    return fetch(`${this._url}/cards`, {      
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      }),
      method: 'POST'
    })
      .then(this._handleResponse)
      .catch(this._handleError)
  } 

  deleteCard(id) {
    return fetch((`${this._url}/cards/${id}`), {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  likeCard(id) {
    return fetch((`${this._url}/cards/likes/${id}`), {      
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    .then(this._handleResponse)
    .catch(this._handleError)
  }

  dislikeCard(id) {
    return fetch((`${this._url}/cards/likes/${id}`), {      
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    .then(this._handleResponse)
    .catch(this._handleError)
  }

// user info

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse)
    .catch(this._handleError)
  }

  setUserInfo (name, bio) {
    return fetch(`${this._url}/users/me`, {        
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: bio
        }),
        method: 'PATCH'
      }
    )
    .then(this._handleResponse)
    .catch(this._handleError)
  }

  setAvatar(data) {
    return fetch((`${this._url}/users/me/avatar`), {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'PATCH'
    })
    .then(this._handleResponse)
    .catch(this._handleError)
  }
}
export const api = new Api(identity);