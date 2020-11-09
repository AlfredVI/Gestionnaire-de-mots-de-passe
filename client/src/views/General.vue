<template>
    <div>
        <h1>Bonjour {{ first_name }} {{ last_name }}</h1>
        <Group v-for="group in groups" :key="group" :object="group"></Group>
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
    }
}
</script>