<template>
    <div>
        <h1>Bonjour {{ first_name }} {{ last_name }}</h1>
        <Group class="group" v-for="(mygroup, idx) in groups" :key="idx" :object="mygroup"></Group>
        <p>
            <button v-on:click="toCreateGroup"> Créer un groupe </button>
        </p>
    </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import Group from '../components/Group.vue'

export default {
    name : 'General',
    components : {
        Group
    },
    data : function() {
        return {
            first_name : "",
            last_name : "",
            groups : [],
        }
    },
    created : function () {
        if (this.$cookies.isKey('login') && this.$cookies.isKey('password') && this.$cookies.isKey('id')) {
            axios.get('http://localhost:8673/user/'+this.$cookies.get('id'))
            .then(rep => {
                if(rep.data.length != 0) {
                    this.first_name = rep.data[0]['user_first_name']
                    this.last_name = rep.data[0]['user_last_name']
                }
                else {
                    this.$router.push("/")
                }
            })
            axios.get('http://localhost:8673/group/user/' + this.$cookies.get('id'))
            .then(rep => {
                this.groups = rep.data
            })
            .catch(err => {
                console.err(err.toString())
            })
        }
        else {
            this.$router.push("/")
        }
    },

    methods: {
        toCreateGroup: function(){
             this.$router.push("/createGroup")
         },
         actualize: function() {
            console.log("toto")
            axios.get('http://localhost:8673/group/user/' + this.$cookies.get('id'))
            .then(rep => {
                this.groups = rep.data
            })
            .catch(err => {
                console.err(err.toString())
            })
         }
    }
    
}
</script>

<style>

.group {
    border : solid;
    width : 50%;
    margin : auto;
}

</style>