<template>
  <v-container>
    <v-row justify="center" class="mt-8">
      <v-col cols="12" md="8" lg="6">
        <v-card class="text-center pa-6">
          <v-icon size="80" color="primary" class="mb-4">mdi-cross</v-icon>

          <h1 class="text-h3 mb-4">Bem-vindo ao Redime App</h1>

          <div class="text-h6 mb-6" style="color: white; font-family: 'Lora', serif">
            <span>"{{ versiculoApoio.texto }}"</span>
            <br />
            <span style="font-size: 0.95rem; color: grey; font-weight: 600">{{
              versiculoApoio.referencia
            }}</span>
          </div>

          <v-row class="mt-8" justify="center">
            <v-col cols="12" sm="6" md="6">
              <v-btn
                size="large"
                color="primary"
                block
                to="/biblia"
                prepend-icon="mdi-book-open-page-variant"
              >
                Ler Bíblia
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-btn
                size="large"
                color="primary"
                block
                to="/postagens"
                prepend-icon="mdi-post"
              >
                Ver Postagens
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-btn
                size="large"
                color="primary"
                block
                to="/doacoes"
                prepend-icon="mdi-hand-coin"
              >
                Fazer Doação
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-btn
                size="large"
                color="primary"
                block
                to="/arquivos"
                prepend-icon="mdi-file-download"
              >
                Baixar Arquivos
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="my-6"></v-divider>

          <v-row>
            <v-col cols="12" sm="4">
              <v-card flat>
                <v-icon size="48" color="primary">mdi-book-search</v-icon>
                <v-card-title class="text-h6">Pesquisa Rápida</v-card-title>
                <v-card-text> Encontre versículos por livro e capítulo </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="4">
              <v-card flat>
                <v-icon size="48" color="primary">mdi-wifi-off</v-icon>
                <v-card-title class="text-h6"> Bíblia Offline</v-card-title>
                <v-card-text> Acesse sua bíblia em qualquer lugar </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="4">
              <v-card flat>
                <v-icon size="48" color="primary">mdi-heart</v-icon>
                <v-card-title class="text-h6">Interface Simples</v-card-title>
                <v-card-text> Design focado na leitura e meditação </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      versiculos: [
        {
          texto:
            "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
          referencia: "João 3:16",
        },
        {
          texto: "O Senhor é meu pastor, nada me faltará.",
          referencia: "Salmos 23:1",
        },
        {
          texto: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.",
          referencia: "Salmos 37:5",
        },
        {
          texto: "Tudo posso naquele que me fortalece.",
          referencia: "Filipenses 4:13",
        },
        {
          texto:
            "Buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.",
          referencia: "Mateus 6:33",
        },
        {
          texto:
            "Confia no Senhor de todo o teu coração e não te apoies em teu próprio entendimento.",
          referencia: "Provérbios 3:5",
        },
      ],
      versiculoApoio: {},
    };
  },
  mounted() {
    this.versiculoApoio = this.versiculos[
      Math.floor(Math.random() * this.versiculos.length)
    ];
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
