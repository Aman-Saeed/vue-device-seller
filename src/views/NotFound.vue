<template>
  <div class="not-found">
    <div class="card" role="region" aria-labelledby="nf-title">
      <div class="illustration" aria-hidden="true">
        <!-- Simple magnifier/compass SVG illustration -->
        <svg
          width="160"
          height="160"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="28"
            cy="28"
            r="16"
            stroke="#E6EEF8"
            stroke-width="4"
            fill="#F7FBFF"
          />
          <path
            d="M36 36l12 12"
            stroke="#9FBCE9"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M26 20a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"
            fill="#6EA0E6"
            opacity="0.12"
          />
        </svg>
      </div>

      <div class="content">
        <h1 id="nf-title">404</h1>
        <h2>Page not found</h2>
        <p>
          Sorry — the page you're looking for doesn't exist or has been moved.
          Try returning home or go back to the previous page.
        </p>

        <div class="actions">
          <router-link class="btn btn-primary" to="/home"
            >Go to Home</router-link
          >
          <button class="btn" @click="goBack">Go back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    goBack() {
      // If there is history, go back; otherwise, go home
      if (window.history.length > 1) this.$router.go(-1);
      else this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);
}

.card {
  display: flex;
  align-items: center;
  gap: 28px;
  max-width: 880px;
  width: 100%;
  padding: 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(42, 80, 141, 0.08);
}

.illustration {
  flex: 0 0 160px;
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
  font-size: 56px;
  color: #2b4f7a;
  line-height: 1;
}

.content h2 {
  margin: 6px 0 12px 0;
  font-size: 20px;
  color: #34495e;
  font-weight: 600;
}

.content p {
  margin: 0 0 18px 0;
  color: #5b6b80;
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
  color: #2b4f7a;
  font-weight: 600;
}

.btn-primary {
  background: linear-gradient(90deg, #4d8cf0 0%, #3b7be6 100%);
  color: #fff;
  box-shadow: 0 6px 12px rgba(61, 107, 199, 0.12);
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
