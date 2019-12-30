<template>
    <section :class='$route.name'>
        <AppTable :tableHeaders='alertsData.tableHeaders' :tableData='alertsData.tableData'/>
    </section>
</template>

<script>
import alertsData from '@/assets/data/alerts.json'
import AppTable from '@/components/AppTable/AppTable.vue'

export default {
    name: 'Alerts',
    middleware: 'route-auth',
    components: {
        AppTable
    },
    data() {
        return {
            alertsData
        }
    }
}
</script>