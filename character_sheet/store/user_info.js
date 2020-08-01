import firebase from 'firebase'

export const state = () => ({
  login_user: null,
  is_loading: false,

  // 表示用キャラクターデータ
  display_character_data: null,
})

export const getters = {
  uid: (state) => state.login_user ?  state.login_user.uid : ''
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
  create_auth_changed({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        commit('setLoginUser', user)
      } else {
        commit('deleteLoginUser')
      }
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

  /**
   * クトゥルフ神話TRPG第6版(CoC6)
   * データ取得
   * @param param0 context
   * @param characterId キャラクターID
   */
  fetch_coc6_character({ getters, commit }, characterId){
    firebase.firestore().collection(`users/${getters.uid}/character`).doc(characterId).get()
    .then(snapshot => {
      const getData = snapshot.data()
      if(getData) {
        console.log(getData)
        commit('setDisplayCharacterData', getData)
      }
    })
  }
}

export const mutations = {
  setLoginUser(state, user) {
    const { uid, email, displayName } = user
    state.login_user = { uid, email, displayName }
  },
  deleteLoginUser(state) {
    state.login_user = null
  },
  setDisplayCharacterData(state, data) {
    state.display_character_data = data
  },
}
