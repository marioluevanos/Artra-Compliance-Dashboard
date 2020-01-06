<template>
    <section :class='$route.name'>
        <AppTable 
            :tableHeaders='investigations.tableHeaders' 
            :tableData='investigations.tableData'/>
    </section>
</template>

<script>
import investigations from '@/assets/data/investigations.json'
import {mapGetters} from 'vuex'
import AppTable from '@/components/AppTable/AppTable.vue'

export default {
    name: 'Investigations',
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
        })
    }
}
</script>