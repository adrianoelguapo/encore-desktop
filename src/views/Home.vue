<!-- --- Estructura de la vista de inicio --- -->
<template>

  <!-- --- Contenedor principal --- -->
  <div class = "page-container">

    <!-- --- Barra de navegación (componente) --- -->
    <Navbar />

    <!-- --- Contenido de la vista --- -->
    <main class = "main-hero-section">

      <!-- --- Contenedor principal del contenido --- -->
      <div class = "hero-container">

        <!-- --- Título --- -->
        <h2 class = "main-heading">Where Music<br>Meets Magic</h2>

        <!-- --- Descripción --- -->
        <p class = "hero-description">Join thousands of music lovers at the most anticipated festival of the year</p>

      </div>

    </main>

    <!-- --- Efectos de fondo (componente) --- -->
    <BackgroundEffects />

  </div>
  
</template>

<!-- --- Lógica de la vista --- -->
<script>

/* --- Importar componentes --- */
import Navbar from '@/components/Navbar.vue'
import BackgroundEffects from '@/components/BackgroundEffects.vue'

/* --- Exportar la vista --- */
export default {

  /* --- Nombre de la vista --- */
  name: 'HomePage',

  /* --- Componentes que utiliza --- */
  components: {

    Navbar,
    BackgroundEffects

  }

}

</script>

<!-- --- Estilos de la vista --- -->
<style scoped>

/* --- Estilos generales --- */
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

/* --- Sección principal --- */
.main-hero-section {

  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;

}

.hero-container {

  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 2;

}

.main-heading {

  font-size: 6rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.05;
  margin-bottom: 1.5rem;
  letter-spacing: -3px;
  background: linear-gradient(135deg, #ffffff 0%, #e0d5ff 50%, #c4b5fd 100%);
  background-clip: text;
  text-shadow: 0 0 80px rgba(196, 181, 253, 0.3);

}

.hero-description {

  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  
}

</style>