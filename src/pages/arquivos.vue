<template>
  <v-container class="pa-6">
    <!-- Header da página -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-bold mb-2" style="color: #af1d36">
          <v-icon size="40" color="#af1d36" class="mr-3">mdi-file-document-multiple</v-icon>
          Biblioteca da Redime
        </h1>
        <p class="text-h6 text-grey-lighten-1">
          Acesse e baixe ministrações, estudos e documentos
        </p>
      </v-col>
    </v-row>

    <!-- Filtros -->
    <v-card class="mb-6" elevation="4">
      <v-card-title class="bg-primary white--text">
        <v-icon  color="white" class="mr-3">mdi-filter</v-icon>
        Filtros de Busca
      </v-card-title>
      <v-card-text class="pa-6">
        <v-row align="center" no-gutters>
          <v-col cols="10" md="11" sm="10" class="pr-3">
            <v-text-field
              v-model="filtros.titulo"
              label="Buscar por título"
              variant="outlined"
              prepend-inner-icon="mdi-magnify"
              clearable
              @input="aplicarFiltros"
            ></v-text-field>
          </v-col>
          <v-col cols="2" md="1" sm="2" class="d-flex align-center justify-center">
            <v-btn
              icon
              color="primary"
              variant="flat"
              size="large"
              @click="abrirFiltroData"
              class="filter-circle-btn"
            >
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Loading -->
    <v-progress-linear v-if="carregando" indeterminate class="mb-4"></v-progress-linear>

    <!-- Lista de Arquivos -->
    <div v-if="!carregando">
      <!-- Sem resultados -->
      <v-card v-if="arquivosFiltrados.length === 0" class="text-center pa-8" elevation="2">
        <v-icon size="80" color="grey" class="mb-4">mdi-file-document-outline</v-icon>
        <h3 class="text-h5 mb-2">Nenhum arquivo encontrado</h3>
        <p class="text-grey">
          {{ arquivos.length === 0 ? 'Ainda não há arquivos disponíveis' : 'Tente ajustar os filtros de busca' }}
        </p>
      </v-card>

      <!-- Grid de Arquivos -->
      <v-row v-else>
        <v-col
          v-for="arquivo in arquivosFiltrados"
          :key="arquivo.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="arquivo-card"
            elevation="6"
            hover
            @click="visualizarDetalhes(arquivo)"
          >
            <v-card-text class="text-center pa-6">
              <v-avatar size="80" class="mb-4" color="red lighten-1">
                <v-icon size="50" color="white">mdi-file-pdf-box</v-icon>
              </v-avatar>
              
              <h3 class="text-h6 font-weight-bold mb-2" style="line-height: 1.3;">
                {{ arquivo.titulo }}
              </h3>
              
              <v-chip
                size="small"
                color="primary"
                variant="tonal"
                class="mb-3"
              >
                <v-icon left size="14">mdi-calendar</v-icon>
                {{ formatarData(arquivo.criado_em) }}
              </v-chip>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0">
              <v-btn
                color="primary"
                variant="flat"
                prepend-icon="mdi-download"
                block
                @click.stop="baixarArquivo(arquivo)"
                :loading="baixandoId === arquivo.id"
              >
                Baixar PDF
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Dialog de Detalhes -->
    <v-dialog v-model="dialogDetalhes" max-width="500px">
      <v-card v-if="arquivoSelecionado">
        <v-card-title class="bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-information</v-icon>
          Detalhes do Arquivo
        </v-card-title>
        <v-card-text class="pa-6">
          <div class="text-center mb-4">
            <v-avatar size="100" color="red lighten-1" class="mb-3">
              <v-icon size="60" color="white">mdi-file-pdf-box</v-icon>
            </v-avatar>
          </div>
          
          <v-list class="bg-transparent">
            <v-list-item>
              <v-list-item-title class="font-weight-bold">Título:</v-list-item-title>
              <v-list-item-subtitle>{{ arquivoSelecionado.titulo }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="font-weight-bold">Data de Upload:</v-list-item-title>
              <v-list-item-subtitle>{{ formatarDataCompleta(arquivoSelecionado.criado_em) }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="font-weight-bold">Formato:</v-list-item-title>
              <v-list-item-subtitle>PDF (Portable Document Format)</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-btn color="grey" variant="text" @click="dialogDetalhes = false">
            Fechar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="flat"
            prepend-icon="mdi-download"
            @click="baixarArquivo(arquivoSelecionado)"
            :loading="baixandoId === arquivoSelecionado.id"
          >
            Baixar PDF
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de Filtro por Data -->
    <v-dialog v-model="dialogFiltroData" max-width="400px">
      <v-card>
        <v-card-title class="bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-calendar-filter</v-icon>
          Filtrar por Data
        </v-card-title>
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="filtroDataForm.dataInicio"
                label="Data inicial"
                type="date"
                variant="outlined"
                prepend-inner-icon="mdi-calendar"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="filtroDataForm.dataFim"
                label="Data final"
                type="date"
                variant="outlined"
                prepend-inner-icon="mdi-calendar"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-btn color="grey" variant="flat" @click="dialogFiltroData = false">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="flat"
            prepend-icon="mdi-magnify"
            @click="aplicarFiltroData"
            :loading="aplicandoFiltroData"
          >
            Consultar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArquivosPage',
  
  data() {
    return {
      carregando: false,
      baixandoId: null as number | null,
      dialogDetalhes: false,
      dialogFiltroData: false,
      aplicandoFiltroData: false,
      arquivoSelecionado: null as any,
      arquivos: [] as any[],
      arquivosFiltrados: [] as any[],
      filtros: {
        titulo: '',
        dataInicio: '',
        dataFim: ''
      },
      filtroDataForm: {
        dataInicio: '',
        dataFim: ''
      }
    };
  },

  computed: {
    // Removidas as computed properties de estatísticas
  },

  async mounted() {
    await this.carregarArquivos();
  },

  methods: {
    async carregarArquivos() {
      this.carregando = true;
      try {
        const response = await this.HTTP("GET", "ministration/get-ministrations");
        if (response && response.data && response.data.ministrations) {
          this.arquivos = response.data.ministrations;
          this.aplicarFiltros();
        }
      } catch (error) {
        console.error("Erro ao carregar arquivos:", error);
        this.$toast.error("Erro ao carregar arquivos");
      } finally {
        this.carregando = false;
      }
    },

    aplicarFiltros() {
      let filtrados = [...this.arquivos];

      // Filtro por título
      if (this.filtros.titulo) {
        filtrados = filtrados.filter(arquivo =>
          arquivo.titulo.toLowerCase().includes(this.filtros.titulo.toLowerCase())
        );
      }

      // Filtro por data
      if (this.filtros.dataInicio) {
        const dataInicio = new Date(this.filtros.dataInicio);
        filtrados = filtrados.filter(arquivo =>
          new Date(arquivo.criado_em) >= dataInicio
        );
      }

      if (this.filtros.dataFim) {
        const dataFim = new Date(this.filtros.dataFim);
        dataFim.setHours(23, 59, 59, 999); // Fim do dia
        filtrados = filtrados.filter(arquivo =>
          new Date(arquivo.criado_em) <= dataFim
        );
      }

      this.arquivosFiltrados = filtrados;
    },

    limparFiltros() {
      this.filtros = {
        titulo: '',
        dataInicio: '',
        dataFim: ''
      };
      this.filtroDataForm = {
        dataInicio: '',
        dataFim: ''
      };
      this.aplicarFiltros();
      this.dialogFiltroData = false;
      this.$toast.success("Filtros limpos com sucesso!");
    },

    abrirFiltroData() {
      this.filtroDataForm = {
        dataInicio: this.filtros.dataInicio,
        dataFim: this.filtros.dataFim
      };
      this.dialogFiltroData = true;
    },

    async aplicarFiltroData() {
      this.aplicandoFiltroData = true;
      try {
        this.filtros.dataInicio = this.filtroDataForm.dataInicio;
        this.filtros.dataFim = this.filtroDataForm.dataFim;
        this.aplicarFiltros();
        this.dialogFiltroData = false;
        this.$toast.success("Filtro de data aplicado com sucesso!");
      } catch (error) {
        this.$toast.error("Erro ao aplicar filtro");
      } finally {
        this.aplicandoFiltroData = false;
      }
    },

    async baixarArquivo(arquivo: any) {
      this.baixandoId = arquivo.id;
      try {
        const response = await fetch(`http://localhost:3000/ministration/download/${arquivo.id}`);
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${arquivo.titulo}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          
          this.$toast.success(`Download de "${arquivo.titulo}" iniciado!`);
          this.dialogDetalhes = false;
        } else {
          throw new Error('Erro no download');
        }
      } catch (error) {
        console.error("Erro no download:", error);
        this.$toast.error("Erro ao fazer download do arquivo");
      } finally {
        this.baixandoId = null;
      }
    },

    visualizarDetalhes(arquivo: any) {
      this.arquivoSelecionado = arquivo;
      this.dialogDetalhes = true;
    },

    formatarData(data: string) {
      return new Date(data).toLocaleDateString('pt-BR');
    },

    formatarDataCompleta(data: string) {
      return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
});
</script>

<style scoped>
.arquivo-card {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #333;
  height: 100%;
}

.arquivo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(175, 29, 54, 0.3) !important;
  border-color: #af1d36;
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

.v-btn {
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.v-chip {
  border-radius: 8px;
}

:deep(.v-avatar) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.filter-circle-btn {
  border-radius: 30% !important;
  width: 56px !important;
  height: 56px !important;
  box-shadow: 0 4px 12px rgba(175, 29, 54, 0.3);
  transition: all 0.3s ease;
  min-height: 56px !important;
  margin-bottom: 20px;
}

.filter-circle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 18px rgba(175, 29, 54, 0.5);
}
</style>