<template>
    <q-page class="flex flex-center bg-dark">
        <div class="column justify-center">
            <q-knob
                :value="getProgress"
                size="200px"
                :thickness="0.2"
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
            </q-knob>
            <div class="text-h2 text-center text-primary">{{ getTimeRemaining }}</div>
            <div class="row justify-between">
                <q-btn flat round color="primary" icon="skip_next" @click="nextStage" />
                <q-btn v-if="getStatus == 'stopped'" flat round color="primary" icon="play_arrow" @click="startStage" />
                <q-btn v-else flat round color="primary" icon="pause" @click="stopStage" />
                <q-btn flat round color="primary" icon="replay" />
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
    computed: {
        ...mapGetters("timer", ["getTimeRemaining", "getStage", "getProgress", "getStatus"]),
    },
    mounted() {
        if (!this.getStage) {
            this.nextStage()
        }
    },
    methods: {
        ...mapActions("timer", ["startStage", "stopStage", "nextStage", "reset"]),
    },
}
</script>
