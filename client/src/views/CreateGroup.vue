<template>
    <div>
        <h1>Créer un nouveau groupe</h1>
        <GroupForm></GroupForm>
    </div>
</template>

<script>

import GroupForm from '@/components/GroupForm.vue'

export default {
  name: 'Groups',
  components: {
    GroupForm
  }
}
</script>