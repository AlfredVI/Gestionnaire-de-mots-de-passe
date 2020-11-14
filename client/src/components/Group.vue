<template>
    <!-- Affichage du groupe -->
    <!-- Afficher tous les mots de passe du groupe -->
    <!-- Bouton pour copier sur le clipboard :  -->
    <div>
        <details> 
        <summary>{{object.group_name}}</summary>
            <p>Description : {{description}}</p>
            <p>
            <div v-if="passwords.length">
                <h2>Mots de passe :</h2>
                <ul>
                    <li v-for="password in passwords" :key="password.id"> 
                        {{ password.password_application}} - {{ password.password_text}} (description : {{password.password_description}})
                        <button style="margin-left : 20px"
                                v-clipboard="password.password_text"
                                v-clipboard:success="successClipboardHandler"
                                v-clipboard:error="errorClipboardHandler"> 
                                Copier</button>
                        <button style="margin-left : 20px"
                                v-clipboard="password.password_text"
                                v-clipboard:success="successClipboardHandler"
                                v-clipboard:error="errorClipboardHandler"> 
                                Supprimer</button> 
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>Aucun mot de passe</p>
            </div>
            <br>
            <p>
                <button v-on:click="toDeleteGroup"> Supprimer ce groupe </button>
            </p><br>
        </details>
    </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import Clipboard from 'v-clipboard'
import Cookies from 'vue-cookies'
Vue.use(Clipboard)
Vue.use(Cookies)

export default {
    name : 'Group',
    props : ['object'],
    data: function() {
        return {
            group_name: this.object.group_name,
            group_id: this.object.group_id,
            passwords: [],
            description:this.object.group_description
        }
    },

    created: function() {  
        axios.get('http://localhost:8673/password/group/' + this.group_id)
        .then( rep => {
            this.passwords = rep.data
        })
        .catch(err => {
            console.err(err.toString())
        })
    },

    methods: {
        successClipboardHandler ({ value }) {
            console.log('Copié !', value)
        },
         errorClipboardHandler ({ value }) {
            console.log('Erreur', value)
         },
         toDeleteGroup: function() {
            axios.delete('http://localhost:8673/group/'+ this.group_id)
            .then(rep => {
                if (rep.data.length == 0) {
                    this.$parent.actualize()
                }
            })
            .catch(err => {
                console.err(err.toString())
            })
         }
    }
}
</script>

<style>
li {
    text-align: left;
}
</style>
