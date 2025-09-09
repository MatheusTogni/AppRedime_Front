<template>
  <v-container fluid class="fill-height pa-0" style="background-color: #121212">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="10" md="4" lg="5" class="d-flex">
        <v-card class="message-card flex-grow-1" elevation="8">
        <!-- Hero Section Inside Card -->
        <v-card-text class="pa-4 text-center">
          <div class="hero-content mb-4">
            <v-icon
              size="48"
              icon="mdi-heart"
              color="#af1d36"
              class="heart-icon mb-3"
            ></v-icon>

            <h1 class="text-h4 font-weight-bold mb-3" style="color: #af1d36">
              Faça uma Doação
            </h1>

            <p class="text-subtitle-1 mb-2" style="color: #fff; line-height: 1.3">
              Sua contribuição faz a diferença
            </p>
            <p class="text-body-2" style="color: #aaa; font-weight: 300">
              Juntos, podemos alcançar mais vidas
            </p>
          </div>

          <!-- Tutorial Section -->
          <v-divider class="mb-4" color="rgba(175, 29, 54, 0.3)"></v-divider>

          <div class="tutorial-section">
            <div class="text-center mb-3">
              <h3 class="text-h6 mb-3" style="color: #af1d36; font-weight: 600">
                Como Doar
              </h3>
            </div>

            <div class="steps-container">
              <div class="step-item mb-2">
                <div class="d-flex align-center">
                  <div class="step-icon-small mr-2">
                    <v-icon icon="mdi-qrcode-scan" color="#af1d36" size="20"></v-icon>
                  </div>
                  <div class="text-left">
                    <h4 class="text-body-1 mb-0" style="color: #fff">
                      1. Escaneie ou Copie
                    </h4>
                    <p class="text-body-2" style="color: #aaa">
                      Use o QR Code ou copie a chave PIX
                    </p>
                  </div>
                </div>
              </div>

              <div class="step-item mb-2">
                <div class="d-flex align-center">
                  <div class="step-icon-small mr-2">
                    <v-icon icon="mdi-currency-usd" color="#af1d36" size="20"></v-icon>
                  </div>
                  <div class="text-left">
                    <h4 class="text-body-1 mb-0" style="color: #fff">
                      2. Escolha o Valor
                    </h4>
                    <p class="text-body-2" style="color: #aaa">
                      Defina o valor da sua contribuição
                    </p>
                  </div>
                </div>
              </div>

              <div class="step-item">
                <div class="d-flex align-center">
                  <div class="step-icon-small mr-2">
                    <v-icon icon="mdi-check-circle" color="#af1d36" size="20"></v-icon>
                  </div>
                  <div class="text-left">
                    <h4 class="text-body-1 mb-0" style="color: #fff">3. Confirme</h4>
                    <p class="text-body-2" style="color: #aaa">
                      Finalize sua doação no app bancário
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

      <!-- Right Card - QR Code and PIX Key -->
      <v-col cols="12" sm="10" md="4" lg="5" class="d-flex">
        <v-card class="donation-card flex-grow-1" elevation="8">
        <!-- QR Code Section -->
        <v-card-text class="pa-4 text-center">
          <div class="mb-4">
            <div class="d-flex align-center justify-center mb-3">
              <v-icon size="24" icon="mdi-qrcode" color="#af1d36" class="mr-2"></v-icon>
              <span class="text-h6" style="color: #af1d36; font-weight: 600"
                >QR Code PIX</span
              >
            </div>

            <div class="qr-wrapper mb-3">
              <v-img src="/qrcode.png" width="180" height="180" class="mx-auto qr-image">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                      indeterminate
                      color="#af1d36"
                      size="30"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </div>
          </div>

          <v-divider class="mb-4" color="rgba(175, 29, 54, 0.3)"></v-divider>

          <div class="pix-section">
            <div class="pix-key-container">
              <v-text-field
                v-model="pixKey"
                label="CNPJ da Igreja"
                variant="outlined"
                readonly
                bg-color="rgba(255, 255, 255, 0.05)"
                class="mb-3 pix-input"
                prepend-inner-icon="mdi-domain"
                density="compact"
              >
                <template v-slot:append-inner>
                  <v-btn
                    icon="mdi-content-copy"
                    variant="text"
                    color="#af1d36"
                    @click="copyPixKey"
                    class="copy-btn"
                    size="small"
                  ></v-btn>
                </template>
              </v-text-field>

              <v-btn
                block
                size="default"
                color="#af1d36"
                prepend-icon="mdi-content-copy"
                @click="copyPixKey"
                class="copy-button"
              >
                Copiar Chave PIX
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      color="#af1d36"
      location="top"
      class="custom-snackbar"
    >
      <v-icon icon="mdi-check-circle" class="mr-2"></v-icon>
      Chave PIX copiada com sucesso!
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const snackbar = ref(false);
const pixKey = ref("60.631.566/0001-43");

