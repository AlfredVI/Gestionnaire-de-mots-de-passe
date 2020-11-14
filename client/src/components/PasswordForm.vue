<template>
    <div>
        <p class="error" v-show="error">Error : The password has not been created !</p>
        <p class="success" v-show="success">Success : The password has been created !</p>
        <form @submit.prevent="add_password">
            <label>New Password : </label><input type="password" placeholder="Enter new password" v-model="password_text" required><br><br>
            <label>Confirm Password : </label><input type="password" placeholder="Confirm new password" v-model="password_confirmation" required><br><br>
            <label>Password application : </label><input type="text" placeholder="Enter password application" v-model="password_application" required><br><br>
            <label>Password description : </label><input type="text" placeholder="Enter password description" v-model="password_description" required><br><br>
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
    name: 'PasswordForm',
    props: ['group_id'],
    data: function() {
        return {
            password_text: "",
            password_confirmation: "",
            password_application: "",
            password_description: "",
            error: false,
            success: false,
        }
    },
    methods: {
        add_password: function(){
            axios.post('http://localhost:8673/password/'+ this.password_text + "/" + this.password_application + "/" + this.password_description + "/" + this.group_id)
            .then(rep => {
                if (rep.data.length == 0) {
                    this.error = false
                    this.success = true
                    this.password_text = ""
                    this.password_confirmation = ""
                    this.password_application = ""
                    this.password_description = ""
                }
            })
            .catch(err => {
                console.error(err.toString())
                this.error = true
                this.success = false
            })
        },
    }
}

</script>

<style>
.success {
    color : green;
}

.error {
    color : red;
}
</style>