/* --- URL en la que escucha el backend --- */
const API_BASE_URL = 'http://localhost:5000/api'

/* --- Almacenamiento en memoria (se pierde al refrescar) --- */
let _token = null
let _currentUser = null

export default {

  /* --- Método que maneja el login --- */
  async login(username, password) {

    try {

      /* --- Se llama al endpoint de login --- */
      const response = await fetch(`${API_BASE_URL}/auth/login`, {

        method: 'POST',
        headers: {

          'Content-Type': 'application/json'

        },
        body: JSON.stringify({

          /* --- Se envían el usuario y la contraseña --- */
          username: username,
          password: password

        })

      })

      /* --- Se convierte la respuesta a JSON --- */
      const data = await response.json()

      /* --- Si la respuesta no es exitosa salta un error --- */
      if (!response.ok) {

        throw new Error(data.error || 'Login failed')

      }

      /* --- Se guarda el token y el usuario en memoria --- */
      _token = data.token
      _currentUser = data.user

      /* --- Se devuelve el usuario y el token --- */
      return { success: true, user: data.user }

    } catch (error) {

      /* --- Si hay error se devuelve el error --- */
      return { success: false, error: error.message }

    }

  },

  /* --- Método que maneja el registro de un nuevo usuario --- */
  async register(name, username, password) {

    try {

      /* --- Se llama al endpoint de registro --- */
      const response = await fetch(`${API_BASE_URL}/auth/register`, {

        method: 'POST',
        headers: {

          'Content-Type': 'application/json'

        },
        body: JSON.stringify({

          /* --- Se envían el nombre, el usuario, la contraseña y el rol (user por defecto) --- */
          name: name,
          username: username,
          password: password,
          role: 'user'

        })

      })

      /* --- Se convierte la respuesta a JSON --- */
      const data = await response.json()

      /* --- Si la respuesta no es exitosa salta un error --- */
      if (!response.ok) {

        throw new Error(data.error || 'Register failed')

      }

      /* --- Se guarda el token y el usuario en memoria --- */
      _token = data.token
      _currentUser = data.user

      return { success: true, user: data.user }

    } catch (error) {

      return { success: false, error: error.message }

    }

  },

  /* --- Cuando el usuario cierra sesión, se eliminan los datos de la memoria --- */
  logout() {

    _token = null
    _currentUser = null

  },

  /* --- Se obtiene el usuario actual de la memoria --- */
  getCurrentUser() {

    return _currentUser
    
  },

  /* --- Se actualizan los datos del usuario en memoria (ej: tras editar perfil) --- */
  updateCurrentUser(userData) {

    _currentUser = { ..._currentUser, ...userData }
    return _currentUser

  },

  /* --- Se obtiene el token de la memoria --- */
  getToken() {

    return _token

  },

  /* --- Se verifica si el usuario está autenticado --- */
  isAuthenticated() {

    return !!_token

  }

}