<template>
    <div>
        <NavigationBar></NavigationBar>
        <v-fade-transition mode="out-in">
            <v-content>
                <v-layout row justify-center v-if="state === 'loading'">
                    <v-progress-circular :size="70" :width="10" color="primary" indeterminate></v-progress-circular>
                </v-layout>

                <v-container v-else-if="state === 'error'">
                    <v-row justify="center">
                        <v-alert
                                type="error"
                        >Impossible de récupérer le classement, merci de réessayer ultérieusement ou contactez un
                            Pilier.
                        </v-alert>
                    </v-row>
                </v-container>

                <div v-if="state === 'successful'">
                    <v-card
                            class="ml-5 mr-5 mt-2 mb-1"
                            v-for="(member, index) in leaderboard.slice(0, max)"
                            :key="member.name"
                    >
                    <!-- On devrait se baser sur le member.id et non le member.name il peut potentiellement y avoir plusieurs membres avec le meme nom-->
                        <v-list-item class="mb-0">
                            <v-list-item-content>
                                <div class="d-inline-flex">
                                    <v-avatar class="d-inline-flex pa-5" :color="getColor(index+1)" size="32">
                                        <span class="white--text headline">{{ index + 1 }}</span>
                                    </v-avatar>
                                    <v-list-item-title class="headline mb-1 pl-3">{{ member.name }}</v-list-item-title>
                                </div>
                            </v-list-item-content>

                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-progress-circular
                                            v-on="on"
                                            :rotate="-90"
                                            :size="64"
                                            :width="15"
                                            :value="getPercant(member.experience, member.maxExperience)"
                                            class="mt-1"
                                            color="teal"
                                    >
                                        <v-avatar size="48">
                                            <img :src="member.avatarURL" :alt="member.name"/>
                                        </v-avatar>
                                    </v-progress-circular>
                                </template>
                                <span>{{ member.experience }} / {{ member.maxExperience }}</span>
                            </v-tooltip>
                        </v-list-item>

                        <v-row no-gutters>
                            <v-col>
                                <p class="title mt-0 mb-0 pl-3">Messages: {{ round(member.messages) }}</p>
                            </v-col>
                            <v-col>
                                <p class="title mt-0 mb-0 pl-3">Niveau: {{ round(member.level) }}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                    <div class="my-2" @click="max += 100">
                        <v-btn depressed large color="primary">Afficher plus</v-btn>
                    </div>
                </div>
            </v-content>
        </v-fade-transition>
    </div>
</template>

<script>
    import NavigationBar from "@/components/NavigationBar";

    export default {
        methods: {
            getColor: index => {
                switch (index) {
                    case 1:
                        return "amber";
                    case 2:
                        return "blue-grey";
                    case 3:
                        return "brown";
                    default:
                        return "grey";
                }
            },
            round: number => {
                return Math.abs(number) > 999
                    ? Math.sign(number) * (Math.abs(number) / 1000).toFixed(1) + "k"
                    : Math.sign(number) * Math.abs(number);
            },
            getPercant: (value, maxValue) => {
                return (value * 100) / maxValue;
            }
        },
        created: async function () {
            try {
                const response = await this.$axios.get("/leaderboard", {
                    withCredentials: true
                });
                this.leaderboard = response.data;
                this.state = "successful";
            } catch (e) {
                this.state = "error";
            }
        },
        data: () => {
            return {
                state: "loading",
                max: 100,
                leaderboard: []
            };
        },
        components: {
            NavigationBar
        }
    };
</script>