<template>
    <v-app id="inspire">
        <v-layout row justify-center v-if="state === 'loading'">
            <v-progress-circular :size="70" :width="10" color="primary" indeterminate></v-progress-circular>
        </v-layout>

        <v-container v-else-if="state === 'error'">
            <v-row justify="center">
                <v-alert
                        type="error"
                >Connexion à l'API impossible, merci de réessayer ultérieusement ou contacter un Pilier.
                </v-alert>
            </v-row>
        </v-container>

        <v-container v-else-if="state === 'login'">
            <v-row justify="center">
                <v-alert
                        type="info"
                >Vous devez vous connecter avec votre compte Discord pour accéder au site.
                </v-alert>
            </v-row>
            <v-row justify="center">
                <v-btn @click="login()" color="info" dark large>Se connecter</v-btn>
            </v-row>
        </v-container>

        <router-view v-else-if="state === 'successful'"></router-view>
    </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const Users = createNamespacedHelpers('users');

    export default {
        data: () => {
            return {
                state: "loading"
            };
        },
        methods: {
            ...Users.mapActions({
                setUser: 'setUser',
            }),
            login: () => {
                window.location.href = `${process.env.VUE_APP_API_ROOT}/auth/login`;
            }
        },
        created() {
            this.$axios.get("/user", {withCredentials: true}).then(
                response => {
                    const data = response.data;
                    this.setUser({data});
                    // Attention à ce genre de code, si jamais tu ecris sucessfull ou autre, tu auras une erreur
                    // Il vaut mieux dans ces cas là se basait sur des enums
                    this.state = "successful";
                },
                error => {
                    if (error.message === "Network Error") {
                        this.state = "error";
                    } else if (error.response.status === 403) {
                        this.state = "login";
                    }
                }
            );
        }
    };
</script>