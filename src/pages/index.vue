<template>
  <v-container fluid class="home-container pa-0">
    <v-container class="pa-8">
      <v-row justify="center" align="center" class="min-vh-100">
        <v-col cols="12" class="text-center">
          <div class="header-section mb-8">
            <v-icon size="80" color="#af1d36" class="church-icon mb-4">mdi-cross</v-icon>
            <h1 class="app-title mb-2">Igreja Redime</h1>
            <p class="app-subtitle mb-6">{{ versiculoDestaque.texto }}</p>
            <p class="verse-reference">{{ versiculoDestaque.referencia }}</p>
          </div>

          <div class="shortcuts-grid">
            <v-row justify="center" class="ma-0">
              <v-col cols="6" sm="4" md="4" class="pa-2">
                <v-card 
                  class="shortcut-card" 
                  elevation="8" 
                  hover
                  @click="navigateTo('/biblia')"
                >
                  <v-card-text class="text-center pa-6">
                    <v-icon size="48" color="#af1d36" class="mb-3">mdi-book-open-page-variant</v-icon>
                    <h3 class="shortcut-title">Bíblia</h3>
                    <p class="shortcut-description">Palavra de Deus</p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="6" sm="4" md="4" class="pa-2">
                <v-card 
                  class="shortcut-card" 
                  elevation="8" 
                  hover
                  @click="navigateTo('/postagens')"
                >
                  <v-card-text class="text-center pa-6">
                    <v-icon size="48" color="#af1d36" class="mb-3">mdi-post</v-icon>
                    <h3 class="shortcut-title">Postagens</h3>
                    <p class="shortcut-description">Notícias da Igreja</p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="6" sm="4" md="4" class="pa-2">
                <v-card 
                  class="shortcut-card" 
                  elevation="8" 
                  hover
                  @click="navigateTo('/doacoes')"
                >
                  <v-card-text class="text-center pa-6">
                    <v-icon size="48" color="#af1d36" class="mb-3">mdi-hand-coin</v-icon>
                    <h3 class="shortcut-title">Doações</h3>
                    <p class="shortcut-description">Contribuir via PIX</p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="6" sm="4" md="4" class="pa-2">
                <v-card 
                  class="shortcut-card" 
                  elevation="8" 
                  hover
                  @click="navigateTo('/arquivos')"
                >
                  <v-card-text class="text-center pa-6">
                    <v-icon size="48" color="#af1d36" class="mb-3">mdi-file-download</v-icon>
                    <h3 class="shortcut-title">Ministrações</h3>
                    <p class="shortcut-description">Downloads</p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="6" sm="4" md="4" class="pa-2">
                <v-card 
                  class="shortcut-card" 
                  elevation="8" 
                  hover
                  @click="navigateTo('/eventos')"
                >
                  <v-card-text class="text-center pa-6">
                    <v-icon size="48" color="#af1d36" class="mb-3">mdi-calendar</v-icon>
                    <h3 class="shortcut-title">Eventos</h3>
                    <p class="shortcut-description">Próximos Eventos</p>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col v-if="showAdminCard" cols="6" sm="4" md="3" class="pa-2">
                <v-card 
                  class="shortcut-card admin-card" 
                  elevation="8" 
                  hover
                  @click="navigateTo('/admin')"
                >
                  <v-card-text class="text-center pa-6">
                    <v-icon size="48" color="#af1d36" class="mb-3">mdi-shield-crown</v-icon>
                    <h3 class="shortcut-title">Admin</h3>
                    <p class="shortcut-description">Painel de Controle</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <div class="footer-section mt-8">
            <v-divider class="mb-4" style="border-color: rgba(175, 29, 54, 0.3);"></v-divider>
            <p class="footer-text">
              <v-icon size="16" color="#af1d36" class="mr-1">mdi-heart</v-icon>
              Desenvolvido com amor para a Igreja Redime
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      versiculos: [
        {
          texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
          referencia: "João 3:16"
        },
        {
          texto: "O Senhor é meu pastor, nada me faltará.",
          referencia: "Salmos 23:1"
        },
        {
          texto: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.",
          referencia: "Salmos 37:5"
        },
        {
          texto: "Tudo posso naquele que me fortalece.",
          referencia: "Filipenses 4:13"
        },
        {
          texto: "Buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.",
          referencia: "Mateus 6:33"
        },
        {
          texto: "Confia no Senhor de todo o teu coração e não te apoies em teu próprio entendimento.",
          referencia: "Provérbios 3:5"
        }
      ],
      versiculoDestaque: {
        texto: "",
        referencia: ""
      }
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    }
  },
  mounted() {
    this.versiculoDestaque = this.versiculos[Math.floor(Math.random() * this.versiculos.length)]
  }
}
</script>

