<template>
  <v-app>
    <v-app-bar color="primary" elevation="2" height="64">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" size="large">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold"> Redime </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary width="280" elevation="4">
      <v-list density="comfortable" nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="Início"
          value="home"
          to="/"
          @click="drawer = false"
          rounded="xl"
          class="mx-2 mb-1"
          color="primary"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-book-open-page-variant"
          title="Bíblia"
          value="biblia"
          to="/biblia"
          @click="drawer = false"
          rounded="xl"
          class="mx-2 mb-1"
          color="primary"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-post"
          title="Postagens"
          value="postagens"
          to="/postagens"
          @click="drawer = false"
          rounded="xl"
          class="mx-2 mb-1"
          color="primary"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-hand-coin"
          title="Doações"
          value="doacoes"
          to="/doacoes"
          @click="drawer = false"
          rounded="xl"
          class="mx-2 mb-1"
          color="primary"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-file-download"
          title="Ministrações"
          value="arquivos"
          to="/arquivos"
          @click="drawer = false"
          rounded="xl"
          class="mx-2 mb-1"
          color="primary"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-calendar-text"
          title="Eventos"
          value="eventos"
          to="/eventos"
          @click="drawer = false"
          rounded="xl"
          class="mx-2 mb-1"
          color="primary"
        ></v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item
          prepend-icon="mdi-shield-crown"
          title="Administração"
          value="administracao"
          to="/login"
          @click="drawer = false"
          rounded="xl"
          class="mx-2 mb-1"
          color="orange"
        ></v-list-item>
      </v-list>

      <!-- Footer com versão -->
      <template v-slot:append>
        <div class="pa-4 text-center">
          <div class="text-caption text-grey-darken-1 mb-2">
            Redime App © 2025
          </div>
          <v-chip
            color="primary"
            variant="elevated"
            size="small"
            label
          >
            Versão 1.0.0
          </v-chip>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
    
    <!-- Toast Container Global -->
    <ToastContainer />
  </v-app>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import ToastContainer from "@/components/ToastContainer.vue";

const drawer = ref(false);
const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>
