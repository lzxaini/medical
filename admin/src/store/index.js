import { createStore } from 'vuex'
import app from './modules/app'

const Store= createStore({
    getters:{
        menuOpen: state => state.app.menuOpen,
    },
    modules: {
        app,
    },
})
export default Store;