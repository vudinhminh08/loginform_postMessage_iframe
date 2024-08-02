<script setup>
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const openMyHarvest = () => {
  var iframe = document.getElementById("loginIframe");
  iframe.src = "http://localhost:5173/myharvest/";
  iframe.style.display = "block";
  iframe.style.width = "80%";
  iframe.style.height = "500px";
  //   window.parent.postMessage("123123123", "http://localhost:5173/myharvest");
  let message = "13123123";
  iframe.contentWindow.postMessage(message, "http://localhost:5173/myharvest");
};
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
const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
</script>

<template>
  <div v-if="user">
    <h1>Hi {{ user.firstName }}!</h1>
    <p>You're logged in</p>
    <p><router-link to="/users">Manage Users</router-link></p>
    <button @click="openMyHarvest">Open myharvest</button>
    <iframe id="loginIframe" src="" style="display: none"></iframe>
  </div>
</template>
