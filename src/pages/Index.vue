<template>
    <q-page class="flex flex-center bg-dark">
        <div class="column justify-between q-gutter-md">
            <q-rating
                :value="getCycle"
                size="2em"
                :max="getCycles"
                color="primary"
                readonly
                class="self-center"
                icon="circle"
            />
            <div>
                <q-circular-progress
                    :value="getProgress"
                    size="180px"
                    :thickness="0.22"
                    color="primary"
                    track-color="dark"
                    class="q-ma-md"
                    readonly
                    show-value
                >
                    <q-img
                        v-if="getStage == 'work'"
                        src="~assets/work.png"
                        spinner-color="primary"
                        style="height: 100px; max-width: 100px"
                    />
                    <q-img
                        v-if="getStage == 'pause'"
                        src="~assets/pause.png"
                        spinner-color="primary"
                        style="height: 100px; max-width: 100px"
                    />
                    <q-img
                        v-if="getStage == 'rest'"
                        src="~assets/rest.png"
                        spinner-color="primary"
                        style="height: 100px; max-width: 100px"
                    />
                    <q-tooltip :delay="1000"> {{ getStage | stage }} </q-tooltip>
                </q-circular-progress>
                <div class="text-h3 text-center text-primary">
                    {{ getTimeRemaining }}
                    <q-tooltip :delay="1000">
                        Tempo Restante
                    </q-tooltip>
                </div>
            </div>
            <div class="row justify-between">
                <q-btn flat round color="primary" icon="skip_next" @click="skipStage">
                    <q-tooltip :delay="1000">
                        Próximo estágio
                    </q-tooltip>
                </q-btn>
                <q-btn v-if="getStatus == 'stopped'" flat round color="primary" icon="play_arrow" @click="startStage">
                    <q-tooltip :delay="1000">
                        Iniciar
                    </q-tooltip>
                </q-btn>
                <q-btn v-else flat round color="primary" icon="pause" @click="stopStage">
                    <q-tooltip :delay="1000">
                        Pausar
                    </q-tooltip>
                </q-btn>
                <q-btn flat round color="primary" icon="replay" @click="reset">
                    <q-tooltip :delay="1000">
                        Resetar
                    </q-tooltip>
                </q-btn>
            </div>
        </div>
    </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
    name: "PageIndex",
    data() {
        return {
            value: 100,
        }
    },
    filters: {
        stage(value) {
            const nextStageOptions = {
                work: "Produção",
                pause: "Pausa",
                rest: "Descanso",
            }

            return nextStageOptions[value] ?? "Produção"
        },
    },
    computed: {
        ...mapGetters("timer", ["getTimeRemaining", "getStage", "getProgress", "getStatus", "getCycle", "getCycles"]),
    },
    mounted() {
        if (!this.getStage) {
            this.reset()
        }
    },
    methods: {
        ...mapActions("timer", ["startStage", "stopStage", "skipStage", "reset"]),
    },
}
</script>
