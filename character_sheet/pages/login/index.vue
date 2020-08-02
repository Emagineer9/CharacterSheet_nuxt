<template>
  <div>
    <v-btn class="ma-1" small icon color="indigo" @click.stop="login()">
      ログイン
    </v-btn><br>
    <v-btn class="ma-1" small icon color="indigo" @click.stop="logout()">
      ログアウト
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  created() {
    this.set_auth()
  },
  methods: {
    login() {
      try{
        this.$store.dispatch('user_info/google_login')
      }catch(e){
        console.log(e)
      }
    },
    ...mapActions('user_info', [
      'logout',
      'set_auth',
    ])
  }
}
</script>
