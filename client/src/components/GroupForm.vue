<template>
    <div>
        <p class="error" v-show="error">Error : The group has not been created !</p>
        <p class="success" v-show="success">Success : The group has been created !</p>
        <form @submit.prevent="creation">
            <label>Group name : </label><input type="text" v-model="group_name"><br><br>
            <label>Group description : </label><input type="textarea" v-model="group_description"><br><br>
            <input type="submit" value="Send">
        </form>
        <br>
        <button v-on:click="retour">Return</button>
    </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


export default {
    
    name: 'GroupForm',
    data: function(){
        return{
            group_name: "",
            group_description: "",
            error : false,
            success : false,
        }
    },

    methods: {
        creation: function() {
            if (this.group_name.length != 0){
                axios.post('http://localhost:8673/group/' + this.group_name + '/' + this.group_description + '/' +this.$cookies.get('id'))
                .then(rep => {
                    if (rep.data.length == 0) {
                        this.error = false
                        this.success = true
                        this.group_name = ""
                        this.group_description = ""
                    }
                    else {
                        console.log(rep.data)
                    }
                })
                .catch(err => {
                    console.err(err.toString())
                    this.error = true
                    this.success = false
                })
            }
        },
        retour : function() {
            this.$router.push('/general')
        }
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