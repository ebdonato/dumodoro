<template>
    <q-layout view="hHh lpR lFf" class="bg-dark text-primary">
        <q-header>
            <q-toolbar class="bg-dark text-primary">
                <q-toolbar-title>
                    {{ productName }}
                </q-toolbar-title>
                <q-btn
                    v-if="$router.currentRoute.name == 'Index'"
                    flat
                    round
                    color="text-primary"
                    icon="settings"
                    :to="{ name: 'Config' }"
                />
                <q-btn v-else flat round color="text-primary" icon="home" :to="{ name: 'Index' }" />
            </q-toolbar>
        </q-header>

        <q-page-container>
            <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <router-view />
            </transition>
        </q-page-container>

        <q-footer>
            <q-toolbar class="bg-dark text-secondary">
                <q-btn flat round size="xs" color="text-secondary" icon="favorite" @click="autoClose" />
                <q-space />
                <div class="text-caption text-weight-thin">v{{ version }}</div>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
import { version, productName, description, author } from "../../package.json"
export default {
    name: "MainLayout",
    data() {
        return { version, productName, description, author }
    },
    methods: {
        autoClose() {
            let seconds = 5
            const dialog = this.$q
                .dialog({
                    title: this.description,
                    message: this.author,
                    dark: true,
                })
                .onDismiss(() => {
                    clearTimeout(timer)
                })
            const timer = setInterval(() => {
                seconds--
                if (seconds <= 0) {
                    clearInterval(timer)
                    dialog.hide()
                }
            }, 1000)
        },
    },
}
</script>
