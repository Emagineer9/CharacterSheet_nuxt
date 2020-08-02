import firebase from 'firebase'

export const state = () => ({
  login_user: null,
  is_loading: false,

  // 表示用キャラクターデータ
  display_character_data: null,
})

export const getters = {
  uid: (state) => state.login_user ?  state.login_user.uid : '',
  isLoding: (state) => state.is_loading,
}

export const mutations = {
  startRequest(state) {
    state.is_loading = true
  },
  failRequest(state) {
    state.is_loading = false
  },
  setLoginUser(state, user) {
    const { uid, email, displayName } = user
    state.login_user = { uid, email, displayName }
    state.is_loading = false
  },
  deleteLoginUser(state) {
    state.login_user = null
  },
}

export const actions = {
  /**
   * ログイン（Googleアカウント）
   */
  google_login() {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider)
  },

  /**
   * ログアウト（共通）
   */
  logout() {
    firebase.auth().signOut()
  },

  /**
   * ユーザー情報をセットするイベント生成
   * @param {*} param0 context
   */
  set_auth({ commit }) {
    return new Promise((resolve, reject) => {
      commit('startRequest')
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          commit('setLoginUser', user)
        } else {
          commit('deleteLoginUser')
        }
        resolve()
      })
    })
  },

  /**
   * キャラクター保存
   * @param {*} param0 context
   * @param {*} data 保存データ
   */
  create_character({ getters }, data) {
    if(getters.uid){
      firebase.firestore().collection(`users/${getters.uid}/character`).add(data)
    }
  },
}
