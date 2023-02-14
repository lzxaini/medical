
const app = {
  state: {
    menuOpen: false,
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.menuOpen = !state.menuOpen
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
