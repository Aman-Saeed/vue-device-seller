<template>
  <div class="container mt-5">
    <div class="card ms-auto me-auto p-3 shadow-lg custom-card">
      <font-awesome-icon
        icon="user-circle"
        class="user-icon ms-auto me-auto mb-3"
      />
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <form
        @submit.prevent="handleRegister"
        novalidate
        :class="submitted ? 'was-validated' : ''"
      >
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="FormData.name"
            class="form-control"
            placeholder="Enter your full name"
            required
          />
          <div class="invalid-feedback">Full name is required.</div>
        </div>

        <div class="form-group">
          <label for="name">Username</label>
          <input
            type="text"
            id="username"
            v-model="FormData.username"
            class="form-control"
            placeholder="Enter your username"
            required
          />
          <div class="invalid-feedback">Username is required.</div>
        </div>

        <div class="form-group">
          <label for="name">Password</label>
          <input
            type="password"
            id="password"
            v-model="FormData.password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
          <div class="invalid-feedback">Password is required.</div>
        </div>

        <button
          class="btn btn-success w-100 mt-3"
          @click="submitted = true"
          :disabled="loading"
        >
          Sign Up
        </button>
      </form>

      <router-link to="/login" class="btn btn-link" style="color: black">
        Already have an account? Log in
      </router-link>
    </div>
  </div>
</template>

<script>
import authenticationService from "@/common/services/authentication.service";
import User from "@/models/user";
import vuex from "vuex";

export default {
  name: "register-page",
  data() {
    return {
      FormData: new User(),
      loading: false,
      submitted: false,
      errorMessage: "",
    };
  },

  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },
  mounted() {
    if (this.currentUser?.username) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      if (
        !this.FormData.username ||
        !this.FormData.password ||
        !this.FormData.name
      ) {
        return;
      }
      this.loading = true;

      authenticationService
        .register(this.FormData)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.error("Registration error", err);

          // Prefer a descriptive server message when available
          const serverMessage =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message;

          if (err?.response?.status === 409) {
            this.errorMessage =
              "Username already exists. Please choose another one.";
          } else if (serverMessage) {
            this.errorMessage = serverMessage;
          } else {
            this.errorMessage =
              "An error occurred during registration. Please try again later.";
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.custom-card {
  width: 350px;
  max-width: 100%;

  background-color: #a8bd88;
}
.user-icon {
  font-size: 100px;
  color: #35495e;
}
</style>
