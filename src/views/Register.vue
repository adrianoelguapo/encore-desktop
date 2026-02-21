<!-- --- Estructura de la vista de registro --- -->
<template>

  <!-- --- Contenedor principal --- -->
  <div class = "page-container">

    <!-- --- Barra de navegación (componente) --- -->
    <Navbar />

    <!-- --- Contenido de la vista --- -->
    <main class = "auth-content">

      <!-- --- Contenedor principal del contenido --- -->
      <div class = "auth-container">

        <!-- --- Header --- -->
        <div class = "auth-header">

          <!-- --- Título --- -->
          <h1 class = "page-title">Join Us</h1>

          <!-- --- Subtítulo --- -->
          <p class = "page-subtitle">Start your festival experience today</p>

        </div>

        <!-- --- Formulario de registro --- -->
        <form class = "open-form" @submit.prevent = "handleRegister">

          <!-- --- Input para el nombre --- -->
          <div class = "floating-input-group">

            <input id = "name" type = "text" class = "floating-input" placeholder = " " v-model = "name"/>
            <label for = "name" class = "floating-label">Full Name</label>

          </div>

          <!-- --- Input para el nombre de usuario --- -->
          <div class = "floating-input-group">

            <input id = "username" type = "text" class = "floating-input" placeholder = " " v-model = "username"/>
            <label for = "username" class = "floating-label">Username</label>

          </div>

          <!-- --- Input para la contraseña --- -->
          <div class = "floating-input-group">

            <input id = "password" type = "password" class = "floating-input" placeholder = " " v-model = "password"/>
            <label for = "password" class = "floating-label">Password</label>

          </div>

          <!-- --- Input para confirmar la contraseña --- -->
          <div class = "floating-input-group">

            <input id = "confirm-password" type = "password" class = "floating-input" placeholder = " " v-model = "confirmPassword"/>
            <label for = "confirm-password" class = "floating-label">Confirm Password</label>

          </div>

          <!-- --- Botón de submit --- -->
          <button type = "submit" class = "action-button">Create Account</button>

          <!-- --- Si salta un error, se muestra el mensaje --- -->
          <p v-if = "errorMessage" class = "error-message">{{ errorMessage }}</p>

        </form>

        <!-- --- Footer --- -->
        <div class = "auth-footer">
          
          <p class = "footer-message">Already have an account? <router-link to = "/login" class = "link-text">Log in here</router-link></p>
        
        </div>

      </div>

    </main>

    <!-- --- Efectos de fondo (componente) --- -->
    <BackgroundEffects />

  </div>

</template>

<!-- --- Lógica de la vista --- -->
<script>

/* --- Importar componentes, el servicio de autenticación y Zod (PARA ROBER) --- */
import Navbar from '@/components/Navbar.vue'
import BackgroundEffects from '@/components/BackgroundEffects.vue'
import authService from '@/services/authService'
import { z } from 'zod'

/* --- Definir el esquema para el Registro --- */
const registerSchema = z.object({

  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string()

}).refine((data) => data.password === data.confirmPassword, {

  /* --- Esto asocia el error al campo confirmPassword --- */
  message: "Passwords do not match",
  path: ["confirmPassword"]

})

/* --- Exportar la vista --- */
export default {

  /* --- Nombre de la vista --- */
  name: 'RegisterPage',

  /* --- Componentes que utiliza la vista --- */
  components: {

    Navbar,
    BackgroundEffects

  },

  /* --- Datos del formulario de registro --- */
  data() {

    return {

      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''

    }

  },

  /* --- Métodos --- */
  methods: {

    /* --- Solo hay un método que es el encargado de manejar el registro --- */
    async handleRegister() {

      /* --- Se inicia una variable para guardar el mensaje de error en caso de que salte alguno --- */
      this.errorMessage = ''

      /* --- Validar con Zod antes de llamar al backend --- */
      const resultValidation = registerSchema.safeParse({

        name: this.name,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword

      })

      /* --- Si falla la validación, mostramos el primer error de la lista y cortamos la ejecución --- */
      if (!resultValidation.success) {

        this.errorMessage = resultValidation.error.issues[0].message
        return

      }

      /* --- Se llama al método de registro en el service de autenticación --- */
      const result = await authService.register(this.name, this.username, this.password)
      
      /* --- Si el registro es exitoso, se redirige a un dashboard dependiendo del rol de usuario (admin o user) --- */
      if (result.success) {

        if (result.user.role === 'admin') {

          this.$router.push('/admin-dashboard')

        } else {

          this.$router.push('/dashboard')

        }

      } else {

        /* --- Si el registro falla en algún punto, se muestra el mensaje de error --- */
        this.errorMessage = result.error

      }

    }

  }

}

</script>

<!-- --- Estilos de la vista --- -->
<style scoped>

* {

  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

.page-container {

  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(ellipse at top, #1a0033 0%, #000000 50%, #0a0015 100%);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;

}

.auth-content {

  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 10;
  overflow-y: auto;

}

.auth-container {

  width: 100%;
  max-width: 520px;
  margin: 2rem 0;

}

/* --- Header --- */
.auth-header {

  text-align: center;
  margin-bottom: 3.5rem;

}

.page-title {

  font-size: 3.5rem;
  font-weight: 900;

  /* --- Para hacer el efecto de gradiente en el título de la vista --- */
  background: linear-gradient(135deg, #ffffff 0%, #e0d5ff 40%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  margin-bottom: 0.75rem;
  letter-spacing: -2px;
  line-height: 1;

}

.page-subtitle {

  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  letter-spacing: -0.3px;

}

/* --- Estilos del formulario --- */
.open-form {

  display: flex;
  flex-direction: column;
  gap: 2.25rem;

}

.floating-input-group {

  position: relative;

}

.floating-input {

  width: 100%;
  padding: 1.25rem 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(139, 92, 246, 0.3);
  font-size: 1.125rem;
  color: #ffffff;
  font-family: 'Geist', sans-serif;
  outline: none;
  transition: all 0.3s ease;

}

.floating-label {

  position: absolute;
  left: 0;
  top: 1.25rem;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s ease;

}

.floating-input:focus {

  border-bottom-color: #8b5cf6;

}

/* --- Para hacer el efecto de animación en el placeholder --- */
.floating-input:focus ~ .floating-label,
.floating-input:not(:placeholder-shown) ~ .floating-label {

  top: -1.5rem;
  font-size: 0.875rem;
  color: #c4b5fd;
  font-weight: 600;

}

/* --- Mensaje de error --- */
.error-message {

  color: #ff6b6b;
  font-size: 0.95rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;

}

/* --- Botón de submit --- */
.action-button {

  width: 100%;
  padding: 1.125rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border: none;
  border-radius: 14px;
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Geist', sans-serif;
  letter-spacing: -0.5px;
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.35);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

}

.action-button:hover {

  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  box-shadow: 0 16px 50px rgba(139, 92, 246, 0.45);
  transform: translateY(-3px);

}

/* --- Footer --- */
.auth-footer {

  text-align: center;
  margin-top: 2.5rem;

}

.footer-message {

  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;

}

.link-text {

  color: #c4b5fd;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

}

.link-text:hover {

  color: #ddd6fe;

}

</style>
