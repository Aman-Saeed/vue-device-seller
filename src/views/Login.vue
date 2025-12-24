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
        @submit.prevent="handleLogin"
        novalidate
        :class="submitted ? 'was-validated' : ''"
      >
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
          Sign In
        </button>
      </form>

      <router-link to="/register" class="btn btn-link" style="color: black">
        Create New account? Sign up
      </router-link>
    </div>
  </div>
</template>

<script>
import authenticationService from "@/services/authentication.service";
import User from "@/models/user";
import vuex from "vuex";

export default {
  name: "login-page",
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
    ...vuex.mapActions(["updateUser"]),
    handleLogin() {
      if (!this.FormData.username || !this.FormData.password) {
        return;
      }
      this.loading = true;

      authenticationService
        .login(this.FormData)
        .then((response) => {
          console.debug("login response.data:", response.data);
          this.updateUser(response.data);
          console.debug("normalized currentUser (store):", this.currentUser);
          console.debug("logged-in role:", this.currentUser?.role);
          this.$router.push("/profile");
        })
        .catch((err) => {
          console.log(err);

          this.errorMessage = "Unexpected error occurred during login.";
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
