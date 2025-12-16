<template>
  <div class="unauthorized">
    <div class="card" role="region" aria-labelledby="ua-title">
      <div class="illustration" aria-hidden="true">
        <!-- Lock / Forbidden SVG -->
        <svg
          width="140"
          height="140"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="26"
            width="48"
            height="28"
            rx="4"
            fill="#FFF5F3"
            stroke="#FFD6CC"
            stroke-width="2"
          />
          <path
            d="M20 26v-4a12 12 0 1 1 24 0v4"
            stroke="#FF8A65"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <circle cx="32" cy="40" r="3" fill="#FF8A65" />
        </svg>
      </div>

      <div class="content">
        <h1 id="ua-title">403</h1>
        <h2>Unauthorized</h2>
        <p>
          You don't have permission to access this page. If you think this is a
          mistake, contact your administrator or request access.
        </p>

        <div class="actions">
          <router-link class="btn btn-primary" to="/home"
            >Go to Home</router-link
          >
          <a class="btn" href="mailto:support@example.com">Contact Support</a>
          <button class="btn" @click="goBack">Go back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Unauthorized-Page",
  methods: {
    goBack() {
      if (window.history.length > 1) this.$router.go(-1);
      else this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.unauthorized {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: linear-gradient(180deg, #fff8f6 0%, #ffffff 100%);
}

.card {
  display: flex;
  align-items: center;
  gap: 24px;
  max-width: 880px;
  width: 100%;
  padding: 26px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(197, 117, 86, 0.08);
}

.illustration {
  flex: 0 0 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.content h1 {
  margin: 0;
  font-size: 48px;
  color: #b44a27;
}

.content h2 {
  margin: 6px 0 10px 0;
  font-size: 20px;
  color: #5b3b2a;
  font-weight: 600;
}

.content p {
  margin: 0 0 16px 0;
  color: #6f4b3a;
  max-width: 520px;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  color: #b44a27;
  font-weight: 600;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(90deg, #ff8a65 0%, #ff6f42 100%);
  color: #fff;
  box-shadow: 0 6px 12px rgba(255, 111, 66, 0.12);
  border: none;
}

@media (max-width: 640px) {
  .card {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
  .illustration {
    margin-bottom: 12px;
  }
}
</style>
