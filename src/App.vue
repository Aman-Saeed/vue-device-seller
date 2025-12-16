<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a
        class="navbar-brand ms-1"
        href="https://vuejs.org"
        target="_blank"
        rel="noopener"
      >
        <img
          src="@/assets/logo.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        Vue
      </a>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-3">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link" active-class="active"
              >Admin</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/home" class="nav-link" active-class="active"
              >Home</router-link
            >
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/register" class="nav-link" active-class="active"
              >Sign Up</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" active-class="active"
              >Sign In</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>

  <div class="container">
    <router-view />
  </div>
</template>

<script></script>

<style></style>