const copyPixKey = async () => {
  try {
    await navigator.clipboard.writeText(pixKey.value);
    snackbar.value = true;
  } catch (err) {
    console.error("Erro ao copiar:", err);
  }
};
</script>

<style scoped>
.v-container {
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 50%, #121212 100%);
  min-height: 80vh;
}

.v-row {
  gap: 16px;
  padding: 16px;
}

.v-col {
  padding: 0;
}

.message-card,
.donation-card {
  background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
  border: 1px solid #333;
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}

.message-card::before,
.donation-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(175, 29, 54, 0.02) 0%, transparent 50%);
  pointer-events: none;
}


.heart-icon {
  animation: heartBeat 2.5s infinite;
  filter: drop-shadow(0 0 20px rgba(175, 29, 54, 0.4));
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
    filter: drop-shadow(0 0 20px rgba(175, 29, 54, 0.4));
  }
  14% {
    transform: scale(1.15);
    filter: drop-shadow(0 0 25px rgba(175, 29, 54, 0.6));
  }
  28% {
    transform: scale(1);
    filter: drop-shadow(0 0 20px rgba(175, 29, 54, 0.4));
  }
  42% {
    transform: scale(1.15);
    filter: drop-shadow(0 0 25px rgba(175, 29, 54, 0.6));
  }
  70% {
    transform: scale(1);
    filter: drop-shadow(0 0 20px rgba(175, 29, 54, 0.4));
  }
}

