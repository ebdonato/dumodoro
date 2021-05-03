<template>
    <q-page class="flex flex-center bg-dark">
        <div class="column">
            <div class="text-center text-primary text-h6">Configurações</div>
            <div style="width: 90vw;" class="q-mt-lg">
                <q-list>
                    <q-item>
                        <q-item-section avatar>
                            <q-img src="work.png" spinner-color="primary" style="height: 30px; max-width: 30px">
                                <q-tooltip :delay="1000">
                                    Produção
                                </q-tooltip>
                            </q-img>
                        </q-item-section>
                        <q-item-section>
                            <q-slider
                                v-model="work"
                                :min="1"
                                :max="100"
                                :step="1"
                                snap
                                label
                                label-always
                                color="primary"
                                label-color="transparent"
                                label-text-color="primary"
                            />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section avatar>
                            <q-img src="pause.png" spinner-color="primary" style="height: 30px; max-width: 30px">
                                <q-tooltip :delay="1000">
                                    Pausa
                                </q-tooltip>
                            </q-img>
                        </q-item-section>
                        <q-item-section>
                            <q-slider
                                v-model="pause"
                                :min="1"
                                :max="100"
                                :step="1"
                                snap
                                label
                                label-always
                                color="primary"
                                label-color="transparent"
                                label-text-color="primary"
                            />
                        </q-item-section>
                    </q-item>

                    <q-item>
                        <q-item-section avatar>
                            <q-img src="rest.png" spinner-color="primary" style="height: 30px; max-width: 30px">
                                <q-tooltip :delay="1000">
                                    Descanso
                                </q-tooltip>
                            </q-img>
                        </q-item-section>
                        <q-item-section>
                            <q-slider
                                v-model="rest"
                                :min="1"
                                :max="100"
                                :step="1"
                                snap
                                label
                                label-always
                                color="primary"
                                label-color="transparent"
                                label-text-color="primary"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-img src="cycle.png" spinner-color="primary" style="height: 30px; max-width: 30px">
                                <q-tooltip :delay="1000">
                                    Ciclos
                                </q-tooltip>
                            </q-img>
                        </q-item-section>
                        <q-item-section>
                            <q-slider
                                v-model="cycles"
                                :min="1"
                                :max="100"
                                :step="1"
                                snap
                                label
                                label-always
                                color="primary"
                                label-color="transparent"
                                label-text-color="primary"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-checkbox
                                v-model="autoStart"
                                keep-color
                                label="Iniciar Estágios Automaticamente"
                                color="primary"
                                left-label
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { timerProxy } from "boot/init-worker"

export default {
    name: "PageConfig",
    computed: {
        ...mapGetters("timer", ["getCycles", "getWorkTime", "getPauseTime", "getRestTime", "getAutoStart"]),
        cycles: {
            set(cycles) {
                this.setCycles(cycles)
                this.$q.localStorage.set("Cycles", cycles)
                timerProxy.setParameters({ cycles })
            },
            get() {
                return this.getCycles
            },
        },
        work: {
            set(workTime) {
                this.setWorkTime(workTime)
                this.$q.localStorage.set("WorkTime", workTime)
                timerProxy.setParameters({ workTime })
            },
            get() {
                return this.getWorkTime
            },
        },
        pause: {
            set(pauseTime) {
                this.setPauseTime(pauseTime)
                this.$q.localStorage.set("PauseTime", pauseTime)
                timerProxy.setParameters({ pauseTime })
            },
            get() {
                return this.getPauseTime
            },
        },
        rest: {
            set(restTime) {
                this.setRestTime(restTime)
                this.$q.localStorage.set("RestTime", restTime)
                timerProxy.setParameters({ restTime })
            },
            get() {
                return this.getRestTime
            },
        },
        autoStart: {
            set(autoStart) {
                this.setAutoStart(autoStart)
                this.$q.localStorage.set("AutoStart", autoStart)
                timerProxy.setParameters({ autoStart: !!autoStart })
            },
            get() {
                return this.getAutoStart
            },
        },
    },
    methods: {
        ...mapActions("timer", ["setWorkTime", "setPauseTime", "setRestTime", "setCycles", "setAutoStart"]),
    },
}
</script>

<style></style>
