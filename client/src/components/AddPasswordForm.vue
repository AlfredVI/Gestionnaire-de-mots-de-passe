<template>
    <div>
        <p v-show="visibility" >Bad Credentials</p>
        <form @submit.prevent="authenticate">
            <label>New Password : </label><input type="password" placeholder="Enter new password" v-model="password" required><br><br>
            <label>Confirm Password : </label><input type="password" placeholder="Confirm new password" v-model="password" required><br><br>
            <label>Password name : </label><input type="text" placeholder="Enter password name" v-model="" required><br><br>
            <label>Password application : </label><input type="text" placeholder="Enter password application" v-model="" required><br><br>
            <label>Password description : </label><input type="text" placeholder="Enter password description" v-model="" required><br><br>
            <button type="submit">Add password</button>
        </form>
    </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export default {
    name: 'AddPasswordForm',
    props: {group_id},
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
            password_name: "",
            password_application: "",
            password_description: "",
            groups: [],
            users: [],
            passwords: [],
        }
    },
    methods: {
        /*
        get_all_users: function() {
            axios.get('http://localhost:8673/user/')
                .then(rep => {
                    this.users = rep.data
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },

        get_specific_user: function() {
            axios.get('http://localhost:8673/user/' + this.$cookies.get('id'))
                .then(rep => {
                    this.users = rep.data
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },

        add_user: function() {
            axios.post('http://localhost:8673/user/' + this.user_name + "/" + this.first_name + "/" + this.last_name + "/" + this.user_password)
                .then(rep => {
                    console.log(rep.data)
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },

        modify_user: function() {
            axios.put('http://localhost:8673/user/' + this.$cookies.get('id') + "/" + this.user_name + "/" + this.first_name + "/" + this.last_name + "/" + this.user_password)
                .then(rep => {
                    console.log(rep.data)
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },

        delete_user: function() {
            axios.delete('http://localhost:8673/user/' + this.$cookies.get('id'))
                .then(rep => {
                    console.log(rep.data)
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },

        get_all_groups: function() {
            axios.get('http://localhost:8673/group/')
                .then(rep => {
                    this.groups = rep.data
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },
        /*
        get_specific_group: function(){
            axios.get('http://localhost:8673/group/' + this.group_id)
                .then(rep => {
                    this.groups = rep.data
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },

        get_all_groups_from_user: function() {
            axios.get('http://localhost:8673/group/user/' + this.$cookies.get('id'))
                .then(rep => {
                    this.groups = rep.data
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },
        /*
        add_group_for_user: function(){
            axios.post('http://localhost:8673/group/' + this.group_name + "/" + this.group_description + "/" + this.$cookies.get('id')
            .then(rep => {
                this.groups = rep.data
            })
            .catch(err => {
                console.err(err.toString())
            })
        },*/
        /*
        get_all_passwords: function() {
            axios.get('http://localhost:8673/password')
                .then(rep => {
                    this.passwords = rep.data
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },*/


        /*
        get_specific_password_from_id: function(){
            axios.get('http://localhost:8673/password')
                .then(rep => {
                    this.passwords = rep.data
                })
                .catch(err => {
                    console.err(err.toString())
                })
        },*/
        /*
        get_password_from_group: function(){
            axios.get('http://localhost:8673/password/group/'+group_id)
                .then(rep => {
                    this.passwords = rep.data
                })
                .catch(err => {
                    console.err(err.toString())
                })

        },*/

        add_password: function(){
            axios.post('http://localhost:8673/password/'+this.password_name+ "/" + this.password_application + "/" + this.password_description + "/" + this.group_id)
            .then(rep => {
                console.log('password added')
            })
            .catch(err => {
                    console.err(err.toString())
                })

        },




}
}

</script>