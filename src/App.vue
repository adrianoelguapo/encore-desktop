<!-- --- Estrucura de la aplicación --- -->
<template>

<!-- --- Contenedor principal --- -->
  <div id = "app">

    <!-- --- Rutas de la aplicación --- -->
    <router-view v-slot = "{ Component }">

      <!-- --- Transición entre las vistas --- -->
      <transition name = "page" mode = "in-out">

        <!-- --- Vista actual --- -->
        <component :is = "Component"/>

      </transition>

    </router-view>

  </div>

</template>

<script>

/* --- Exportar componente principal de la aplicación --- */
export default {

  name: 'App'

}

</script>

<!-- --- Estilos generales de la aplicación --- -->
<style>

@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap');

/* --- Transiciones entre las vistas --- */
.page-enter-active {

  transition: all 0.4s ease-out;

}

.page-leave-active {

  transition: all 0.3s ease-in;

}

.page-enter-from {

  opacity: 0;
  transform: scale(0.98);

}

.page-enter-to {

  opacity: 1;
  transform: scale(1);

}

.page-leave-from {

  opacity: 1;
  transform: scale(1);

}

.page-leave-to {

  opacity: 0;
  transform: scale(1.02);

}

/* --- Estilos generales --- */
* {

  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

html, body {

  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Geist';

}

#app {

  width: 100vw;
  height: 100vh;
  overflow: hidden;

}

</style>
