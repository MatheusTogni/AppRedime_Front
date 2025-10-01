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
                <v-btn class="ml-2" :loading="loadingPostagem" color="primary" variant="flat" @click="criarPostagem">
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
    <v-dialog v-model="modalEvento" max-width="1000px" persistent>
      <v-card>
        <v-card-title class="text-h5 bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-calendar-plus</v-icon>
          Criar Evento
        </v-card-title>
        
        <v-card-text class="pa-6">
          <v-row>
            <!-- Calendário customizado -->
            <v-col cols="12" md="8">
              
              <!-- Navegação do calendário -->
              <v-card class="mb-4" elevation="2">
                <v-card-text class="d-flex align-center justify-space-between pa-4">
                  <v-btn
                    icon="mdi-chevron-left"
                    variant="text"
                    @click="mesAnterior"
                  ></v-btn>
                  
                  <div class="text-center">
                    <h4 class="text-h6 font-weight-bold">
                      {{ nomesMeses[mesAtual] }} {{ anoAtual }}
                    </h4>
                  </div>
                  
                  <v-btn
                    icon="mdi-chevron-right"
                    variant="text"
                    @click="proximoMes"
                  ></v-btn>
                </v-card-text>
              </v-card>

              <!-- Calendário -->
              <v-card elevation="4">
                <v-card-text class="pa-0">
                  <!-- Cabeçalho dos dias da semana -->
                  <div class="calendar-header-grid">
                    <div
                      v-for="dia in diasSemana"
                      :key="dia"
                      class="calendar-header-day"
                    >
                      <span class="font-weight-bold text-body-2">{{ dia }}</span>
                    </div>
                  </div>

                  <!-- Dias do calendário -->
                  <div class="calendar-grid">
                    <div
                      v-for="(dia, index) in diasCalendario"
                      :key="index"
                      class="calendar-day"
                      :class="{
                        'outro-mes': !dia.mesAtual,
                        'hoje': dia.hoje,
                        'selecionado': dia.selecionado,
                        'com-evento': dia.eventos.length > 0
                      }"
                      @click="selecionarDia(dia)"
                    >
                      <div class="day-number">{{ dia.numero }}</div>
                      
                      <!-- Indicadores de eventos existentes -->
                      <div v-if="dia.eventos.length > 0" class="eventos-indicator">
                        <v-chip
                          v-for="evento in dia.eventos.slice(0, 1)"
                          :key="evento.id"
                          size="x-small"
                          :color="evento.cor"
                          class="evento-mini mb-1"
                        >
                          {{ evento.titulo.substring(0, 6) }}{{ evento.titulo.length > 6 ? '...' : '' }}
                        </v-chip>
                        <span v-if="dia.eventos.length > 1" class="text-caption">
                          +{{ dia.eventos.length - 1 }}
                        </span>
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
              
              <v-alert 
                v-if="dataSelecionadaCalendario" 
                type="info" 
                class="mt-4"
                variant="tonal"
              >
                <strong>Data selecionada:</strong> {{ formatarDataSelecionada(dataSelecionadaCalendario) }}
              </v-alert>
            </v-col>

            <!-- Informações do evento selecionado -->
            <v-col cols="12" md="4" v-if="dataSelecionadaCalendario">
              <v-card elevation="2" class="pa-4">
                <h4 class="text-h6 mb-4">Eventos nesta data</h4>
                
                <div v-if="eventosNaDataSelecionada.length === 0" class="text-center py-4">
                  <v-icon size="48" color="grey" class="mb-2">mdi-calendar-blank</v-icon>
                  <p class="text-grey">Nenhum evento nesta data</p>
                </div>
                
                <v-list v-else density="compact">
                  <v-list-item
                    v-for="evento in eventosNaDataSelecionada"
                    :key="evento.id"
                    class="mb-2 rounded border"
                  >
                    <template v-slot:prepend>
                      <v-avatar :color="evento.cor" size="30">
                        <v-icon color="white" size="16">mdi-calendar</v-icon>
                      </v-avatar>
                    </template>
                    
                    <v-list-item-title class="text-body-2">{{ evento.titulo }}</v-list-item-title>
                    <v-list-item-subtitle class="text-caption">{{ evento.descricao }}</v-list-item-subtitle>

                    <template v-slot:append>
                        <v-btn
                          size="small"
                          color="green"
                          variant="text"
                          icon="mdi-pencil"
                          @click="editarEvento(evento)"
                        ></v-btn>
                        <v-btn
                          size="small"
                          color="primary"
                          variant="text"
                          icon="mdi-delete"
                          @click="confirmarExclusaoEvento(evento)"
                        ></v-btn>
                    </template>
                  </v-list-item>
                </v-list>
                
                <v-btn
                  color="primary"
                  variant="flat"
                  block
                  class="mt-4"
                  prepend-icon="mdi-plus"
                  @click="abrirDialogNovoEvento"
                >
                  Adicionar Evento
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="flat" @click="fecharModalEvento">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog para criar novo evento -->
    <v-dialog v-model="dialogNovoEvento" max-width="600px" persistent>
      <v-card>
        <v-card-title class="text-h5 bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-calendar-plus</v-icon>
          Novo Evento
        </v-card-title>
        
        <v-card-text class="pa-6">
          <v-alert 
            v-if="dataSelecionadaCalendario" 
            type="info" 
            class="mb-4"
            variant="tonal"
          >
            <strong>Data:</strong> {{ formatarDataSelecionada(dataSelecionadaCalendario) }}
          </v-alert>

          <v-form ref="formEvento">
            <v-text-field
              v-model="novoEvento.titulo"
              label="Título do Evento"
              variant="outlined"
              class="mb-4"
              :rules="[v => !!v || 'Título é obrigatório']"
              required
            ></v-text-field>
            
            <v-textarea
              v-model="novoEvento.descricao"
              label="Descrição"
              variant="outlined"
              rows="4"
              class="mb-4"
            ></v-textarea>

            <v-select
              v-model="novoEvento.cor"
              :items="coresDisponiveis"
              label="Cor do Evento"
              variant="outlined"
              class="mb-4"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-avatar :color="item.value" size="20"></v-avatar>
                  </template>
                </v-list-item>
              </template>
              <template v-slot:selection="{ item }">
                <div class="d-flex align-center">
                  <v-avatar :color="item.value" size="20" class="mr-2"></v-avatar>
                  {{ item.title }}
                </div>
              </template>
            </v-select>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          
          <v-btn color="grey" variant="flat" @click="fecharDialogNovoEvento">
            Cancelar
          </v-btn>
          
          <v-btn 
            :loading="loadingEvento" 
            color="primary" 
            variant="flat" 
            @click="criarEvento"
          >
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

    <!-- Modal de edição de evento -->
    <v-dialog v-model="modalEditarEvento" max-width="600px">
      <v-card>
        <v-card-title class="text-h5 bg-primary white--text">
          <v-icon left color="white" class="mr-3">mdi-pencil</v-icon>
          Editar Evento
        </v-card-title>
        <v-card-text class="pa-6">
          <v-form>
            <v-text-field
              v-model="eventoEditando.titulo"
              label="Título do Evento"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
            
            <v-textarea
              v-model="eventoEditando.descricao"
              label="Descrição"
              variant="outlined"
              rows="4"
              class="mb-4"
            ></v-textarea>

            <v-text-field
              v-model="eventoEditando.data_evento"
              label="Data do Evento"
              type="date"
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-select
              v-model="eventoEditando.cor"
              :items="coresDisponiveis"
              label="Cor do Evento"
              variant="outlined"
              class="mb-4"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-avatar :color="item.value" size="20"></v-avatar>
                  </template>
                </v-list-item>
              </template>
              <template v-slot:selection="{ item }">
                <div class="d-flex align-center">
                  <v-avatar :color="item.value" size="20" class="mr-2"></v-avatar>
                  {{ item.title }}
                </div>
              </template>
            </v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="flat" @click="modalEditarEvento = false">
            Cancelar
          </v-btn>
          <v-btn
            :loading="loadingEvento"
            color="primary"
            variant="flat"
            @click="salvarEdicaoEvento"
          >
            Salvar Alterações
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de confirmação de exclusão de evento -->
    <v-dialog v-model="dialogExclusaoEvento" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          Confirmar Exclusão
        </v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir o evento "<strong>{{ eventoParaExcluir?.titulo }}</strong>"?
          <br><br>
          Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="flat" @click="dialogExclusaoEvento = false">
            Cancelar
          </v-btn>
          <v-btn
            :loading="excluindoEvento"
            color="primary"
            variant="flat"
            @click="excluirEvento"
          >
            Excluir
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
      dialogNovoEvento: false,
      uploadLoaging: false,
      tabAtiva: 'upload',
      tabAtivaPostagem: 'criar',
      carregandoMinistracoes: false,
      carregandoPostagens: false,
      carregandoEventos: false,
      excluindoArquivo: false,
      excluindoEvento: false,
      loadingEvento: false,
      loadingPostagem: false,
      dialogExclusao: false,
      dialogExclusaoPostagem: false,
      dialogExclusaoEvento: false,
      modalEditarEvento: false,
      ministracoes: [] as any[],
      postagens: [] as any[],
      eventosAdmin: [] as any[],
      ministracaoParaExcluir: null as any,
      postagemParaExcluir: null as any,
      eventoParaExcluir: null as any,
      eventoEditando: {} as any,
      imagensVisualizacao: [] as string[],
      dialogImagens: false,
      
      // Calendário customizado
      mesAtual: new Date().getMonth(),
      anoAtual: new Date().getFullYear(),
      dataSelecionadaCalendario: null as string | null,
      
      nomesMeses: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      
      diasSemana: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      
      coresDisponiveis: [
        { title: 'Azul', value: '#1976d2' },
        { title: 'Vermelho', value: '#d32f2f' },
        { title: 'Verde', value: '#388e3c' },
        { title: 'Laranja', value: '#f57c00' },
        { title: 'Roxo', value: '#7b1fa2' },
        { title: 'Rosa', value: '#c2185b' },
        { title: 'Ciano', value: '#0097a7' },
        { title: 'Indigo', value: '#303f9f' }
      ],
      
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
        titulo: "",
        descricao: "",
        cor: "#1976d2",
      },
      arquivos: [] as File[],
      novoArquivo: {
        titulo: "",
      },
    }
  },

  computed: {
    diasCalendario() {
      const dias = [];
      const primeiroDia = new Date(this.anoAtual, this.mesAtual, 1);
      const ultimoDia = new Date(this.anoAtual, this.mesAtual + 1, 0);
      const primeiroDiaSemana = primeiroDia.getDay();

      // Dias do mês anterior
      const mesAnterior = new Date(this.anoAtual, this.mesAtual, 0);
      for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
        const dia = mesAnterior.getDate() - i;
        const dataString = `${String(dia).padStart(2, '0')}/${String(this.mesAtual).padStart(2, '0')}/${this.anoAtual}`;
        dias.push({
          numero: dia,
          data: dataString,
          mesAtual: false,
          hoje: false,
          eventos: [],
          selecionado: false
        });
      }

      // Dias do mês atual
      for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const dataString = `${String(dia).padStart(2, '0')}/${String(this.mesAtual + 1).padStart(2, '0')}/${this.anoAtual}`;
        const hoje = new Date();
        const isHoje = `${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}/${hoje.getFullYear()}` === dataString;

        const eventosDodia = this.eventosAdmin.filter(evento => evento.data_evento === dataString);

        // Verifica se este dia está selecionado
        let selecionado = false;
        if (this.dataSelecionadaCalendario) {
          // dataSelecionadaCalendario está no formato 'YYYY-MM-DD'
          const [anoSel, mesSel, diaSel] = this.dataSelecionadaCalendario.split('-');
          const dataSelString = `${String(Number(diaSel)).padStart(2, '0')}/${String(Number(mesSel)).padStart(2, '0')}/${anoSel}`;
          selecionado = dataSelString === dataString;
        }

        dias.push({
          numero: dia,
          data: dataString,
          mesAtual: true,
          hoje: isHoje,
          eventos: eventosDodia,
          selecionado
        });
      }

      // Completar com dias do próximo mês
      const diasRestantes = 42 - dias.length;
      for (let dia = 1; dia <= diasRestantes; dia++) {
        const dataString = `${String(dia).padStart(2, '0')}/${String(this.mesAtual + 2).padStart(2, '0')}/${this.anoAtual}`;
        dias.push({
          numero: dia,
          data: dataString,
          mesAtual: false,
          hoje: false,
          eventos: [],
          selecionado: false
        });
      }

      return dias;
    },

    eventosNaDataSelecionada() {
      if (!this.dataSelecionadaCalendario) return [];
      return this.eventosAdmin.filter(evento => evento.data_evento === this.dataSelecionadaCalendario);
    }
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
    // helper removido (usaremos Date nativo para formatação)
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
        const baseUrl = 'https://missaoredimepzo.com/api/';
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
      this.carregarEventosAdmin();
    },

    async carregarEventosAdmin() {
      this.carregandoEventos = true;
      try {
        const response = await this.HTTP("GET", "calendario/get-eventos");
        if (response && response.data) {
          this.eventosAdmin = (response.data.eventos || []).map((ev: any) => {
            const copy = { ...ev };
            if (copy.data_evento) {
              // Normalizar usando getters UTC para evitar shift de timezone
              const d = new Date(copy.data_evento);
              const y = d.getUTCFullYear();
              const m = String(d.getUTCMonth() + 1).padStart(2, '0');
              const day = String(d.getUTCDate()).padStart(2, '0');
              copy._localDate = `${y}-${m}-${day}`;
              copy._localDateObj = new Date(y, Number(m) - 1, Number(day));
            } else {
              copy._localDate = null;
              copy._localDateObj = null;
            }
            return copy;
          });
        }
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        this.$toast.error("Erro ao carregar eventos.");
      } finally {
        this.carregandoEventos = false;
      }
    },

    mesAnterior() {
      if (this.mesAtual === 0) {
        this.mesAtual = 11;
        this.anoAtual--;
      } else {
        this.mesAtual--;
      }
    },

    proximoMes() {
      if (this.mesAtual === 11) {
        this.mesAtual = 0;
        this.anoAtual++;
      } else {
        this.mesAtual++;
      }
    },

    selecionarDia(dia: any) {
      if (!dia) return;
      if (dia.mesAtual) {
        // Converte de DD/MM/YYYY para YYYY-MM-DD
        const [diaSel, mesSel, anoSel] = dia.data.split('/');
        this.dataSelecionadaCalendario = `${anoSel}-${mesSel}-${diaSel}`;
      }
    },

    abrirDialogNovoEvento() {
      if (!this.dataSelecionadaCalendario) {
        this.$toast.info("Por favor, selecione uma data no calendário primeiro.");
        return;
      }
      this.dialogNovoEvento = true;
    },

    fecharModalEvento() {
      this.modalEvento = false;
      this.dataSelecionadaCalendario = null;
    },

    fecharDialogNovoEvento() {
      this.dialogNovoEvento = false;
      this.novoEvento = {
        titulo: "",
        descricao: "",
        cor: "#1976d2",
      };
    },

    formatarDataSelecionada(data: string) {
      return data; // A data já está formatada pelo backend
    },

    async criarEvento() {
      if (!this.novoEvento.titulo || !this.dataSelecionadaCalendario) {
        this.$toast.info("Por favor, preencha o título e selecione uma data.");
        return;
      }

      this.loadingEvento = true;
      try {
        const response = await this.HTTP("POST", "calendario/create-evento", {
          titulo: this.novoEvento.titulo,
          descricao: this.novoEvento.descricao,
          data_evento: this.dataSelecionadaCalendario,
          cor: this.novoEvento.cor
        });

        if (response) {
          this.$toast.success("Evento criado com sucesso!");
          this.fecharDialogNovoEvento();
          await this.carregarEventosAdmin();
        }
      } catch (error) {
        console.error("Erro ao criar evento:", error);
        this.$toast.error("Erro ao criar evento. Tente novamente.");
      } finally {
        this.loadingEvento = false;
      }
    },

    editarEvento(evento: any) {
      this.eventoEditando = { ...evento };
      this.modalEditarEvento = true;
    },

    async salvarEdicaoEvento() {
      if (!this.eventoEditando.titulo || !this.eventoEditando.data_evento) {
        this.$toast.info("Por favor, preencha o título e a data.");
        return;
      }

      this.loadingEvento = true;
      try {
        const response = await this.HTTP("PUT", `calendario/update-evento/${this.eventoEditando.id}`, {
          titulo: this.eventoEditando.titulo,
          descricao: this.eventoEditando.descricao,
          data_evento: this.eventoEditando.data_evento,
          cor: this.eventoEditando.cor
        });

        if (response) {
          this.$toast.success("Evento atualizado com sucesso!");
          this.modalEditarEvento = false;
          this.eventoEditando = {};
          await this.carregarEventosAdmin();
        }
      } catch (error) {
        this.$toast.error("Erro ao atualizar evento. Tente novamente.");
      } finally {
        this.loadingEvento = false;
      }
    },

    confirmarExclusaoEvento(evento: any) {
      this.eventoParaExcluir = evento;
      this.dialogExclusaoEvento = true;
    },

    async excluirEvento() {
      if (!this.eventoParaExcluir) return;
      
      this.excluindoEvento = true;
      try {
        const response = await this.HTTP("DELETE", `calendario/delete-evento/${this.eventoParaExcluir.id}`);
        if (response) {
          this.$toast.success("Evento excluído com sucesso!");
          this.dialogExclusaoEvento = false;
          this.eventoParaExcluir = null;
          await this.carregarEventosAdmin();
        }
      } catch (error) {
        console.error("Erro ao excluir evento:", error);
        this.$toast.error("Erro ao excluir evento.");
      } finally {
        this.excluindoEvento = false;
      }
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
      if (!data) return '';
      const d = new Date(data);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
    },

    baixarArquivo(url: string) {
      const baseUrl = 'https://missaoredimepzo.com/api';
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
      this.loadingPostagem = true;
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
        this.loadingPostagem = false;
      }
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

/* Estilos do calendário customizado */
.calendar-header {
  background: #af1d36;
  color: white;
}

.calendar-header-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #af1d36;
  color: white;
}

.calendar-header-day {
  padding: 12px 8px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.calendar-header-day:last-child {
  border-right: none;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #333;
}

.calendar-day {
  background: #1e1e1e;
  min-height: 80px;
  padding: 8px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
}

.calendar-day:hover {
  background: #2a2a2a;
}

.calendar-day.outro-mes {
  opacity: 0.3;
  cursor: default;
}

.calendar-day.hoje {
  background: rgba(175, 29, 54, 0.1);
  border-color: #af1d36;
}

.calendar-day.selecionado {
  background: rgba(175, 29, 54, 0.2) !important;
  border-color: #af1d36 !important;
  box-shadow: 0 0 10px rgba(175, 29, 54, 0.5);
}

.calendar-day.com-evento {
  background: rgba(175, 29, 54, 0.05);
}

.day-number {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
  color: #ffffff;
}

.eventos-indicator {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.evento-mini {
  cursor: pointer;
  text-transform: none;
  font-size: 9px;
  height: 16px;
  min-width: 0;
}
</style>
