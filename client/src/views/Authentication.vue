<template>
    <div>
        <h1>Bienvenue sur votre gestionnaire de mot de passe</h1>
        <Authform></Authform>
    </div>
</template>

<script>
// @ is an alias to /src
import Authform from '@/components/Authform.vue'

export default {
  name: 'Home',
  components: {
    Authform
  }
}
</script>