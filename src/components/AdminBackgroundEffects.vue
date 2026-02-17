<template>
  <div class="background-effects">
    <div class="gold-glow glow-top-right"></div>
    <div class="gold-glow glow-bottom-left"></div>
  </div>
</template>

<script>
export default {
  name: 'AdminBackgroundEffects'
}
</script>

<style scoped>
.background-effects {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.gold-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: glow-pulse 8s ease-in-out infinite;
}

.glow-top-right {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
  top: -20%;
  right: -10%;
  animation-delay: 0s;
}

.glow-bottom-left {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
  bottom: -15%;
  left: -10%;
  animation-delay: 4s;
}

@keyframes glow-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}
</style>
