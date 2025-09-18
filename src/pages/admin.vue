<template>
  <v-container class="pa-6">
    <!-- Header da página -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" class="text-center position-relative">
        <!-- Botão de logout no canto superior direito -->
        <v-btn
          color="primary"
          variant="outlined"
          prepend-icon="mdi-logout"
          class="logout-btn"
          @click="logout"
        >
          Sair
        </v-btn>

        <h1 class="text-h3 font-weight-bold mb-2" style="color: #af1d36">
          Painel Administrativo
        </h1>
        <p class="text-h6 text-grey-lighten-1">Gerencie o conteúdo do Redime App</p>

        <!-- Informações do usuário logado -->
        <v-chip
          v-if="authStore.user"
          color="primary"
          variant="outlined"
          prepend-icon="mdi-account"
          class="mt-2"
        >
          Logado como: {{ authStore.user.login }}
        </v-chip>
      </v-col>
    </v-row>

    <!-- Cards das opções principais -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" sm="6" md="4" class="d-flex">
        <v-card
          class="admin-card flex-fill"
          elevation="8"
          hover
          @click="abrirModalPostagem"
        >
          <v-card-text class="text-center pa-8">
            <v-icon size="80" color="primary" class="mb-4">mdi-post</v-icon>
            <h2 class="text-h5 mb-3 font-weight-bold">Fazer Postagem</h2>
            <p class="text-body-1 text-grey-lighten-1">
              Crie e publique novas postagens para a comunidade
            </p>
          </v-card-text>
          <v-card-actions class="justify-center pb-6">
            <v-btn
              size="large"
              color="primary"
              variant="outlined"
              prepend-icon="mdi-plus"
            >
              Nova Postagem
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" class="d-flex">
        <v-card
          class="admin-card flex-fill"
          elevation="8"
          hover
          @click="abrirModalEvento"
        >
          <v-card-text class="text-center pa-8">
            <v-icon size="80" color="primary" class="mb-4">mdi-calendar-plus</v-icon>
            <h2 class="text-h5 mb-3 font-weight-bold">Criar Evento</h2>
            <p class="text-body-1 text-grey-lighten-1">
              Organize eventos e atividades para a igreja
            </p>
          </v-card-text>
          <v-card-actions class="justify-center pb-6">
            <v-btn
              size="large"
              color="primary"
              variant="outlined"
              prepend-icon="mdi-calendar"
            >
              Novo Evento
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" class="d-flex">
        <v-card
          class="admin-card flex-fill"
          elevation="8"
          hover
          @click="abrirModalUpload"
        >
          <v-card-text class="text-center pa-8">
            <v-icon size="80" color="primary" class="mb-4">mdi-cloud-upload</v-icon>
            <h2 class="text-h5 mb-3 font-weight-bold">Upload de Ministrações</h2>
            <p class="text-body-1 text-grey-lighten-1">
              Faça upload de arquivos e documentos
            </p>
          </v-card-text>
          <v-card-actions class="justify-center pb-6">
            <v-btn
              size="large"
              color="primary"
              variant="outlined"
              prepend-icon="mdi-upload"
            >
              Fazer Upload
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal para Nova Postagem -->
    <v-dialog v-model="modalPostagem" max-width="800px" persistent>
      <v-card>
        <v-card-title class="text-h5 bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-post</v-icon>
          Postagens
        </v-card-title>
        <v-card-text class="pa-0">
          <v-tabs v-model="tabAtivaPostagem" class="mb-4">
            <v-tab value="criar">
              <v-icon class="mr-2">mdi-plus</v-icon>
              Nova Postagem
            </v-tab>
            <v-tab value="gerenciar">
              <v-icon class="mr-2">mdi-post-outline</v-icon>
              Gerenciar Postagens
            </v-tab>
          </v-tabs>

          <v-tabs-window v-model="tabAtivaPostagem">
            <!-- Aba de Criar Postagem -->
            <v-tabs-window-item value="criar" class="pa-6">
              <v-form>
                <v-text-field
                  v-model="novaPostagem.titulo"
                  label="Título da Postagem"
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>
                <v-textarea
                  v-model="novaPostagem.conteudo"
                  label="Conteúdo"
                  variant="outlined"
                  rows="6"
                  class="mb-4"
                ></v-textarea>
                <v-file-input
                  v-model="arquivos"
                  multiple
                  variant="outlined"
                  label="Selecionar imagens"
                  prepend-icon="mdi-paperclip"
                  show-size
                  accept="image/*"
                  class="mb-4"
                ></v-file-input>
              </v-form>
              <div class="d-flex justify-end gap-2">
                <v-btn color="grey" variant="flat" @click="modalPostagem = false">
                  Cancelar
                </v-btn>
                <v-btn class="ml-2" :loading="loading" color="primary" variant="flat" @click="criarPostagem">
                  Publicar Postagem
                </v-btn>
              </div>
            </v-tabs-window-item>

            <!-- Aba de Gerenciar Postagens -->
            <v-tabs-window-item value="gerenciar" class="pa-6">
              <div class="d-flex justify-between align-center mb-4">
                <h3 class="text-h6">Postagens Publicadas</h3>
              </div>

              <v-progress-linear
                v-if="carregandoPostagens"
                indeterminate
                class="mb-4"
              ></v-progress-linear>

              <div v-if="!carregandoPostagens && postagens.length === 0" class="text-center py-8">
                <v-icon size="64" color="grey" class="mb-4">mdi-post-outline</v-icon>
                <p class="text-grey">Nenhuma postagem foi criada ainda</p>
              </div>

              <v-list v-if="!carregandoPostagens && postagens.length > 0" class="bg-transparent">
                <v-list-item
                  v-for="postagem in postagens"
                  :key="postagem.id"
                  class="mb-3 rounded-lg border"
                >
                  <template v-slot:prepend>
                    <v-avatar size="40">
                      <v-icon color="primary">mdi-post</v-icon>
                    </v-avatar>
                  </template>

                  <v-list-item-title class="font-weight-medium">
                    {{ postagem.titulo }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle class="text-caption">
                    {{ postagem.descricao ? postagem.descricao.substring(0, 100) + '...' : '' }}
                  </v-list-item-subtitle>

                  <v-list-item-subtitle class="text-caption mt-1">
                    Publicado em: {{ formatarData(postagem.criado_em) }}
                  </v-list-item-subtitle>

                  <template v-slot:append>
                    <div class="d-flex gap-2">
                      <v-btn
                        v-if="postagem.images && postagem.images.length > 0"
                        class="mr-2"
                        color="info"
                        variant="outlined"
                        @click="visualizarImagens(postagem)"
                      >
                        <v-icon>mdi-image-multiple</v-icon>
                        {{ postagem.images.length }}
                      </v-btn>
                      <v-btn
                        size="small"
                        color="primary"
                        variant="outlined"
                        icon="mdi-delete"
                        @click="confirmarExclusaoPostagem(postagem)"
                      ></v-btn>
                    </div>
                  </template>
                </v-list-item>
              </v-list>
              
              <div class="d-flex justify-end mt-4">
                <v-btn color="grey" variant="flat" @click="modalPostagem = false">
                  Fechar
                </v-btn>
              </div>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modal para Novo Evento -->
    <v-dialog v-model="modalEvento" max-width="800px">
      <v-card>
        <v-card-title class="text-h5 bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-calendar-plus</v-icon>
          Novo Evento
        </v-card-title>
        <v-card-text class="pa-6">
          <v-form>
            <v-text-field
              v-model="novoEvento.nome"
              label="Nome do Evento"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
            <v-textarea
              v-model="novoEvento.descricao"
              label="Descrição"
              variant="outlined"
              rows="4"
              class="mb-4"
            ></v-textarea>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="novoEvento.data"
                  label="Data"
                  type="date"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="novoEvento.hora"
                  label="Hora"
                  type="time"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="novoEvento.local"
              label="Local"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="flat" @click="modalEvento = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" variant="flat" @click="criarEvento">
            Criar Evento
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para Upload de Arquivos -->
    <v-dialog v-model="modalUpload" max-width="800px" persistent>
      <v-card>
        <v-card-title class="text-h5 bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-cloud-upload</v-icon>
           Ministrações
        </v-card-title>
        <v-card-text class="pa-0">
          <v-tabs v-model="tabAtiva" class="mb-4">
            <v-tab value="upload">
              <v-icon class="mr-2">mdi-cloud-upload</v-icon>
              Fazer Upload
            </v-tab>
            <v-tab value="gerenciar">
              <v-icon class="mr-2">mdi-file-document-multiple</v-icon>
              Gerenciar Arquivos
            </v-tab>
          </v-tabs>

          <v-tabs-window v-model="tabAtiva">
            <!-- Aba de Upload -->
            <v-tabs-window-item value="upload" class="pa-6">
              <v-text-field
                v-model="novoArquivo.titulo"
                label="Titulo"
                variant="outlined"
                class="mb-4"
              ></v-text-field>
              <v-file-input
                v-model="arquivos"
                multiple
                variant="outlined"
                label="Selecionar arquivos PDF"
                prepend-icon="mdi-file-pdf-box"
                show-size
                accept=".pdf,application/pdf"
                class="mb-4"
              ></v-file-input>
              <div class="d-flex justify-end gap-2">
                <v-btn color="grey" variant="flat" @click="modalUpload = false">
                  Cancelar
                </v-btn>
                <v-btn
                  class="ml-2"
                  :loading="uploadLoaging"
                  color="primary"
                  variant="flat"
                  @click="fazerUpload"
                >
                  Fazer Upload
                </v-btn>
              </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="gerenciar" class="pa-6">
              <div class="d-flex justify-between align-center mb-4">
                <h3 class="text-h6">Arquivos Enviados</h3>
              </div>

              <v-progress-linear
                v-if="carregandoMinistracoes"
                indeterminate
                class="mb-4"
              ></v-progress-linear>

              <div v-if="!carregandoMinistracoes && ministracoes.length === 0" class="text-center py-8">
                <v-icon size="64" color="grey" class="mb-4">mdi-file-document-outline</v-icon>
                <p class="text-grey">Nenhum arquivo foi enviado ainda</p>
              </div>

              <v-list v-if="!carregandoMinistracoes && ministracoes.length > 0" class="bg-transparent">
                <v-list-item
                  v-for="ministracao in ministracoes"
                  :key="ministracao.id"
                  class="mb-2 rounded-lg border"
                >
                  <template v-slot:prepend>
                    <v-icon color="red">mdi-file-pdf-box</v-icon>
                  </template>

                  <v-list-item-title class="font-weight-medium">
                    {{ ministracao.titulo }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle class="text-caption">
                    Enviado em: {{ formatarData(ministracao.criado_em) }}
                  </v-list-item-subtitle>

                  <template v-slot:append>
                    <div class="d-flex gap-2">
                      <v-btn
                        size="small"
                        color="primary"
                        variant="outlined"
                        icon="mdi-delete"
                        @click="confirmarExclusao(ministracao)"
                      ></v-btn>
                    </div>
                  </template>
                </v-list-item>
              </v-list>
              
              <div class="d-flex justify-end mt-4">
                <v-btn color="grey" variant="flat" @click="modalUpload = false">
                  Fechar
                </v-btn>
              </div>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog de confirmação de exclusão -->
    <v-dialog v-model="dialogExclusao" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          Confirmar Exclusão
        </v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir o arquivo "<strong>{{ ministracaoParaExcluir?.titulo }}</strong>"?
          <br><br>
          Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="flat" @click="dialogExclusao = false">
            Cancelar
          </v-btn>
          <v-btn
            :loading="excluindoArquivo"
            color="primary"
            variant="flat"
            @click="excluirArquivo"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de confirmação de exclusão de postagem -->
    <v-dialog v-model="dialogExclusaoPostagem" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          Confirmar Exclusão
        </v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir a postagem "<strong>{{ postagemParaExcluir?.titulo }}</strong>"?
          <br><br>
          Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="flat" @click="dialogExclusaoPostagem = false">
            Cancelar
          </v-btn>
          <v-btn
            :loading="excluindoArquivo"
            color="primary"
            variant="flat"
            @click="excluirPostagem"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de visualização de imagens -->
    <v-dialog v-model="dialogImagens" max-width="800px">
      <v-card>
        <v-card-title class="text-h5 bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-image-multiple</v-icon>
          Imagens da Postagem
        </v-card-title>
        <v-card-text class="pa-6">
          <v-row>
            <v-col
              v-for="(imagem, index) in imagensVisualizacao"
              :key="index"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="mb-4">
                <v-img
                  :src="imagem"
                  height="200"
                  cover
                  @click="abrirImagemCompleta(imagem)"
                  style="cursor: pointer"
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="flat" @click="dialogImagens = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "AdminPage",

  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    return { router, authStore };
  },

  data() {
    return {
      modalPostagem: false,
      modalEvento: false,
      modalUpload: false,
      uploadLoaging: false,
      tabAtiva: 'upload',
      tabAtivaPostagem: 'criar',
      carregandoMinistracoes: false,
      carregandoPostagens: false,
      excluindoArquivo: false,
      dialogExclusao: false,
      dialogExclusaoPostagem: false,
      ministracoes: [] as any[],
      postagens: [] as any[],
      ministracaoParaExcluir: null as any,
      postagemParaExcluir: null as any,
      imagensVisualizacao: [] as string[],
      dialogImagens: false,
      stats: {
        posts: 15,
        events: 8,
        files: 32,
        users: 147,
      },
      novaPostagem: {
        titulo: "",
        conteudo: "",
      },
      novoEvento: {
        nome: "",
        descricao: "",
        data: "",
        hora: "",
        local: "",
      },
      arquivos: [] as File[],
      novoArquivo: {
        titulo: "",
      },
      loading: false,
    };
  },

  async mounted() {
    if (!this.authStore.isLoggedIn) {
      await this.authStore.checkAuth();
      if (!this.authStore.isLoggedIn) {
        this.router.push("/login");
        return;
      }
    }
  },

  methods: {
    async logout() {
      try {
        await this.authStore.logout();
        this.router.push("/");
      } catch (error) {
        console.error("Erro no logout:", error);
        this.authStore.clearAuth();
        this.router.push("/");
      }
    },
    abrirModalPostagem() {
      this.modalPostagem = true;
      this.tabAtivaPostagem = 'criar';
      this.carregarPostagens();
    },

    async carregarPostagens() {
      this.carregandoPostagens = true;
      try {
        const response = await this.HTTP("GET", "post/get-posts");
        if (response && response.data && response.data.posts) {
          this.postagens = response.data.posts;
        }
      } catch (error) {
        console.error("Erro ao carregar postagens:", error);
        this.$toast.error("Erro ao carregar postagens.");
      } finally {
        this.carregandoPostagens = false;
      }
    },

    visualizarImagens(postagem: any) {
      if (postagem.images && postagem.images.length > 0) {
        const baseUrl = 'http://localhost:3000';
        this.imagensVisualizacao = postagem.images.map((img: string) => baseUrl + img);
        this.dialogImagens = true;
      }
    },

    confirmarExclusaoPostagem(postagem: any) {
      this.postagemParaExcluir = postagem;
      this.dialogExclusaoPostagem = true;
    },

    async excluirPostagem() {
      if (!this.postagemParaExcluir) return;
      
      this.excluindoArquivo = true;
      try {
        const response = await this.HTTP("DELETE", `post/delete-post/${this.postagemParaExcluir.id}`);
        if (response) {
          this.$toast.success("Postagem excluída com sucesso!");
          this.dialogExclusaoPostagem = false;
          this.postagemParaExcluir = null;
          await this.carregarPostagens(); // Recarrega a lista
        }
      } catch (error) {
        console.error("Erro ao excluir postagem:", error);
        this.$toast.error("Erro ao excluir postagem.");
      } finally {
        this.excluindoArquivo = false;
      }
    },

    abrirModalEvento() {
      this.modalEvento = true;
    },

    abrirModalUpload() {
      this.modalUpload = true;
      this.tabAtiva = 'upload';
      this.carregarMinistracoes();
    },

    async carregarMinistracoes() {
      this.carregandoMinistracoes = true;
      try {
        const response = await this.HTTP("GET", "ministration/get-ministrations");
        if (response && response.data && response.data.ministrations) {
          this.ministracoes = response.data.ministrations;
        }
      } catch (error) {
        console.error("Erro ao carregar ministrações:", error);
        this.$toast.error("Erro ao carregar arquivos.");
      } finally {
        this.carregandoMinistracoes = false;
      }
    },

    formatarData(data: string) {
      return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    baixarArquivo(url: string) {
      const baseUrl = 'http://localhost:3000';
      window.open(baseUrl + url, '_blank');
    },

    confirmarExclusao(ministracao: any) {
      this.ministracaoParaExcluir = ministracao;
      this.dialogExclusao = true;
    },

    async excluirArquivo() {
      if (!this.ministracaoParaExcluir) return;
      
      this.excluindoArquivo = true;
      try {
        const response = await this.HTTP("DELETE", `ministration/delete-ministration/${this.ministracaoParaExcluir.id}`);
        if (response) {
          this.$toast.success("Arquivo excluído com sucesso!");
          this.dialogExclusao = false;
          this.ministracaoParaExcluir = null;
          await this.carregarMinistracoes(); // Recarrega a lista
        }
      } catch (error) {
        console.error("Erro ao excluir arquivo:", error);
        this.$toast.error("Erro ao excluir arquivo.");
      } finally {
        this.excluindoArquivo = false;
      }
    },

    abrirImagemCompleta(imagem: string) {
      window.open(imagem, '_blank');
    },

    baixarImagem(imagem: string) {
      window.open(imagem, '_blank');
    },

    async criarPostagem() {
      if (!this.novaPostagem.titulo || !this.novaPostagem.conteudo) {
        this.$toast.info("Por favor, preencha o título e o conteúdo da postagem.");
        return;
      }
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("titulo", this.novaPostagem.titulo);
        formData.append("descricao", this.novaPostagem.conteudo);

        if (this.arquivos && this.arquivos.length > 0) {
          for (const arquivo of this.arquivos) {
            formData.append("images", arquivo);
          }
        }

        const response = await this.HTTP("POST", "post/create-post", formData);

        if (response) {
          this.$toast.success("Postagem criada com sucesso!");
          this.novaPostagem = {
            titulo: "",
            conteudo: "",
          };
          this.arquivos = [];
          await this.carregarPostagens(); // Recarrega a lista
          this.tabAtivaPostagem = 'gerenciar'; // Muda para a aba de gerenciamento
        }
      } catch (error) {
        this.$toast.error("Erro ao criar postagem. Tente novamente.");
      } finally {
        this.loading = false;
      }
    },

    async criarEvento() {
      try {
      } catch (error) {}
    },

    async fazerUpload() {
      if (!this.novoArquivo.titulo || this.arquivos.length === 0) {
        this.$toast.info("Por favor, preencha o título e selecione os arquivos.");
        return;
      }
      try {
        this.uploadLoaging = true;
        const formData = new FormData();
        formData.append("titulo", this.novoArquivo.titulo);

        if (this.arquivos && this.arquivos.length > 0) {
          for (const arquivo of this.arquivos) {
            formData.append("images", arquivo);
          }
        }

        const response = await this.HTTP("POST", "ministration/create-ministration", formData);
        if (response) {
          this.$toast.success("Ministração enviada com sucesso!");
          this.novoArquivo = {
            titulo: "",
          };
          this.arquivos = [];
          await this.carregarMinistracoes(); // Recarrega a lista
          this.tabAtiva = 'gerenciar'; // Muda para a aba de gerenciamento
        }
      } catch (error) {
        this.$toast.error("Erro ao enviar ministração. Tente novamente.");
      } finally {
        this.uploadLoaging = false;
      }
    },
  },
});
</script>

<style scoped>
.logout-btn {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 12px;
}

.admin-card {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #333;
}

.admin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(175, 29, 54, 0.3) !important;
  border-color: #af1d36;
}

.stats-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 16px;
  border: 1px solid #333;
}

.stat-item {
  padding: 16px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.stat-item:hover {
  background: rgba(175, 29, 54, 0.1);
}

:deep(.v-card-title) {
  background: #af1d36 !important;
  color: white !important;
}

:deep(.v-dialog .v-card) {
  background-color: #1e1e1e !important;
  border-radius: 16px;
}

:deep(.v-text-field .v-field) {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

:deep(.v-textarea .v-field) {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

:deep(.v-select .v-field) {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

:deep(.v-file-input .v-field) {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.v-btn {
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
