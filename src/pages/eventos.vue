<template>
  <v-container fluid class="events-container pa-0">
      <v-row justify="center" align="center" class="min-vh-100">
        <v-col cols="12" class="text-center">
          <div class="header-section mb-8">
            <v-icon size="80" color="#af1d36" class="calendar-icon mt-4">mdi-calendar</v-icon>
            <h1 class="app-title mb-2">Eventos da Igreja</h1>
            <p class="app-subtitle mb-6">Confira os próximos eventos e atividades da nossa comunidade</p>
          </div>

          <!-- Calendário de Visualização -->
          <div class="calendar-section mb-8">
            <v-card class="calendar-card" elevation="8">
              <v-card-title class="text-center bg-primary">
                <v-icon left color="white" class="mr-3">mdi-calendar-month</v-icon>
                Calendário de Eventos
              </v-card-title>
              
              <v-card-text class="pa-6">
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
                          'com-evento': dia.eventos.length > 0
                        }"
                        @click="visualizarEventosDia(dia)"
                      >
                        <div class="day-number">{{ dia.numero }}</div>
                        
                        <!-- Indicadores de eventos existentes -->
                        <div v-if="dia.eventos.length > 0" class="eventos-indicator">
                          <v-chip
                            v-for="evento in dia.eventos.slice(0, 2)"
                            :key="evento.id"
                            size="x-small"
                            :color="evento.cor"
                            class="evento-mini mb-1"
                          >
                            {{ evento.titulo.substring(0, 8) }}{{ evento.titulo.length > 8 ? '...' : '' }}
                          </v-chip>
                          <span v-if="dia.eventos.length > 2" class="text-caption">
                            +{{ dia.eventos.length - 2 }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </div>

          <!-- Lista de Próximos Eventos -->
          <div class="events-grid">
            <h2 class="section-title mb-6">Próximos Eventos</h2>
            <v-row justify="center" class="ma-0">
              <v-col 
                v-for="evento in proximosEventos" 
                :key="evento.id" 
                cols="12" 
                sm="6" 
                md="4" 
                class="pa-2"
              >
                <v-card 
                  class="event-card" 
                  elevation="8" 
                  hover
                  @click="visualizarEvento(evento)"
                >
                  <v-card-text class="text-center pa-6">
                    <v-avatar :color="evento.cor || '#af1d36'" size="60" class="mb-3">
                      <v-icon color="white" size="30">mdi-calendar-star</v-icon>
                    </v-avatar>
                    <h3 class="event-title">{{ evento.titulo }}</h3>
                    <p class="event-date">{{ formatarDataEvento(evento.data_evento) }}</p>
                    <p class="event-description" v-if="evento.descricao">
                      {{ evento.descricao.length > 60 ? evento.descricao.substring(0, 60) + '...' : evento.descricao }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Mensagem quando não há eventos -->
              <v-col v-if="proximosEventos.length === 0" cols="12" class="text-center">
                <v-card class="empty-state-card" elevation="4">
                  <v-card-text class="pa-8">
                    <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-calendar-blank</v-icon>
                    <h3 class="text-h5 mb-3 text-grey-lighten-1">Nenhum evento próximo</h3>
                    <p class="text-body-1 text-grey-lighten-2">
                      Não há eventos programados no momento. Volte em breve para conferir as novidades!
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
  </v-container>

  <!-- Modal de visualização de evento individual -->
  <v-dialog v-model="modalEvento" max-width="500px">
    <v-card>
      <v-card-title class="text-h5" :style="{ backgroundColor: eventoSelecionado?.cor || '#af1d36', color: 'white' }">
        <v-icon left color="white" class="mr-3">mdi-calendar</v-icon>
        {{ eventoSelecionado?.titulo }}
      </v-card-title>
      
      <v-card-text class="pa-6">
        <div class="mb-4">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Data:</h4>
          <p>{{ formatarDataCompleta(eventoSelecionado?.data_evento) }}</p>
        </div>
        
        <div v-if="eventoSelecionado?.descricao">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Descrição:</h4>
          <p>{{ eventoSelecionado.descricao }}</p>
        </div>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="flat" @click="modalEvento = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Modal de eventos do dia selecionado -->
  <v-dialog v-model="modalEventosDia" max-width="600px">
    <v-card>
      <v-card-title class="text-h5 bg-primary white--text">
        <v-icon left color="white" class="mr-3">mdi-calendar-today</v-icon>
        Eventos de {{ formatarDataSelecionada(dataSelecionada) }}
      </v-card-title>
      
      <v-card-text class="pa-6">
        <div v-if="eventosDiaSelecionado.length === 0" class="text-center py-8">
          <v-icon size="64" color="grey" class="mb-4">mdi-calendar-blank</v-icon>
          <h3 class="text-h6 mb-2 text-grey">Nenhum evento nesta data</h3>
          <p class="text-grey">Não há eventos programados para este dia.</p>
        </div>
        
        <div v-else>
          <v-list class="bg-transparent">
            <v-list-item
              v-for="evento in eventosDiaSelecionado"
              :key="evento.id"
              class="mb-4 rounded-lg border pa-4"
            >
              <template v-slot:prepend>
                <v-avatar :color="evento.cor" size="50" class="mr-4">
                  <v-icon color="white" size="24">mdi-calendar-star</v-icon>
                </v-avatar>
              </template>

              <div>
                <v-list-item-title class="text-h6 font-weight-bold mb-2">
                  {{ evento.titulo }}
                </v-list-item-title>
                
                <v-list-item-subtitle class="text-body-2 mb-2" v-if="evento.descricao">
                  {{ evento.descricao }}
                </v-list-item-subtitle>
                
                <v-chip
                  :color="evento.cor"
                  size="small"
                  variant="outlined"
                  class="mt-2"
                >
                  <v-icon start size="16">mdi-clock</v-icon>
                  {{ formatarDataEvento(evento.data_evento) }}
                </v-chip>
              </div>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="flat" @click="modalEventosDia = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EventosPage',
  data() {
    return {
      eventos: [],
      carregandoEventos: false,
      modalEvento: false,
      modalEventosDia: false,
      eventoSelecionado: null,
      dataSelecionada: null,
      eventosDiaSelecionado: [],
      
      // Calendário
      mesAtual: new Date().getMonth(),
      anoAtual: new Date().getFullYear(),
      
      nomesMeses: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      
      diasSemana: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    };
  },

  computed: {
    proximosEventos() {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      return this.eventos
        .filter(evento => evento._localDateObj && evento._localDateObj >= hoje)
        .sort((a, b) => a._localDateObj - b._localDateObj)
        .slice(0, 6); // Mostrar apenas os próximos 6 eventos para dar espaço ao calendário
    },

    diasCalendario() {
      const dias = [];
      const primeiroDia = new Date(this.anoAtual, this.mesAtual, 1);
      const ultimoDia = new Date(this.anoAtual, this.mesAtual + 1, 0);
      const primeiroDiaSemana = primeiroDia.getDay();
      
      // Dias do mês anterior
      const mesAnterior = new Date(this.anoAtual, this.mesAtual, 0);
      const formatLocalDate = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };

      for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
        const dia = mesAnterior.getDate() - i;
        const dataString = formatLocalDate(new Date(this.anoAtual, this.mesAtual - 1, dia));
        dias.push({
          numero: dia,
          data: dataString,
          mesAtual: false,
          hoje: false,
          eventos: []
        });
      }
      
      // Dias do mês atual
      for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
  const dataCompleta = new Date(this.anoAtual, this.mesAtual, dia);
  const dataString = formatLocalDate(dataCompleta);
        const hoje = new Date();
        const isHoje = dataCompleta.toDateString() === hoje.toDateString();
        
        const eventosDodia = this.eventos.filter((evento) => {
          return evento._localDate === dataString;
        });
        
        dias.push({
          numero: dia,
          data: dataString,
          mesAtual: true,
          hoje: isHoje,
          eventos: eventosDodia
        });
      }
      
      // Completar com dias do próximo mês
      const diasRestantes = 42 - dias.length;
      for (let dia = 1; dia <= diasRestantes; dia++) {
        const dataString = formatLocalDate(new Date(this.anoAtual, this.mesAtual + 1, dia));
        dias.push({
          numero: dia,
          data: dataString,
          mesAtual: false,
          hoje: false,
          eventos: []
        });
      }
      
      return dias;
    }
  },

  async mounted() {
    await this.carregarEventos();
  },

  methods: {
    async carregarEventos() {
      this.carregandoEventos = true;
      try {
        const response = await this.HTTP("GET", "calendario/get-eventos");
        if (response && response.data) {
          this.eventos = (response.data.eventos || []).map((ev) => {
            const copy = { ...ev };
            if (copy.data_evento) {
              // data_evento vem no formato DD/MM/YYYY
              const [day, month, year] = copy.data_evento.split('/');
              copy._localDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
              copy._localDateObj = new Date(Number(year), Number(month) - 1, Number(day));
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

    visualizarEvento(evento) {
      this.eventoSelecionado = evento;
      this.modalEvento = true;
    },

    visualizarEventosDia(dia) {
      if (dia.eventos.length > 0) {
        this.dataSelecionada = dia.data;
        this.eventosDiaSelecionado = dia.eventos;
        this.modalEventosDia = true;
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

    formatarDataEvento(data) {
      return data; // A data já está formatada pelo backend
    },

    formatarDataCompleta(data) {
      return data; // A data já está formatada pelo backend
    },

    formatarDataSelecionada(data) {
      return data; // A data já está formatada pelo backend
    }
  }
};
</script>

<style scoped>
.events-container {
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 50%, #121212 100%);
  min-height: 100vh;
}

.header-section {
  margin-bottom: 3rem;
}

.calendar-icon {
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

.calendar-section {
  max-width: 1000px;
  margin: 0 auto;
}

.calendar-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(42, 42, 42, 0.9));
  border: 1px solid rgba(175, 29, 54, 0.2);
  border-radius: 20px;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #af1d36;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Estilos do calendário */
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
  min-height: 100px;
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
  border-color: rgba(175, 29, 54, 0.5);
}

.calendar-day.outro-mes {
  opacity: 0.3;
  cursor: default;
}

.calendar-day.outro-mes:hover {
  background: #1e1e1e;
  border-color: transparent;
}

.calendar-day.hoje {
  background: rgba(175, 29, 54, 0.1);
  border-color: #af1d36;
}

.calendar-day.com-evento {
  background: rgba(175, 29, 54, 0.05);
  cursor: pointer;
}

.calendar-day.com-evento:hover {
  background: rgba(175, 29, 54, 0.15);
  border-color: #af1d36;
  transform: scale(1.02);
}

.day-number {
  font-weight: bold;
  font-size: 16px;
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
  font-size: 10px;
  height: 18px;
  min-width: 0;
  transition: all 0.2s ease;
}

.evento-mini:hover {
  transform: scale(1.05);
}

.events-grid {
  max-width: 1200px;
  margin: 0 auto;
}

.event-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(42, 42, 42, 0.9));
  border: 1px solid rgba(175, 29, 54, 0.2);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 200px;
}

.event-card::before {
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

.event-card:hover {
  transform: translateY(-8px) scale(1.03);
  border-color: rgba(175, 29, 54, 0.6);
  box-shadow: 0 15px 35px rgba(175, 29, 54, 0.4);
}

.event-card:hover::before {
  opacity: 1;
}

.event-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.event-date {
  font-size: 1rem;
  color: #af1d36;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.event-description {
  font-size: 0.9rem;
  color: #cccccc;
  line-height: 1.4;
}

.admin-card {
  border-color: rgba(175, 29, 54, 0.4);
}

.admin-card:hover {
  border-color: rgba(175, 29, 54, 0.8);
  box-shadow: 0 15px 35px rgba(175, 29, 54, 0.6);
}

.empty-state-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.7), rgba(42, 42, 42, 0.7));
  border: 1px solid rgba(175, 29, 54, 0.1);
  border-radius: 20px;
}

.footer-section {
  margin-top: 3rem;
}

.footer-text {
  font-size: 0.9rem;
  color: #aaaaaa;
  font-weight: 400;
}

:deep(.v-card-title) {
  background: #af1d36 !important;
  color: white !important;
}

:deep(.v-dialog .v-card) {
  background-color: #1e1e1e !important;
  border-radius: 16px;
}

.v-btn {
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
}

@media (max-width: 960px) {
  .app-title {
    font-size: 2rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .event-card {
    height: 180px;
  }
  
  .event-title {
    font-size: 1.2rem;
  }
  
  .event-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 600px) {
  .app-title {
    font-size: 1.8rem;
  }
  
  .app-subtitle {
    font-size: 0.95rem;
  }
  
  .calendar-icon {
    font-size: 60px !important;
  }
  
  .event-card {
    height: 160px;
  }
  
  .event-title {
    font-size: 1.1rem;
  }
  
  .event-description {
    font-size: 0.8rem;
  }
}

.v-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.v-icon {
  transition: all 0.3s ease;
}

.event-card:hover .v-icon {
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