<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Redime App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'left' : undefined"
      temporary
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-home"
          title="Início"
          value="home"
          to="/"
          @click="drawer = false"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-book-open-page-variant"
          title="Bíblia"
          value="biblia"
          to="/biblia"
          @click="drawer = false"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-post"
          title="Postagens"
          value="postagens"
          to="/postagens"
          @click="drawer = false"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-hand-coin"
          title="Doações"
          value="doacoes"
          to="/doacoes"
          @click="drawer = false"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-file-download"
          title="Arquivos"
          value="arquivos"
          to="/arquivos"
          @click="drawer = false"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-shield-crown"
          title="Administração"
          value="administracao"
          to="/administracao"
          @click="drawer = false"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const drawer = ref(false);
const group = ref(null);

watch(group, () => {
  drawer.value = false;
});
</script>
