<template>


    <div>
        <form @submit.prevent="creation">
            <label> Group name : </label><input type="text" v-model="group_name"><br><br>
            <label>Group description : </label><input type="text" v-model="group_description"><br><br>
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
    name: 'GroupForm',
    data: function(){
        return{
            group_name: "",
            group_description: "",
            

        }
        

    },

    methods: {


        creation: function() {
            if (this.group_name.length != 0){
            axios.post('http://localhost:8673/group/' + this.group_name + this.group_description + this.$cookies.get('id'))
            

            
             .catch(err => {
                console.err(err.toString())
             })

            }
        }

    
    }

}
</script>