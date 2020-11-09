<template>
    <div>
        <p v-show="visibility" >Bad Credentials</p>
        <form @submit.prevent="authenticate">
            <label>Username : </label><input type="text" v-model="login"><br><br>
            <label>Password : </label><input type="password" v-model="password"><br><br>
            <input type="submit">
        </form>
    </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export default {
    name: 'Authform',
    props: {},
    data : function() {
        return {
            login : "",
            password : "",
            visibility : false,
        }
    },
    methods : {
        authenticate : function() {
            axios.get('http://localhost:8673/user/in/' + this.login + "/" + this.password)
            .then(rep => {
                if (rep.data.length != 0) {
                    this.visibility = false
                    this.$cookies.set('login', this.login)
                    this.$cookies.set('password', this.password)
                    this.$cookies.set('id', rep.data[0]["user_id"])
                    this.$router.push("/general")
                }
                else {
                    this.visibility = true
                }
            })
            .catch(err => {
                console.err(err.toString())
            })
        }
    },
    created : function () {
        if (this.$cookies.isKey('login') && this.$cookies.isKey('password') && this.$cookies.isKey('id')) {
             axios.get('http://localhost:8673/user/in/' + this.$cookies.get('login') + "/" + this.$cookies.get('password'))
            .then(rep => {
                if (rep.data.length != 0) {
                    this.$cookies.set('login', this.login)
                    this.$cookies.set('password', this.password)
                    this.$cookies.set('id', rep.data[0]["user_id"])
                    this.$router.push("/general")
                }
            })
            .catch(err => {
                console.err(err.toString())
            })
        }
    },
}
</script>