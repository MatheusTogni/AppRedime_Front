<template>
  <v-container class="fill-height pa-0">
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12" sm="10" md="8" lg="6" class="donation-wrapper text-center pa-4">
        <v-icon
          size="48"
          icon="mdi-heart"
          color="#af1d36"
          class="heart-icon mb-2"
        ></v-icon>

        <h1 class="text-h4 font-weight-medium mb-5" style="color: #fff">
          Faça uma Doação
        </h1>

        <p class="text-h6 px-4 mb-3" style="color: #af1d36">
          "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação,
          pois Deus ama quem dá com alegria."
        </p>
        <p class="text-subtitle-2 mb-8" style="color: #666">2 Coríntios 9:7</p>

        <div class="qr-wrapper mb-10">
          <v-img src="/qrcode.png" width="320" height="320" class="mx-auto">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="#af1d36"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>

        <div class="pix-key-wrapper d-inline-flex align-center">
          <span class="text-h6" style="color: #af1d36; letter-spacing: 0.5px">
            60.631.566/0001-43
          </span>
          <v-btn
            icon="mdi-content-copy"
            variant="text"
            density="comfortable"
            size="small"
            class="ml-2"
            color="#af1d36"
            @click="copyPixKey"
          ></v-btn>
        </div>

        <v-snackbar v-model="snackbar" :timeout="2000" color="#af1d36" location="top">
          Chave PIX copiada com sucesso!
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const snackbar = ref(false);

const copyPixKey = async () => {
  try {
    await navigator.clipboard.writeText("60.631.566/0001-43");
    snackbar.value = true;
  } catch (err) {
    console.error("Erro ao copiar:", err);
  }
};
</script>

<style scoped>
.donation-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.heart-icon {
  animation: pulse 3s infinite;
}

.qr-wrapper {
  border: 2px solid #af1d36;
  border-radius: 12px;
  padding: 12px;
  display: inline-block;
  background: #fff;
}

.pix-key-wrapper {
  background: rgba(175, 29, 54, 0.08);
  border-radius: 8px;
  padding: 12px 20px;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 600px) {
  .donation-wrapper {
    padding: 16px !important;
  }
}
</style>
