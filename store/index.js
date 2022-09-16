const state = () => ({
  text: null,
  length: 0,
})

const mutations = {
  SET_TEXT_ARRAY(state, payload) {
    const textArray = payload.join('').split('')
    state.text = textArray
    state.length = textArray.length
  },
  CLEAR_TEXT_ARRAY(state) {
    state.text = null
  },
}

const getters = {
  getText: (state) => state.text,
  getLength: (state) => state.length,
}

const actions = {
  async getText({ commit }) {
    const response = await this.$axios.$get(
      'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
    )
    commit('SET_TEXT_ARRAY', response)
  },
  clearText({ commit }) {
    commit('CLEAR_TEXT_ARRAY')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
