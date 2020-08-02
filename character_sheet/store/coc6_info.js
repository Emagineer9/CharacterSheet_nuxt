import firebase from 'firebase'

export const state = () => ({
  login_user: null,
  is_loading: false,

  // 表示用キャラクターデータ
  display_character_data: {
    systemId: 'coc6',
    // 探索者情報
    personal_items: {
      full_name: '',
      job_name: '',
      degree: '', // 学位
      graduate: '', // 出身
      sexuality: '',
      age: 0
    },
    // 能力値
    ability_items: [
      {
        name: 'ability',
        str: 0, con: 0, pow: 0, dex: 0, app: 0, siz: 0, int: 0, edu: 0,
        hp:  0, mp:  0, san: 0, idea: 0, luck: 0, knowledge: 0,
      },
      {
        name: 'increase',
        str: 0, con: 0, pow: 0, dex: 0, app: 0, siz: 0, int: 0, edu: 0,
        hp:  0, mp:  0, san: 0, idea: 0, luck: 0, knowledge: 0,
      },
      {
        name: 'temporary_change',
        str: 0, con: 0, pow: 0, dex: 0, app: 0, siz: 0, int: 0, edu: 0,
        hp:  0, mp:  0, san: 0, idea: 0, luck: 0, knowledge: 0,
      },
    ],
    // 探索者の技能
    skill_items: [
      {
        skill_name: '回避',
        skill_initial_point: 30,
        job_point: 6,
        interest_point: 24,
        growth_point: 4.0,
        etc_point: 1,
      },
      {
        skill_name: 'キック',
        skill_initial_point: 30,
        job_point: 6.0,
        interest_point: 24,
        growth_point: 4.0,
        etc_point: 1,
      },
      {
        skill_name: '組み付き',
        skill_initial_point: 30,
        job_point: 6.0,
        interest_point: 24,
        growth_point: 4.0,
        etc_point: 1,
      },
      {
        skill_name: 'こぶし（パンチ）',
        skill_initial_point: 30,
        job_point: 6.0,
        interest_point: 24,
        growth_point: 4.0,
        etc_point: 1,
      },
      {
        skill_name: '頭突き',
        skill_initial_point: 30,
        job_point: 6.0,
        interest_point: 24,
        growth_point: 4.0,
        etc_point: 1,
      }
    ],
    // 武器
    weapon_items: [
      {
        id: 1,
        weapon_name: '',
        weapon_hit_rate: 0,
        weapon_damage: '',
        break_number: '',
        weapon_range: 'タッチ',
        number_of_attacks: 1,
        weapon_capacity: '',
        weapon_durability: '-'
      },
    ],
    // 所持品・財産
    belongings_items: [
      {
        id: 1,
        belongings_name: '',
        belongings_price: 0,
        belongings_number: 1,
        belongings_remark: ''
      },
      {
        id: 2,
        belongings_name: '',
        belongings_price: 0,
        belongings_number: 0,
        belongings_remark: ''
      },
      {
        id: 3,
        belongings_name: '',
        belongings_price: 0,
        belongings_number: 0,
        belongings_remark: '',
      },
    ],
    // アーティファクト／呪文
    artifacts_items: [
      {
        id: 1,
        artifacts_name: '',
        artifacts_number: 0,
        artifacts_remark: ''
      },
      {
        id: 2,
        artifacts_name: '',
        artifacts_number: 0,
        artifacts_remark: ''
      },
    ],
  },
})

export const getters = {
  characterData: (state) => state.display_character_data
}

export const mutations = {
  startRequest(state) {
    state.is_loading = true
  },
  failRequest(state) {
    state.is_loading = false
  },
  setDisplayCharacterData(state, data) {
    state.display_character_data = data
  },
}

export const actions = {
  /**
   * クトゥルフ神話TRPG第6版(CoC6)
   * データ取得
   * @param param0 context
   * @param params パラメータ（uid、characterId）
   */
  fetch_coc6_character({ commit }, params){
    commit('startRequest')

    firebase.firestore().collection(`users/${params.uid}/character`).doc(params.characterId).get()
    .then(snapshot => {
      const getData = snapshot.data()
      if(getData) {
        commit('setDisplayCharacterData', getData)
      }
    })
  },
}
