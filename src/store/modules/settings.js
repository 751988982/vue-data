import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import { getGameList } from '@/api/game'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  gameList: []
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_GAME: (state, gameList) => {
    state.gameList = gameList
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  async getUtils({ commit }) {
    const propsList = await getGameList()    
    commit('SET_GAME', propsList.data.list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

