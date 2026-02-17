<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="in-out">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap');

/* Page Transition - Smooth cross-fade with subtle scale */
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
