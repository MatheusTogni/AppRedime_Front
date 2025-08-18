<template>
  <v-container fluid class="pa-4 px-md-6">
    <!-- Dialog para exibir detalhes do post -->
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="#121212">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ selectedPost?.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text class="pa-0" v-if="selectedPost">
          <v-img :src="selectedPost.imageUrl" height="300" cover></v-img>
          <div class="pa-4">
            <div class="d-flex align-center mb-4">
              <div class="text-caption" style="color: #666">
                {{ formatDate(selectedPost.date) }} • {{ selectedPost.author }}
              </div>
            </div>
            <p class="text-body-1" style="color: #fff; white-space: pre-line">
              {{ selectedPost.preview }}

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col 
        v-for="post in posts" 
        :key="post.id" 
        cols="12" 
        sm="6" 
        lg="4" 
        class="pa-2"
      >
        <div class="post-card" @click="openPost(post)">
          <v-img
            :src="post.imageUrl"
            height="200"
            cover
            class="post-image"
            gradient="to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="#af1d36"></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <div class="post-content pa-4">
            <h2 class="text-h5 font-weight-bold mb-2" style="color: #af1d36">
              {{ post.title }}
            </h2>
            <div class="text-caption mb-3" style="color: #666">
              {{ formatDate(post.date) }} • {{ post.author }}
            </div>
            <p class="text-body-2 mb-4" style="color: #fff">{{ post.preview }}</p>
            <v-btn
              color="#af1d36"
              variant="text"
              class="text-body-2 px-0"
              style="text-transform: none; font-weight: 500"
            >
              Ler mais
              <v-icon end icon="mdi-arrow-right" size="small"></v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  preview: string;
  imageUrl: string;
}

export default defineComponent({
  name: "PostagensPage",

  data() {
    return {
      loading: true,
      dialog: false,
      selectedPost: null as Post | null,
      posts: [] as Post[],
    };
  },

  methods: {
    formatDate(date: string): string {
      return new Date(date)
        .toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(".", "");
    },

    formatCurrentDate(): string {
      return new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },

    async loadPosts() {
      try {
        this.loading = true;
        this.posts = [
          {
            id: 3,
            title: "Vivendo em Comunidade",
            author: "Pastor Paulo",
            date: "2025-08-11",
            preview:
              "A importância da comunhão entre os irmãos e como podemos fortalecer nossos laços como corpo de Cristo. Aprenda práticas e princípios bíblicos para uma vida em comunidade mais rica...",
            imageUrl:
              "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          },
          {
            id: 4,
            title: "Meditação Diária",
            author: "Pr. André Santos",
            date: "2025-08-10",
            preview:
              "Como estabelecer uma rotina de meditação na Palavra de Deus e transformar sua vida espiritual através do estudo bíblico diário...",
            imageUrl:
              "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          },
          {
            id: 5,
            title: "O Poder do Louvor",
            author: "Min. Sarah Lima",
            date: "2025-08-09",
            preview:
              "Descubra como o louvor pode transformar sua vida espiritual e aproximá-lo mais de Deus. Uma exploração profunda sobre a importância da adoração em nossa caminhada...",
            imageUrl:
              "https://images.unsplash.com/photo-1511715282680-fbf93a50e721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
          },
        ];
      } catch (error) {
        console.error("Erro ao carregar postagens:", error);
      } finally {
        this.loading = false;
      }
    },

    openPost(post: Post) {
      this.selectedPost = post;
      this.dialog = true;
    },
  },

  mounted() {
    this.loadPosts();
  },
});
</script>

<style scoped>
.post-header {
  background-color: #121212;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.post-card {
  background-color: #1e1e1e;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-card.on-hover {
  transform: translateY(-4px);
  border-color: #af1d36;
  box-shadow: 0 4px 20px rgba(175, 29, 54, 0.1);
}

.text-caption {
  font-size: 0.875rem !important;
  letter-spacing: 0.5px;
}

.text-body-1 {
  line-height: 1.8;
  opacity: 0.9;
}

.post-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-content p {
  flex-grow: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

@media (min-width: 960px) {
  .post-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .post-content {
    flex-grow: 1;
  }
}
</style>
