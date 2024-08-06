<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores";
const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

onMounted(() => {
  const authStore = useAuthStore();
  console.log(getCookie("token"));
  if (getCookie("token")) {
    authStore.login("admin", "123456");
    let message = {
      type: "login",
      token: "fake-jwt-token",
    };
    window.parent.postMessage(message, "http://localhost:5173/myharvest");
  }
});

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

async function onSubmit(values) {
  const authStore = useAuthStore();
  const { username, password } = values;
  let message = {
    type: "login",
    token: "fake-jwt-token",
  };
  window.parent.postMessage(message, "http://localhost:5173/myharvest");
  await authStore.login(username, password);
}
const deleteCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
window.addEventListener("message", function (event) {
  if (event.origin !== "http://localhost:5173") {
    return;
  }
  if (event.data) {
    console.log("Message received from parent My harvest:", event.data);
    if (event.data === "logoutAAP") {
      deleteCookie("token");
    }
  }
});
</script>

<template>
  <div class="card m-3">
    <h4 class="card-header">Login</h4>
    <div class="card-body">
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
      >
        <div class="form-group">
          <label>Username</label>
          <Field
            name="username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.username }"
          />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-group">
          <label>Password</label>
          <Field
            name="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="isSubmitting">
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            Login
          </button>
          <router-link to="register" class="btn btn-link">Register</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
