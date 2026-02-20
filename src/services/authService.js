/* --- URL en la que escucha el backend --- */
const API_BASE_URL = 'http://localhost:5000/api'

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

      /* --- Se guarda el token y el usuario en localStorage --- */
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

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

      // Guardar token y usuario en localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      return { success: true, user: data.user }

    } catch (error) {

      return { success: false, error: error.message }

    }

  },

  // Logout user
  logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('user')

  },

  // Get current user from localStorage
  getCurrentUser() {

    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
    
  },

  // Get token from localStorage
  getToken() {

    return localStorage.getItem('token')

  },

  // Check if user is authenticated
  isAuthenticated() {

    return !!this.getToken()

  }

}