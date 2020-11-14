<template>
    <!-- Affichage du groupe -->
    <!-- Afficher tous les mots de passe du groupe -->
    <!-- Bouton pour copier sur le clipboard :  -->
    <div>
        <details> 
         <summary>{{object.group_name}}</summary>
         <p>
             {{description}}
         </p> <br>
         <p> 
             <ul>
                <li v-for="password in passwords" :key="password"> 
                     {{ password.password_text}} - <button v-clipboard="password.password_text"
                                                              v-clipboard:success="successClipboardHandler"
                                                              v-clipboard:error="errorClipboardHandler"> 
                                                              Copiez </button> <br> 
                     {{ password.password_application}} - {{password.password_description}} 
                </li>
            </ul>
         </p><br>

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
Vue.use(Clipboard)

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

        successClipboardHandler ({ value, event }) {
             console.log('Copié !', value)
        },
 
         errorClipboardHandler ({ value, event }) {
             console.log('Erreur', value)
         },

         

         toDeleteGroup: function(event) {

            axios.delete('http://localhost:8673/group/'+ this.group_id)
            .catch(err => {
                console.err(err.toString())
            })



         }

    }
    
    
        
}
</script>
