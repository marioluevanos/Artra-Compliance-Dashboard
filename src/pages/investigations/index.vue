<template>
    <section :class='$route.name'>
        <AppTable :tableHeaders='investigations.tableHeaders' :tableData='investigations.tableData'>
            
        </AppTable>
    </section>
</template>

<script>
import investigations from '@/assets/data/investigations.json'
import {mapGetters} from 'vuex'
import AppTable from '@/components/AppTable/index.vue'

export default {
    name: 'Investigations',
    middleware: 'route-auth',
    components: {
        AppTable
    },
    // data() {
    //     return {
    //         investigations
    //     }
    // }
    // async fetch({store, route}) {
    //     await store.dispatch('loadInvestigationsId', route.params.id)
    // },
    created() {
        this.$store.commit('PAGE_INVESTIGATIONS', investigations)
    },
    computed: {
        ...mapGetters({
            investigations: 'investigations'
        })
    }
    
}
</script>
