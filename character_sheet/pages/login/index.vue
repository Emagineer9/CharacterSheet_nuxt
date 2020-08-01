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
import { mapActions } from 'vuex'

export default {
  created() {
    this.create_auth_changed()
  },
  methods: {
    login(){
      this.$store.dispatch('user_info/google_login')
    },
    ...mapActions('user_info', [
      'logout',
      'create_auth_changed'
    ])
  }
}
</script>
