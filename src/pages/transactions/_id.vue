<template>
    <section :class='$route.name'>
        <AppTable
            :tableHeaders='transactionData.tableHeaders'
            :tableData='transactionData.tableData'
        />
    </section>
</template>

<script>
import transactionData from '@/assets/data/transaction-id.json'
import AppTable from '@/components/AppTable/AppTable.vue'

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