<template>
  <v-container fluid class="fill-height pa-0" style="background-color: #121212">
    <!-- Hero Section -->
    <v-row justify="center" align="center" class="hero-section mb-8">
      <v-col cols="12" class="text-center pa-8">
        <v-icon
          size="80"
          icon="mdi-heart"
          color="#af1d36"
          class="heart-icon mb-4"
        ></v-icon>
        
        <h1 class="text-h3 font-weight-bold mb-4" style="color: #af1d36">
          Faça uma Doação
        </h1>
        
        <p class="text-h6 mb-2" style="color: #fff; max-width: 600px; margin: 0 auto;">
          Sua contribuição faz a diferença em nossa missão
        </p>
        <p class="text-subtitle-1" style="color: #999">
          Juntos, podemos alcançar mais vidas
        </p>
      </v-col>
    </v-row>
    <v-row justify="center" class="px-4">
      <v-col cols="12" md="8" lg="6">
        <v-card
          class="qr-card mb-6"
          elevation="8"
          
        >
          <v-card-title class="text-center pa-6 pb-4">
            <v-icon
              size="32"
              icon="mdi-qrcode"
              color="#af1d36"
              class="mr-2"
            ></v-icon>
            <span class="text-h5" style="color: #af1d36">QR Code PIX</span>
          </v-card-title>
          
          <v-card-text class="text-center pa-6">
            <div class="qr-wrapper mb-4">
              <v-img 
                src="/qrcode.png" 
                width="280" 
                height="280" 
                class="mx-auto qr-image"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular 
                      indeterminate 
                      color="#af1d36"
                      size="48"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </div>
            
            <p class="text-body-1 mb-4" style="color: #ccc">
              Escaneie o QR Code com seu app bancário
            </p>
          </v-card-text>
        </v-card>

        <!-- PIX Key Card -->
        <v-card
          class="pix-card mb-6"
          elevation="8"
        >
          <v-card-title class="text-center pa-6 pb-4">
            <v-icon
              size="32"
              icon="mdi-key-variant"
              color="#af1d36"
              class="mr-2"
            ></v-icon>
            <span class="text-h5" style="color: #af1d36">Chave PIX</span>
          </v-card-title>
          
          <v-card-text class="pa-6">
            <div class="pix-key-container">
              <v-text-field
                v-model="pixKey"
                label="CNPJ da Igreja"
                variant="outlined"
                readonly
                bg-color="rgba(255, 255, 255, 0.05)"
                class="mb-4"
                prepend-inner-icon="mdi-domain"
              >
                <template v-slot:append-inner>
                  <v-btn
                    icon="mdi-content-copy"
                    variant="text"
                    color="#af1d36"
                    @click="copyPixKey"
                    class="copy-btn"
                  ></v-btn>
                </template>
              </v-text-field>
              
              <v-btn
                block
                size="large"
                color="#af1d36"
                prepend-icon="mdi-content-copy"
                @click="copyPixKey"
                class="copy-button"
              >
                Copiar Chave PIX
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>

    <!-- Success Snackbar -->
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
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  min-height: 300px;
}

/* Cards Styling */
.verse-card,
.qr-card,
.pix-card,
.instructions-card {
  background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
  border: 1px solid #333;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.verse-card:hover,
.qr-card:hover,
.pix-card:hover,
.instructions-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(175, 29, 54, 0.2) !important;
  border-color: rgba(175, 29, 54, 0.3);
}

/* Heart Animation */
.heart-icon {
  animation: pulse 3s infinite;
  filter: drop-shadow(0 0 10px rgba(175, 29, 54, 0.3));
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

/* QR Code Styling */
.qr-wrapper {
  border: 3px solid #af1d36;
  border-radius: 20px;
  padding: 16px;
  display: inline-block;
  background: linear-gradient(45deg, #fff, #f8f8f8);
  box-shadow: 0 4px 15px rgba(175, 29, 54, 0.2);
  transition: all 0.3s ease;
}

.qr-wrapper:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 20px rgba(175, 29, 54, 0.3);
}

.qr-image {
  border-radius: 12px;
  overflow: hidden;
}

/* PIX Key Container */
.pix-key-container {
  background: rgba(175, 29, 54, 0.05);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(175, 29, 54, 0.1);
}

.copy-button {
  border-radius: 12px;
  height: 48px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  background: linear-gradient(45deg, #af1d36, #c41e3a) !important;
}

.copy-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(175, 29, 54, 0.4);
}

.copy-btn {
  border-radius: 8px;
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
  background-color: rgba(255, 255, 255, 0.03) !important;
  border-radius: 12px;
  border: 1px solid rgba(175, 29, 54, 0.2);
}

:deep(.v-text-field .v-field:hover) {
  border-color: rgba(175, 29, 54, 0.4);
}

:deep(.v-text-field .v-field--focused) {
  border-color: #af1d36;
  box-shadow: 0 0 0 2px rgba(175, 29, 54, 0.1);
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
@media (max-width: 960px) {
  .hero-section .v-col {
    padding: 32px 16px !important;
  }
  
  .qr-wrapper {
    padding: 12px;
  }
  
  .qr-image {
    width: 240px !important;
    height: 240px !important;
  }
  
  .step-number {
    width: 28px;
    height: 28px;
    font-size: 13px;
  }
}

@media (max-width: 600px) {
  .hero-section {
    min-height: 250px;
  }
  
  .hero-section h1 {
    font-size: 2rem !important;
  }
  
  .qr-image {
    width: 200px !important;
    height: 200px !important;
  }
  
  .pix-key-container {
    padding: 16px;
  }
  
  .verse-card .text-h6 {
    font-size: 1.1rem !important;
  }
}
</style>
