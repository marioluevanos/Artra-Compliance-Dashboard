<template>
    <section :class='$route.name'>
        <AppTable 
            :tableHeaders='transactionData.tableHeaders'
            :tableData='transactionData.tableData'/>
    </section>
</template>

<script>
import transactionData from '@/assets/data/transactions.json'
import AppTable from '@/components/AppTable/index.vue'

export default {
    name: 'Transactions',
    middleware: 'route-auth',
    components: {
        AppTable
    },
    data() {
        return {
            transactionData
        }
    }
}
</script>