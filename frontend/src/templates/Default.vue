<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { useLoginStore } from "@/stores/login";

import ButtonDrawerMobile from "@/components/Flowbite/ButtonDrawerMobile.vue";
import DrawerMobile from "@/components/Flowbite/DrawerMobile.vue";
import MenuLink from "@/components/Flowbite/Menu/MenuLink.vue";
import DropdownMenu from "@/components/Flowbite/Menu/DropdownMenu.vue";
import iconComponent from "@/components/Fontawesome/IconComponent.vue";
import { useAutorizacaoStore } from "@/stores/Permissoes/autorizacaoStore";
import { initAccordions, initCollapses, initDropdowns, initPopovers, initTooltips } from "flowbite";

defineOptions({ name: "template padrão" });
const isMobile = ref(window.innerWidth <= 768 && window.innerHeight <= 1024);
const darkMode = ref(localStorage.getItem("darkMode"));
const store = useMainStore();
function checkMobile() {
  isMobile.value = window.innerWidth <= 768 && window.innerHeight <= 1024;
}
const menuItens = ref([])

const emit = defineEmits(["toggleDarkMode", "darkMode"]);
const toggleDarkMode = () => {
  store.darkMode = !store.darkMode;
  emit("darkMode", darkMode.value);
  localStorage.setItem("darkMode", JSON.stringify(darkMode.value));
};
onMounted(async () => {
  initTooltips();
  initPopovers();
  initCollapses();
  window.addEventListener('resize', checkMobile);
  await useLoginStore().checkToken();
  menuItens.value = [
    { 
      name: "Usuários", 
      href: "/usuarios/lista", 
      show: useAutorizacaoStore().isAdmin 
    },
    {
      name: "Grupos",
      href: "/grupos/lista",
      show: useAutorizacaoStore().isAdmin
    }
  ];
});
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});


</script>
<template>
  <div class="bg-gray-100 text-white">
    <router-view :class="{ 'isMobile': isMobile }"
      class="overflow-auto p-4 bg-gray-100 ml-64 dark:bg-gray-900 h-screen"></router-view>

    <DrawerMobile v-if="isMobile">
      <ButtonDrawerMobile to="/" nome="Dashboard">
        <iconComponent icon="clock" />
      </ButtonDrawerMobile>
      <ButtonDrawerMobile v-if="useAutorizacaoStore().isAdmin" to="/perfil" nome="Configs">
        <iconComponent icon="gears" />
      </ButtonDrawerMobile>
    </DrawerMobile>


    <aside v-if="!isMobile" id="default-sidebar"
      class="dark:bg-gray-800 bg-gray-50 flex flex-col justify-between p-4 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidenav">

      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <MenuLink icon="clock" label="Dashboard" para="/" />
          <DropdownMenu icon="user" :links="menuItens" name="Administração" />
          <MenuLink icon="scale-balanced" label="Financeiro" para="/" />
        </ul>
      </div>

      <div>
        <div class="flex flex-col mt-6">
          <label class="inline-flex items-center mb-5 cursor-pointer" @change="toggleDarkMode">
            <input type="checkbox" v-model="darkMode" value="" class="sr-only peer" />
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
            </div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Modo escuro</span>
          </label>
        </div>
        <div class="py-4 overflow-y-auto">
          <ul class="space-y-2 font-medium">
            <MenuLink icon="right-from-bracket" @click="useLoginStore().logout()" label="Sair" />
          </ul>
        </div>
      </div>
    </aside>

  </div>
</template>
<style scoped>
.isMobile {
  height: calc(100vh - 64px);
  margin-left: 0;
}
</style>
