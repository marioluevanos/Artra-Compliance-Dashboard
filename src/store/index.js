export const state = () => ({
    user: null,
    investigationsId: {},
    investigations: {}
})

export const mutations = {
    SET_USER (state, user) {
        state.user = user
    },
    PAGE_INVESTIGATIONS_ID (state, data) {
        state.investigationsId = data
    },
    PAGE_INVESTIGATIONS (state, data) {
        state.investigations = data
    },
    ADD_HISTORY (state, payload) {
        const { route, data, rowIndex, detailsIndex } = payload
        const addHistory = state => state.tableData[rowIndex].details[detailsIndex].data.unshift(data)
        if(route.name === 'investigations') {
            addHistory(state.investigations)
        }
        else {
            addHistory(state.investigationsId)
        }
    },
    ADD_DECISION (state, payload) {
        const { route, data, rowIndex, detailsIndex } = payload
        const addDecision = state => state.tableData[rowIndex].details[detailsIndex].data.unshift(data)
        if(route.name === 'investigations') {
            addDecision(state.investigations)
        }
        else {
            addDecision(state.investigationsId)
        }
    }
}

export const getters = {
    user: state => state.user,
    investigationsId: state => state.investigationsId,
    investigations: state => state.investigations
}


export const actions = {
    loadInvestigationsId ({ commit }, id) {
        // const response = await this.$axios.get('/data/investigation-id.json')
        // commit('PAGE_INVESTIGATIONS_ID', investigationsId)
    },
    async loadInvestigations ({ commit }, id) {
        // const response = await this.$axios.get('/data/investigations.json')
        // commit('PAGE_INVESTIGATIONS', investigations)
    },
    async login ({ commit }, payload) {
        //     return await this.$axios.post('login', payload)
        //         .then(res => {
        //             if(res) {
        //                 commit('SET_USER', res.data)
        //             }
        //             else {
        //                 commit('SET_USER', null)
        //             }
        //         })
        //         .catch(err => console.log(err))
    }
}
