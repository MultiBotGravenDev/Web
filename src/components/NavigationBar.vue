<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <div v-for="item in navbar" :key="item.id">
                    <div v-if="item.admin === false || item.admin === admin">
                        <v-list-item :disabled="isDisable(item.name)" :to="item.name.toLowerCase()">
                            <v-list-item-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </div>
            </v-list>
            <v-spacer></v-spacer>

            <template v-slot:append>
                <div class="pa-2">
                    <v-list-item :disabled="isDisable('privacy-policy')" :to="'privacy-policy'">
                        <v-list-item-content>
                            <v-list-item-title>Politique de confidentialité</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-on:click="switchLight()">
                        <v-list-item-action>
                            <v-icon>mdi-lightbulb</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>MultiBot</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';

    const Users = createNamespacedHelpers('users');

    export default {
        methods: {
            switchLight: function () {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            },
            isDisable: function (name) {
                const root = this.$route.path.substr(1).toLowerCase();
                if (root === name.toLowerCase()) {
                    return true;
                }

                return this.$route.name === "accueil" && name === "Accueil";
            }
        },
        computed: {
            ...Users.mapState({
                admin: 'admin',
            }),
        },
        data: function () {
            return {
                drawer: null,
                navbar: [
                    {
                        name: "Accueil",
                        icon: "mdi-home",
                        admin: false
                    },
                    {
                        name: "Classement",
                        icon: "mdi-podium",
                        admin: false
                    },
                    {
                        name: "Sondages",
                        icon: "mdi-poll",
                        admin: true
                    },
                    {
                        name: "Votes",
                        icon: "mdi-vote",
                        admin: true
                    },
                    {
                        name: "Candidatures",
                        icon: "mdi-book",
                        admin: true
                    },
                    {
                        name: "Sanctions",
                        icon: "mdi-gavel",
                        admin: true
                    },
                    {
                        name: "Automatismes",
                        icon: "mdi-settings",
                        admin: true
                    }
                ]
            };
        }
    };
</script>