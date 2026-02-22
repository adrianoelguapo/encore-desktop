<!-- --- Estructura del modal de mensajes informativos --- -->
<template>

  <!-- --- Si el modal está visible, se muestra su contenido --- -->
  <div v-if = "visible" class = "modal-overlay" @click.self = "$emit('close')">

    <!-- --- Contenedor principal del modal --- -->
    <div class = "modal-container">

      <!-- --- Header --- -->
      <div class = "modal-header">

        <!-- --- Icono informativo (exclamación para un error, i para un mensaje de información) --- -->
        <div class = "header-icon" :class = "type">

          <span v-if = "type === 'error'">!</span>
          <span v-else>i</span>

        </div>

        <!-- --- Título del modal --- -->
        <h2 class = "modal-title">{{ title }}</h2>

      </div>
      
      <!-- --- Cuerpo del modal --- -->
      <div class = "modal-body">

        <!-- --- Contenido del modal --- -->
        <p class = "message">{{ message }}</p>

      </div>
      
      <!-- --- Footer --- -->
      <div class = "modal-footer">

        <!-- --- Botón de aceptar --- -->
        <button class = "btn btn-primary" @click = "$emit('close')">Accept</button>

      </div>

    </div>

  </div>

</template>

<!-- --- Lógica del componente --- -->
<script>

/* --- Exportación del componente --- */
export default {

  /* --- Nombre del componente --- */
  name: 'InfoModal',

  /* --- Atributos que se le pasan al componente --- */
  props: {

    /* --- Si es visible o no --- */
    visible: {

      type: Boolean,
      default: false

    },

    /* --- Título del modal --- */
    title: {

      type: String,
      default: 'Attention'

    },

    /* --- Mensaje del modal --- */
    message: {

      type: String,
      default: ''

    },

    /* --- Tipo del modal --- */
    type: {

      type: String,
      default: 'info' /* --- info por defecto pero puede cambiar a error --- */

    }

  }

}

</script>

<!-- --- Estilos del componente --- -->
<style scoped>

/* --- Estilos para el difuminar el fondo y que el modal quede por encima y centrado --- */
.modal-overlay {

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;

}

/* --- Contenedor principal --- */
.modal-container {

  background: #120c1d;
  border: 1px solid rgba(139, 92, 246, 0.4);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.9);
  border-radius: 24px;
  width: 90%;
  max-width: 400px;
  padding: 1.5rem;
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

}

/* --- Header --- */
.modal-header {

  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

}

.header-icon {

  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  color: white;

}

.header-icon.error {

  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);

}

.header-icon.info {
  
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);

}

/* --- Título --- */
.modal-title {

  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin: 0;
  letter-spacing: -0.5px;

}

/* --- Contenido --- */
.modal-body {

  margin-bottom: 2rem;

}

.message {

  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;

}

/* --- Footer --- */
.modal-footer {

  width: 100%;

}

/* --- Botón de aceptar --- */
.btn {

  width: 100%;
  padding: 0.9rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  font-size: 1rem;

}

.btn-primary {

  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);

}

.btn-primary:hover {

  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);

}

/* --- Animación para el difuminado del fondo --- */
@keyframes fadeIn {

  from { opacity: 0; }

  to { opacity: 1; }

}

/* --- Animación para el movimiento del modal --- */
@keyframes slideUp {

  from { transform: translateY(20px); opacity: 0; }

  to { transform: translateY(0); opacity: 1; }

}

</style>