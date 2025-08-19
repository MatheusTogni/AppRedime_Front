<template>
  <v-container class="pa-6">
    <!-- Header da página -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" class="text-center position-relative">
        <!-- Botão de logout no canto superior direito -->
        <v-btn
          color="error"
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
        <p class="text-h6 text-grey-lighten-1">
          Gerencie o conteúdo do Redime App
        </p>
        
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
            <h2 class="text-h5 mb-3 font-weight-bold">Upload de Arquivos</h2>
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
    <v-dialog v-model="modalPostagem" max-width="800px">
      <v-card>
        <v-card-title class="text-h5 bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-post</v-icon>
          Nova Postagem
        </v-card-title>
        <v-card-text class="pa-6">
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
            <v-select
              v-model="novaPostagem.categoria"
              :items="categorias"
              label="Categoria"
              variant="outlined"
              class="mb-4"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="modalPostagem = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="criarPostagem">
            Publicar Postagem
          </v-btn>
        </v-card-actions>
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
          <v-btn color="grey" variant="text" @click="modalEvento = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="criarEvento">
            Criar Evento
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para Upload de Arquivos -->
    <v-dialog v-model="modalUpload" max-width="600px">
      <v-card>
        <v-card-title class="text-h5 bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-cloud-upload</v-icon>
          Upload de Arquivos
        </v-card-title>
        <v-card-text class="pa-6">
          <div class="text-center mb-6">
            <v-icon size="100" color="grey-lighten-1" class="mb-4">
              mdi-cloud-upload-outline
            </v-icon>
            <p class="text-h6 mb-2">Arraste e solte seus arquivos aqui</p>
            <p class="text-body-2 text-grey">ou clique para selecionar</p>
          </div>
          <v-file-input
            v-model="arquivos"
            multiple
            variant="outlined"
            label="Selecionar arquivos"
            prepend-icon="mdi-paperclip"
            show-size
            class="mb-4"
          ></v-file-input>
          <v-text-field
            v-model="uploadInfo.categoria"
            label="Categoria dos arquivos"
            variant="outlined"
            class="mb-4"
          ></v-text-field>
          <v-textarea
            v-model="uploadInfo.descricao"
            label="Descrição (opcional)"
            variant="outlined"
            rows="3"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="modalUpload = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="fazerUpload" :disabled="!arquivos?.length">
            Fazer Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  name: 'AdminPage',
  
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    return { router, authStore };
  },
  
  data() {
    return {
      // Modais
      modalPostagem: false,
      modalEvento: false,
      modalUpload: false,
      
      // Dados das estatísticas
      stats: {
        posts: 15,
        events: 8,
        files: 32,
        users: 147
      },
      
      // Formulário nova postagem
      novaPostagem: {
        titulo: '',
        conteudo: '',
        categoria: ''
      },
      
      // Formulário novo evento
      novoEvento: {
        nome: '',
        descricao: '',
        data: '',
        hora: '',
        local: ''
      },
      
      // Upload de arquivos
      arquivos: null,
      uploadInfo: {
        categoria: '',
        descricao: ''
      },
      
      // Categorias para postagens
      categorias: [
        'Devocional',
        'Anúncio',
        'Estudo Bíblico',
        'Oração',
        'Testemunho',
        'Evento',
        'Geral'
      ]
    };
  },
  
  async mounted() {
    // Verifica se está autenticado ao montar o componente
    if (!this.authStore.isLoggedIn) {
      await this.authStore.checkAuth();
      if (!this.authStore.isLoggedIn) {
        this.router.push('/login');
        return;
      }
    }
  },
  
  methods: {
    async logout() {
      try {
        await this.authStore.logout();
        alert('Logout realizado com sucesso!');
        this.router.push('/');
      } catch (error) {
        console.error('Erro no logout:', error);
        // Mesmo se der erro, limpa a autenticação local
        this.authStore.clearAuth();
        this.router.push('/');
      }
    },
    abrirModalPostagem() {
      this.modalPostagem = true;
    },
    
    abrirModalEvento() {
      this.modalEvento = true;
    },
    
    abrirModalUpload() {
      this.modalUpload = true;
    },
    
    async criarPostagem() {
      try {
        // Aqui você faria a integração com o backend
        console.log('Criando postagem:', this.novaPostagem);
        
        // Simular sucesso
        alert('Postagem criada com sucesso!');
        this.modalPostagem = false;
        
        // Limpar formulário
        this.novaPostagem = {
          titulo: '',
          conteudo: '',
          categoria: ''
        };
        
        // Atualizar estatísticas
        this.stats.posts++;
        
      } catch (error) {
        console.error('Erro ao criar postagem:', error);
        alert('Erro ao criar postagem. Tente novamente.');
      }
    },
    
    async criarEvento() {
      try {
        // Aqui você faria a integração com o backend
        console.log('Criando evento:', this.novoEvento);
        
        // Simular sucesso
        alert('Evento criado com sucesso!');
        this.modalEvento = false;
        
        // Limpar formulário
        this.novoEvento = {
          nome: '',
          descricao: '',
          data: '',
          hora: '',
          local: ''
        };
        
        // Atualizar estatísticas
        this.stats.events++;
        
      } catch (error) {
        console.error('Erro ao criar evento:', error);
        alert('Erro ao criar evento. Tente novamente.');
      }
    },
    
    async fazerUpload() {
      try {
        // Aqui você faria a integração com o backend
        console.log('Fazendo upload:', {
          arquivos: this.arquivos,
          info: this.uploadInfo
        });
        
        // Simular sucesso
        alert('Arquivos enviados com sucesso!');
        this.modalUpload = false;
        
        // Limpar formulário
        this.arquivos = null;
        this.uploadInfo = {
          categoria: '',
          descricao: ''
        };
        
        // Atualizar estatísticas
        this.stats.files += this.arquivos?.length || 0;
        
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
        alert('Erro ao enviar arquivos. Tente novamente.');
      }
    }
  }
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
