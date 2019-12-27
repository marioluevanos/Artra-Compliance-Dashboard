<template>
    <section :class='$route.name'>
        <AppTable :tableHeaders='investigationsId.tableHeaders' :tableData='investigationsId.tableData'/>
    </section>
</template>

<script>
import investigationsId from '@/assets/data/investigation-id.json'
import AppTable from '@/components/AppTable/index.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'InvestigationsId',
    middleware: 'route-auth',
    components: {
        AppTable
    },
    // async fetch({store, route}) {
    //     await store.dispatch('loadInvestigationsId', route.params.id)
    // },
    created() {
        this.$store.commit('PAGE_INVESTIGATIONS_ID', investigationsId)
    },
    computed: {
        ...mapGetters({
            investigationsId: 'investigationsId'
        })
    }
}
</script>
