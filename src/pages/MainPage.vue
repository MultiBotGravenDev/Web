<template>
    <div>
        <NavigationBar></NavigationBar>
        <v-content>

            <v-layout justify-center row v-if="this.state === this.states[0]">
                <v-progress-circular :size="70" :width="10" color="primary" indeterminate></v-progress-circular>
            </v-layout>

            <v-container v-else-if="this.state === this.states[2]">
                <v-row justify="center">
                    <v-alert
                            type="error"
                    >Connexion à l'API impossible, merci de réessayer ultérieusement ou contacter un Pilier.
                    </v-alert>
                </v-row>
            </v-container>

            <v-container v-else-if="this.state === this.states[1]">
                <v-row dense>
                    <v-col class="mb-5" cols="12">
                        <div class="d-lg-inline-flex d-md-inline-flex d-xl-inline-flex justify-center">
                            <v-card class="ma-1">
                                <v-card-title>Non-Membres:</v-card-title>
                                <v-card-text>{{ count.nonMembres }}</v-card-text>
                            </v-card>
                            <v-card class="ma-1">
                                <v-card-title>Membres:</v-card-title>
                                <v-card-text>{{ count.membres }}</v-card-text>
                            </v-card>
                            <v-card class="ma-1">
                                <v-card-title>Honorables:</v-card-title>
                                <v-card-text>{{ count.honorables }}</v-card-text>
                            </v-card>
                            <v-card class="ma-1">
                                <v-card-title>Développeurs:</v-card-title>
                                <v-card-text>{{ count.developpeurs }}</v-card-text>
                            </v-card>
                            <v-card class="ma-1">
                                <v-card-title>Piliers:</v-card-title>
                                <v-card-text> {{ count.piliers }}</v-card-text>
                            </v-card>
                            <v-card class="ma-1">
                                <v-card-title>Création du discord:</v-card-title>
                                <v-card-text> {{ discord.creation }}</v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                    <v-col class="mb-5" cols="12">
                        <div class="d-lg-inline-flex justify-center">
                            <v-card class="ma-1">
                                <v-card-title>Bans:</v-card-title>
                                <v-card-text>{{ member.bans }}</v-card-text>
                            </v-card>
                            <v-card class="ma-1">
                                <v-card-title>Mutes:</v-card-title>
                                <v-card-text>{{ member.mutes }}</v-card-text>
                            </v-card>
                            <v-card class="ma-1">
                                <v-card-title>Infractions:</v-card-title>
                                <v-card-text>{{ member.infractions }}</v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                    <v-col class="mb-5" cols="12" v-if="this.admin === true">
                        <div class="d-lg-inline-flex justify-center">
                                <v-card class="ma-1">
                                    <v-card-title>
                                        <v-dialog v-model="dialog" width="600px">
                                            <template v-slot:activator="{ on }">
                                                <button v-on="on">Afficher le dernier sondage</button>
                                            </template>
                                            <v-card>
                                                <v-card-title>
                                                    <span class="headline">Sondage de {{ discord.lastPoll.author }} <br> {{ discord.lastPoll.title }}</span>
                                                </v-card-title>

                                                <v-card-text v-for="(field, index) in discord.lastPoll.fields" v-key="index">{{ field }}</v-card-text>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="green darken-1" text @click="dialog = false">Fermer</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog></v-card-title>
                                </v-card>
                        </div>
                    </v-col>
                    <v-col cols="12" v-if="this.admin === true">
                        <div class="d-lg-inline-flex justify-center">
                            <v-card class="ma-1">
                                <v-card-title>Nombre de mutes actifs:</v-card-title>
                                <v-card-text>0</v-card-text>
                            </v-card>
                            <v-card class="ma-1">
                                <v-card-title>Nombre de bans actifs:</v-card-title>
                                <v-card-text>0</v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import NavigationBar from "@/components/NavigationBar";

    import {createNamespacedHelpers} from 'vuex';

    const Users = createNamespacedHelpers('users');

    export default {
        data: function () {
            return {
                states: [
                    "Loading",
                    "Successful",
                    "Error"
                ],
                state: "Loading",
                dialog: false,
                count: {
                    nonMembres: 0,
                    membres: 0,
                    honorables: 0,
                    developpeurs: 0,
                    piliers: 0,
                },
                member: {
                    bans: 0,
                    mutes: 0,
                    infractions: 0,
                },
                discord: {
                    creation: new Date(),
                    lastPoll: {},
                    totalMutes: 0,
                    totalBans: 0,
                }
            }
        },
        components: {
            NavigationBar
        },
        computed: {
            ...Users.mapState({
                admin: 'admin',
            }),
        },
        created() {
            this.$axios.get("/main", {withCredentials: true}).then(
                response => {
                    const data = response.data;
                    this.count = data.count;
                    this.members = data.members;
                    this.discord = data.discord;
                    this.state = this.states[1];
                },
                () => {
                    this.state = this.states[2];
                }
            );
        }
    };
</script>