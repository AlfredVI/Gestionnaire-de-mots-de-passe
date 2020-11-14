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
                <p class="error" v-show="error">Error : The password has not been deleted !</p>
                <p class="success" v-show="success">Success : The password has been deleted !</p>
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
                                v-clipboard:error="errorClipboardHandler"
                                v-on:click="delete_specific_password(password.password_id)"> 
                                
                                Supprimer</button> 
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>Aucun mot de passe</p>
            </div>
            <br>
            <div>
                <button v-on:click="createPassword">Ajouter un mot de passe </button>
            </div>
            <br>
            <div>
                <button v-on:click="toDeleteGroup"> Supprimer ce groupe </button>
            </div><br>
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
            description:this.object.group_description,
            error : false,
            success : false,
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
            axios.get('http://localhost:8673/password/group/' + this.group_id)
            .then (rep => {
                for(let element in rep.data) {
                    axios.delete('http://localhost:8673/password/' + element.password_id)
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
            })
         },
         createPassword : function() {
             this.$router.push('/createPassword/' + this.group_id)
        },
        delete_specific_password: function(id){
            axios.delete('http://localhost:8673/password/'+id)
            .then( rep =>{
                if (rep == 0) {
                    this.success = true
                    this.error = false
                }
                axios.get('http://localhost:8673/password/group/' + this.group_id)
                .then( rep => {
                    this.passwords = rep.data
                })
                .catch(err => {
                    console.err(err.toString())
                })
            })
            .catch(err => {
                console.err(err.toString())
                this.success = false
                this.error = true
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
