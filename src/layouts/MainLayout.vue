<template>
    <q-layout view="hHh lpR lFf">
        <q-header bordered class="bg-dark text-primary">
            <q-toolbar>
                <q-toolbar-title>
                    Du!modoro
                </q-toolbar-title>
                <q-btn flat round color="text-primary" icon="settings" />
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    name: "MainLayout",
}
</script>
