<template>
    <!-- Affichage du groupe -->
    <!-- Afficher tous les mots de passe du groupe -->
    <!-- Bouton pour copier sur le clipboard :  -->
    <p>{{object['group_name']}}</p>
</template>

<script>
export default {
    name : 'Group',
    props : ['object'],
}
</script>
