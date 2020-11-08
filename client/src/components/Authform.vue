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
            axios.get('http://localhost:8673/user')
            .then(rep => {
                let found = false
                for(let i = 0; i < rep.data.length; i++) {
                    if (rep.data[i].user_name == this.login && rep.data[i].user_password == this.password) {
                        this.$router.push("/about")
                        found = true
                    }
                }
                this.visibility = !found
            })
            .catch(err => {
                console.err(err.toString())
            })
        }
    }
}
</script>