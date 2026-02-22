<!-- --- Estructura de la barra de navegación (solo Home, Login y Registro) --- -->
<template>

  <!-- --- Contenedor principal del componente --- -->
  <div class = "navigation-container">

    <!-- --- Contenedor de la barra de navegación --- -->
    <nav class = "navigation-bar">

      <!-- --- Contenedor auxiliar para envolver la barra de navegación --- -->
      <div class = "navigation-wrapper">

        <!-- --- Enlace a la página de inicio --- -->
        <router-link to = "/" class = "logo-link">

          <!-- --- Logo --- -->
          <h1 class = "logo-text">Encore Festival</h1>

        </router-link>
        
        <!-- --- Botones de login y registro --- -->
        <div class = "auth-buttons-group">

          <!-- --- Si el usuario está autenticado, se muestra el botón de logout --- -->
          <template v-if = "isAuthenticated">

            <button @click = "handleLogout" class = "logout-button">Log Out</button>

          </template>

          <!-- --- Si el usuario no está autenticado, se muestran los botones de login y registro --- -->
          <template v-else>

            <router-link to = "/login" class = "login-button">Log In</router-link>
            <router-link to = "/register" class = "register-button">Register</router-link>

          </template>

        </div>

      </div>

    </nav>
    
  </div>

</template>

<!-- --- Lógica del componente --- -->
<script>

/* --- Importación del servicio de autenticación --- */
import authService from '@/services/authService'

/* --- Exportación del componente --- */
export default {

  /* --- Nombre del componente --- */
  name: 'NavbarComponent',

  /* --- Estructura de datos del componente --- */
  data() {

    return {

      /* --- Está autenticado o no --- */
      isAuthenticated: false

    }

  },

  /* --- Cuando el componente se carga --- */
  mounted() {

    /* --- Comprueba si el usuario está autenticado --- */
    this.checkAuth()

    /* --- Añade un listener para cuando el usuario se desloguea --- */
    window.addEventListener('storage', this.checkAuth)

  },

  /* --- Antes de que el componente se desmonte --- */
  beforeUnmount() {

    /* --- Elimina el listener --- */
    window.removeEventListener('storage', this.checkAuth)

  },

  /* --- Métodos del componente --- */
  methods: {

    /* --- Comprueba si el usuario está autenticado --- */
    checkAuth() {

      this.isAuthenticated = authService.isAuthenticated()

    },

    /* --- Maneja el logout --- */
    handleLogout() {

      /* --- Cierra la sesión --- */
      authService.logout()

      /* --- Actualiza el estado de autenticación --- */
      this.isAuthenticated = false

      /* --- Redirige al usuario a la página de inicio --- */
      this.$router.push('/')

    }

  }

}

</script>

<!-- --- Estilos del componente --- -->
<style scoped>

/* --- Contenedor principal --- */
.navigation-container {

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

}

/* --- Barra de navegación --- */
.navigation-bar {

  width: 70%;
  position: relative;
  z-index: 100;
  padding: 2rem 2rem 0;
  display: flex;
  justify-content: center;

}

.navigation-wrapper {

  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(20, 15, 35, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 4px 40px rgba(139, 92, 246, 0.35);

}

/* --- Enlace al logo --- */
.logo-link {

  text-decoration: none;

}

.logo-text {

  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.8px;

}

/* --- Botones de login y registro --- */
.auth-buttons-group {

  display: flex;
  gap: 1.5rem;
  align-items: center;

}

.login-button,
.register-button {

  padding: 0.75rem 1.75rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Geist', sans-serif;
  text-decoration: none;
  display: inline-block;

}

.login-button {

  color: #ffffff;
  background: transparent;
  padding: 0.75rem 0;

}

.login-button:hover {

  color: rgba(255, 255, 255, 0.7);

}

.register-button {

  background: #c4b5fd;
  color: #1a0a2e;

}

.register-button:hover {

  background: #ddd6fe;
  transform: translateY(-2px);

}

.logout-button {

  padding: 0.75rem 1.75rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  background: #c4b5fd;
  color: #1a0a2e;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Geist';

}

.logout-button:hover {

  transform: translateY(-2px);

}

</style>