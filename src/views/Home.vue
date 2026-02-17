<template>
  <div class="page-container">
    <Navbar />

    <!-- Hero Section -->
    <main class="main-hero-section">
      <div class="hero-container">
        <h2 class="main-heading">
          Where Music<br>
          Meets Magic
        </h2>
        <p class="hero-description">
          Join thousands of music lovers at the most anticipated festival of the year
        </p>
        <div class="action-buttons-container">
          <button class="action-button-primary">View Activities</button>
        </div>
      </div>
    </main>

    <BackgroundEffects />

  </div>
  
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import BackgroundEffects from '@/components/BackgroundEffects.vue'

export default {
  name: 'HomePage',
  components: {
    Navbar,
    BackgroundEffects
  }
}
</script>

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

/* ========================================
   HERO SECTION
======================================== */

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

.action-buttons-container {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
}

.action-button-primary,
.action-button-secondary {
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Geist', sans-serif;
  letter-spacing: -0.3px;
}

.action-button-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: #ffffff;
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.action-button-primary:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  box-shadow: 0 16px 50px rgba(139, 92, 246, 0.5);
  transform: translateY(-3px);
}

.action-button-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.action-button-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

</style>