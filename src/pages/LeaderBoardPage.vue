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
                        <v-list-item class="mb-0">
                            <v-list-item-content>
                                <div class="d-inline-flex">
                                    <v-avatar class="d-inline-flex pa-5" v-bind:color="getColor(index+1)" size="32">
                                        <span class="white--text headline">{{ index + 1 }}</span>
                                    </v-avatar>
                                    <v-list-item-title class="headline mb-1 pl-3">{{ member.name }}</v-list-item-title>
                                </div>
                            </v-list-item-content>

                            <v-progress-circular
                                    :rotate="-90"
                                    :size="64"
                                    :width="15"
                                    :value="getPercant(member.experience, member.maxExperience)"
                                    class="mt-1"
                                    color="teal"
                            >
                                <v-avatar size="48">
                                    <img v-bind:src="member.icon" v-bind:alt="member.name"/>
                                </v-avatar>
                            </v-progress-circular>
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
                this.leaderboard.forEach(e => this.leaderboard.push(e));
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