<style scoped>
.home-container {
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 50%, #121212 100%);
  min-height: 100vh;
}

.header-section {
  margin-bottom: 3rem;
}

.church-icon {
  animation: glow 3s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 20px rgba(175, 29, 54, 0.5));
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 20px rgba(175, 29, 54, 0.5));
    transform: scale(1);
  }
  to {
    filter: drop-shadow(0 0 25px rgba(175, 29, 54, 0.7));
    transform: scale(1.05);
  }
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #af1d36;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
  font-size: 1.1rem;
  color: #ffffff;
  font-style: italic;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Georgia', serif;
}

.verse-reference {
  font-size: 0.95rem;
  color: #af1d36;
  font-weight: 600;
}

.shortcuts-grid {
  max-width: 800px;
  margin: 0 auto;
}

.shortcut-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(42, 42, 42, 0.9));
  border: 1px solid rgba(175, 29, 54, 0.2);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 140px;
}

.shortcut-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(175, 29, 54, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.shortcut-card:hover {
  transform: translateY(-8px) scale(1.03);
  border-color: rgba(175, 29, 54, 0.6);
  box-shadow: 0 15px 35px rgba(175, 29, 54, 0.4);
}

.shortcut-card:hover::before {
  opacity: 1;
}

.shortcut-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.shortcut-description {
  font-size: 0.85rem;
  color: #cccccc;
  margin-bottom: 15px;
}

.admin-card {
  border-color: rgba(175, 29, 54, 0.4);
}

.admin-card:hover {
  border-color: rgba(175, 29, 54, 0.8);
  box-shadow: 0 15px 35px rgba(175, 29, 54, 0.6);
}

.login-card {
  border-color: rgba(100, 100, 100, 0.3);
}

.login-card:hover {
  border-color: rgba(175, 29, 54, 0.5);
  box-shadow: 0 15px 35px rgba(100, 100, 100, 0.3);
}

.footer-section {
  margin-top: 3rem;
}

.footer-text {
  font-size: 0.9rem;
  color: #aaaaaa;
  font-weight: 400;
}

@media (max-width: 960px) {
  .app-title {
    font-size: 2rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .shortcut-card {
    height: 120px;
  }
  
  .shortcut-title {
    font-size: 1.1rem;
  }
  
  .shortcut-description {
    font-size: 0.8rem;
  }
}

@media (max-width: 600px) {
  .app-title {
    font-size: 1.8rem;
  }
  
  .app-subtitle {
    font-size: 0.95rem;
  }
  
  .church-icon {
    font-size: 60px !important;
  }
  
  .shortcut-card {
    height: 110px;
  }
  
  .shortcut-title {
    font-size: 1rem;
  }
  
  .shortcut-description {
    font-size: 0.75rem;
  }
  
  .shortcuts-grid .v-col {
    max-width: 180px;
  }
}

.v-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.v-icon {
  transition: all 0.3s ease;
}

.shortcut-card:hover .v-icon {
  transform: scale(1.1);
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #af1d36;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #c41e3a;
}

.min-vh-100 {
  min-height: 100vh;
}
</style>
