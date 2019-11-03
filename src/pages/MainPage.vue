<template>
  <div>
    <NavigationBar>

    </NavigationBar>
    
    <v-content>
      <p>{{ this.$store.state }}</p>
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