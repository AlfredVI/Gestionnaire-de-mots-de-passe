<template>
    <div>
        <h1>Créer un nouveau mot de passe</h1>
        <PasswordForm :group_id="this.$route.params.id"></PasswordForm>
        <button v-on:click="go_back">Retour</button>
    </div>
</template>

<script>

import PasswordForm from '@/components/PasswordForm.vue'

export default {
  name: 'CreatePassword',
  components: {
    PasswordForm
  },
  methods : {
      go_back : function() {
          this.$router.push('/general')
      }
  }
}
</script>