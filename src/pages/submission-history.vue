<template>
    <section :class='$route.name'>
        
    </section>
</template>

<script>
import AppTable from '@/components/AppTable/index.vue'

export default {
    name: 'SubmissionHistory',
    middleware: 'route-auth',
    components: {
        AppTable
    },
    data() {
        return {
            
        }
    },
    computed: {
        // tableDataWithLinks() {
        //     return this.tableData.map((data, idx) => {
        //         const obj = {}
        //         for (let [key, value] of Object.entries(data)) {
        //             obj[key] = {
        //                 label: value,
        //                 link: { path: 'transactions', query: { amount: value } }
        //             }
        //         }
        //         return obj
        //     })
        // }
    }
}
</script>