<template>
    <div>
        <p v-show="visibility" >Bad Credentials</p>
        <form @submit.prevent="authenticate">
            <button type="submit">Delete password</button>
        </form>
    </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export default {
    name: 'DeletePassword',
    props: {password_id},
    data: function() {
        return {
            user_name: "",
            first_name: "",
            last_name: "",
            user_id: "",
            user_password: "",
            group_id: "",
            group_name: "",
            group_description: "",
            groups: [],
            users: [],
            passwords: [],
        }
    },
    methods: {
        delete_specific_password: function(){
            axios.delete('http://localhost:8673/password/'+this.password_id)
            .then( rep =>{
                console.log('password deleted')
            })
            .catch(err => {
                    console.err(err.toString())
                })
        },
    }
}
</script>