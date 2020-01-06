import Vue from 'vue'
import { randomId } from '@/mixins/utils'

export const state = () => ({
    user: null,
    investigations: {},
    toastMessages: []
})

export const mutations = {
    SET_USER (state, user) {
        state.user = user
    },
    PAGE_INVESTIGATIONS (state, data) {
        state.investigations = data
    },
    ADD_MESSAGE (state, message) {
        state.toastMessages.push(message)
    },
    DELETE_MESSAGE (state, { id }) {
        state.toastMessages = state.toastMessages.filter(msg => msg.id !== id)
    },
    SAVE_DETAILS (state, payload) {
        const { data, detailsIndex, dataIndex, txId } = payload

        const row = state.investigations.tableData.find(row => row.txId === txId)
        const editedRow = row.details[detailsIndex]

        Vue.set(editedRow.data, dataIndex, data)

        // // Only update when Decision name is updated
        if(editedRow.title === 'Decision') {
            Vue.set(row, 'assigned', data.name)
        }

        state.toastMessages.push({
            text: `${ editedRow.title } saved.`,
            id: randomId('update')
        })
    },
    ADD_HISTORY (state, payload) {
        const { data, detailsIndex, txId } = payload
        const row = state.investigations.tableData.find(row => row.txId === txId)
        row.details[detailsIndex].data.unshift(data)
        state.toastMessages.push({
            text: `History added to ${ row.receiver }`,
            id: randomId('addition')
        })
    },
    DELETE_DETAILS (state, payload) {
        const { txId, detailsIndex, dataIndex } = payload
        const row = state.investigations.tableData.find(row => row.txId === txId)
        const detailsRow = row.details[detailsIndex]

        // Make an Array without the deleted Row
        const deletedData = detailsRow.data.filter((val, index) => index !== dataIndex)

        // Manually set the "data" prop
        Vue.set(detailsRow, 'data', deletedData)

        state.toastMessages.push({
            text: `${ detailsRow.title } deleted.`,
            id: randomId('delete')
        })
    },
    ADD_DECISION (state, payload) {
        const { data, rowIndex, detailsIndex } = payload
        const addDecision = state => state.tableData[rowIndex].details[detailsIndex].data.unshift(data)
        addDecision(state.investigations)
    }
}

export const getters = {
    user: state => state.user,
    investigations: state => state.investigations,
    toastMessages: state => state.toastMessages
}


export const actions = {

}
