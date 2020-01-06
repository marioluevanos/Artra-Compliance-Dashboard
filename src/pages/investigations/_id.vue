<template>
    <section :class='$route.name'>
        <AppTable :tableHeaders='investigations.tableHeaders' :tableData='currentInvestigationData'/>
    </section>
</template>

<script>
import investigations from '@/assets/data/investigations.json'
import AppTable from '@/components/AppTable/AppTable.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'InvestigationsId',
    middleware: 'route-auth',
    components: {
        AppTable
    },
    created() {
        this.$store.commit('PAGE_INVESTIGATIONS', investigations)
    },
    computed: {
        ...mapGetters({
            investigations: 'investigations'
        }),
        currentInvestigationData() {
            const {id} = this.$route.params
            return investigations.tableData.filter(data => data.txId === id)
        }
    }
}
</script>
