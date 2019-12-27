<template>
    <section :class='$route.name'>
        <AppTable :tableHeaders='summaryData.tableHeaders' :tableData='summaryData.tableData'/>
    </section>
</template>

<script>
import summaryData from '@/assets/data/summary.json'
import AppTable from '@/components/AppTable/index.vue'

export default {
    name: 'Summary',
    middleware: 'route-auth',
    components: {
        AppTable
    },
    data() {
        return {
            summaryData
        }
    }
}
</script>