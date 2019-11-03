<template>
  <div>
    <NavigationBar></NavigationBar>

    <v-content class="ml-5 mr-5 mt-2 mb-1">
      <p class="text-center display-2 mb-10">Politique de Confidentialité</p>
      <p class="text-center display-1">Coordonnées de l'hébergeur:</p>
      <p class="subtitle-1"><span class="font-weight-bold">Siège social : </span>2 rue Kellermann, 59100 Roubaix, France</p>
      <p class="subtitle-1"><span class="font-weight-bold">Téléphone : </span>1007</p>
      <p class="subtitle-1"><span class="font-weight-bold">Hébergeur : </span>OVH SAS</p>
    </v-content>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  components: {
    NavigationBar,
  },
};
</script>