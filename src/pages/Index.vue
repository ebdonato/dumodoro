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
                icon="img:cycle.png"
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
                        src="work.png"
                        spinner-color="primary"
                        style="height: 100px; max-width: 100px"
                    />
                    <q-img
                        v-if="getStage == 'pause'"
                        src="pause.png"
                        spinner-color="primary"
                        style="height: 100px; max-width: 100px"
                    />
                    <q-img
                        v-if="getStage == 'rest'"
                        src="rest.png"
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
                <q-btn flat round color="primary" icon="skip_next" @click="skipStageDialog">
                    <q-tooltip :delay="1000">
                        Próximo estágio
                    </q-tooltip>
                </q-btn>
                <q-btn v-if="getStatus != 'running'" flat round color="primary" icon="play_arrow" @click="startStage">
                    <q-tooltip :delay="1000">
                        Iniciar
                    </q-tooltip>
                </q-btn>
                <q-btn v-else flat round color="primary" icon="pause" @click="stopStage">
                    <q-tooltip :delay="1000">
                        Pausar
                    </q-tooltip>
                </q-btn>
                <q-btn flat round color="primary" icon="replay" @click="resetDialog">
                    <q-tooltip :delay="1000">
                        Resetar
                    </q-tooltip>
                </q-btn>
            </div>
        </div>
    </q-page>
</template>

<script>
import { mapGetters } from "vuex"
import { timerProxy } from "boot/init-worker"

export default {
    name: "PageIndex",
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
        timerProxy.getParametersAndState()
    },
    methods: {
        startStage() {
            timerProxy.start()

            window.Notification &&
                !["denied", "granted"].includes(Notification.permission) &&
                this.$q
                    .dialog({
                        title: "Notificações",
                        message: "Exibir notificação ao fim de cada estágio?",
                        dark: true,
                        cancel: true,
                        persistent: true,
                    })
                    .onOk(() => {
                        Notification.requestPermission()
                    })
        },
        stopStage() {
            timerProxy.stop()
        },
        skipStage() {
            timerProxy.skip()
        },
        reset() {
            timerProxy.reset()
        },
        skipStageDialog() {
            this.$q
                .dialog({
                    title: "Próximo estágio?",
                    dark: true,
                    cancel: true,
                    persistent: true,
                })
                .onOk(() => {
                    this.skipStage()
                })
        },
        resetDialog() {
            this.$q
                .dialog({
                    title: "Resetar tudo?",
                    dark: true,
                    cancel: true,
                    persistent: true,
                })
                .onOk(() => {
                    this.reset()
                })
        },
    },
}
</script>