/* QR Code Styling */
.qr-wrapper {
  border: 2px solid #af1d36;
  border-radius: 16px;
  padding: 12px;
  display: inline-block;
  background: linear-gradient(135deg, #fff, #f8f8f8);
  box-shadow: 0 4px 16px rgba(175, 29, 54, 0.25);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

.qr-wrapper:hover::before {
  opacity: 0.3;
}

.qr-image {
  border-radius: 16px;
  overflow: hidden;
}

/* PIX Key Container */
.pix-key-container {
  background: linear-gradient(
    135deg,
    rgba(175, 29, 54, 0.08) 0%,
    rgba(175, 29, 54, 0.03) 100%
  );
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(175, 29, 54, 0.15);
  position: relative;
  overflow: hidden;
}

.pix-key-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #af1d36, transparent);
  opacity: 0.6;
}

.copy-button {
  border-radius: 16px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.8px;
  background: linear-gradient(135deg, #af1d36, #c41e3a) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.copy-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.copy-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(175, 29, 54, 0.5);
}

.copy-button:hover::before {
  left: 100%;
}

.copy-btn {
  border-radius: 12px;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: rgba(175, 29, 54, 0.1) !important;
  transform: scale(1.1);
}

/* New Sections Styling */
.instruction-text {
  padding: 16px;
  border-radius: 16px;
  background: rgba(175, 29, 54, 0.05);
  border: 1px solid rgba(175, 29, 54, 0.1);
}

/* Tutorial Steps Styling */
.tutorial-section {
  position: relative;
  z-index: 1;
}

.steps-container {
  max-width: 400px;
  margin: 0 auto;
}

.step-item {
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.step-icon-small {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(175, 29, 54, 0.1), rgba(175, 29, 54, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(175, 29, 54, 0.2);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

/* Hero Content Inside Card */
.hero-content {
  position: relative;
  z-index: 1;
}

/* PIX Input Styling */
.pix-input {
  font-size: 1.1rem !important;
}

.pix-input :deep(.v-field__input) {
  font-size: 1.2rem !important;
  font-weight: 500;
  text-align: center;
  color: #fff !important;
}

/* Timeline Styling */
.custom-timeline {
  padding: 0 16px;
}

.step-number {
  background: #af1d36;
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  margin-right: 16px;
}

.step-content {
  padding: 8px 0;
}

.step-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
}

.step-content p {
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Text Field Styling */
:deep(.v-text-field .v-field) {
  background-color: rgba(255, 255, 255, 0.05) !important;
  border-radius: 16px;
  border: 2px solid rgba(175, 29, 54, 0.2);
  transition: all 0.3s ease;
}

:deep(.v-text-field .v-field:hover) {
  border-color: rgba(175, 29, 54, 0.5);
  background-color: rgba(255, 255, 255, 0.08) !important;
}

:deep(.v-text-field .v-field--focused) {
  border-color: #af1d36;
  box-shadow: 0 0 0 3px rgba(175, 29, 54, 0.15);
  background-color: rgba(255, 255, 255, 0.08) !important;
}

/* Timeline Styling Override */
:deep(.v-timeline-item .v-timeline-item__body) {
  padding-bottom: 24px !important;
}

:deep(.v-timeline .v-timeline-item__dot) {
  box-shadow: 0 2px 8px rgba(175, 29, 54, 0.3);
}

/* Chip Styling */
:deep(.v-chip) {
  border-radius: 12px;
  font-weight: 500;
  padding: 0 16px;
}

/* Card Title Styling */
:deep(.v-card-title) {
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Snackbar Styling */
.custom-snackbar :deep(.v-snackbar__wrapper) {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (min-width: 1920px) {
  .qr-wrapper {
    padding: 16px;
  }

  .qr-image {
    width: 200px !important;
    height: 200px !important;
  }

  .pix-key-container {
    padding: 20px;
  }

  .message-card .v-card-text {
    padding: 32px !important;
  }
}

@media (max-width: 1264px) {
  .qr-image {
    width: 180px !important;
    height: 180px !important;
  }
}

@media (max-width: 960px) {
  .qr-wrapper {
    padding: 10px;
  }

  .qr-image {
    width: 160px !important;
    height: 160px !important;
  }

  .pix-key-container {
    padding: 12px;
  }

  .step-item {
    padding: 6px 10px;
    margin-bottom: 6px;
  }

  .step-icon-small {
    width: 32px;
    height: 32px;
  }

  .message-card .v-card-text {
    padding: 20px !important;
  }

  .donation-card .v-card-text {
    padding: 16px !important;
  }
}

@media (max-width: 576px) {
  .v-container {
    min-height: 100vh;
  }

  .v-row {
    gap: 0;
    padding: 16px;
    justify-content: center;
  }

  /* Esconder o card com tutorial no mobile */
  .v-col:first-child {
    display: none !important;
  }

  /* Card do QR Code ocupa toda a largura disponível */
  .v-col:last-child {
    max-width: 400px;
    width: 100%;
  }

  .qr-image {
    width: 160px !important;
    height: 160px !important;
  }

  .pix-key-container {
    padding: 16px;
  }

  .copy-button {
    height: 48px !important;
    font-size: 1rem;
  }

  .donation-card .v-card-text {
    padding: 24px !important;
  }

  .donation-card {
    height: auto;
    max-width: none;
  }

  /* Ajuste específico para o QR wrapper em mobile */
  .qr-wrapper {
    padding: 12px;
  }

  /* Título do QR Code maior em mobile */
  .donation-card .text-h6 {
    font-size: 1.25rem !important;
  }
}
</style>
