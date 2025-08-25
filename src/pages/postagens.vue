<template>
  <v-container fluid class="pa-4 px-md-6">
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="#121212">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ selectedPost?.titulo }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text class="pa-0" v-if="selectedPost">
          <v-img 
            v-if="selectedPost.images && selectedPost.images.length > 0"
            :src="getImageUrl(selectedPost.images[0])" 
            height="300" 
            cover
          ></v-img>
          <div class="pa-4">
            <div class="d-flex align-center mb-4">
              <div class="text-caption" style="color: #666">
                {{ formatDate(selectedPost.criado_em) }}
              </div>
            </div>
            <p class="text-body-1" style="color: #fff; white-space: pre-line">
              {{ selectedPost.descricao }}
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col v-for="post in posts" :key="post.id" cols="12" sm="6" lg="4" class="pa-2">
        <div class="post-card" @click="openPost(post)">
          <v-img
            v-if="post.images && post.images.length > 0"
            :src="getImageUrl(post.images[0])"
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
          
          <div v-else class="no-image-placeholder" style="height: 200px; background-color: #333; display: flex; align-items: center; justify-content: center;">
            <v-icon size="48" color="#666">mdi-image-off</v-icon>
          </div>

          <div class="post-content pa-4">
            <h2 class="text-h5 font-weight-bold mb-2" style="color: #af1d36">
              {{ post.titulo }}
            </h2>
            <div class="text-caption mb-3" style="color: #666">
              {{ formatDate(post.criado_em) }}
            </div>
            <p class="text-body-2 mb-4" style="color: #fff">{{ post.descricao }}</p>
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
import type { Post, PostsResponse } from "@/interfaces";

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

    getImageUrl(imagePath: string): string {
      if (!imagePath) {
        return '';
      }
      
      if (imagePath.startsWith('http')) {
        return imagePath;
      }

      const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
      return `/${cleanPath}`;
    },

    async loadPosts() {
      try {
        const resp = await this.HTTP("GET", "post/get-posts");
        const data: PostsResponse = resp.data;
        this.posts = data.posts;
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

.no-image-placeholder {
  border-radius: 8px 8px 0 0;
  background: linear-gradient(45deg, #2a2a2a 25%, transparent 25%, transparent 75%, #2a2a2a 75%), 
              linear-gradient(45deg, #2a2a2a 25%, transparent 25%, transparent 75%, #2a2a2a 75%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
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
  line-clamp: 3;
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
