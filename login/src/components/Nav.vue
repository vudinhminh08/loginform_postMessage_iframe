<script setup>
import { useAuthStore } from "@/stores";
const authStore = useAuthStore();
const deleteCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
const logout = () => {
  deleteCookie("token");
  deleteCookie("userFromAAP");
  authStore.logout();
};
</script>

<template>
  <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-nav">
      <router-link to="/" class="nav-item nav-link">Home</router-link>
      <router-link to="/users" class="nav-item nav-link">Users</router-link>
      <button @click="logout" class="btn btn-link nav-item nav-link">
        Logout
      </button>
    </div>
  </nav>
</template>
