<template>
    <section :class='$route.name'>
        <AppTable
            :tableRange='transactionData.range'
            :tableHeaders='tableHeaders'
            :tableData='tableData'
        />
    </section>
</template>

<script>
import transactionData from '@/assets/data/transactions.json'
import AppTable from '@/components/AppTable/AppTable.vue'
import {formatDate} from '@/mixins/utils'

export default {
    name: 'TransactionId',
    middleware: 'route-auth',
    components: {
        AppTable
    },
    data() {
        return {
            transactionData,
            tableHeaders: [
                {
                    "header": "Date",
                    "prop": "date"
                },
                {
                    "header": "TX ID",
                    "prop": "txId",
                    "linkTo": "linkTo"
                },
                {
                    "header": "Amount",
                    "prop": "amount",
                    "format": "usd"
                },
                {
                    "header": "PSAR Status",
                    "prop": "psarStatus"
                }
            ]
        }
    },
    computed: {
        tableData() {
            const {
                txcount, 
                date, 
                txvalue
            } = this.$route.query
            if (!date || !txcount) return 
            const {id} = this.$route.params
            const currentMerchant = this.merchantData(id)
            const data = Array.from({ length: txcount - currentMerchant.length },  (val, idx) => {
                const numberDate = `${this.formatToSlashDate(date)} 2:${idx * 5}:10 PM`
                const formattedDate = formatDate(numberDate)
                const [txDate, time] = formattedDate
                const txId = this.randomTxId()
                const amount = `${(txvalue - currentMerchant[0].amount)/(txcount - currentMerchant.length)}`
                // const linkTo = `/investigations/${txId}?amount=${amount}&psarstatus=resolved&merchant=${id}`
                return {
                    date: `${txDate} ${time}`,
                    txId,
                    amount,
                    psarStatus: 'Resolved',
                    // linkTo
                }
            })
            data.unshift(...currentMerchant)
            return data
        }
    },
    methods: {
        merchantData(id) {
            switch (id) {
                case 'the-spot':
                    return [{
                        amount: 134.22,
                        date: '12/6/2019 8:00 AM',
                        txId: '8392',
                        psarStatus: 'Open',
                        linkTo: '/investigations/8392?amount=134.22&psarstatus=open&merchant=the-spot'
                    }]
                case 'mission-dispensary':
                    return [{
                        amount: 102.18,
                        date: '12/5/2019 8:10 AM',
                        txId: '6135',
                        psarStatus: 'Open',
                        linkTo: '/investigations/6135?amount=102.18&psarstatus=open&merchant=mission-dispensary'
                    }]
                case 'oak-delivery':
                    return [{
                        amount: 102.92,
                        date: '12/6/2019 9:00 AM',
                        txId: '218D',
                        psarStatus: 'Open',
                        linkTo: '/investigations/218D?amount=102.92&psarstatus=open&merchant=oak-delivery'
                    }]
                case 'the-mj-lounge':
                    return [{
                        amount: 230.90,
                        date: '12/6/2019 9:00 AM',
                        txId: '049A',
                        psarStatus: 'Open',
                        linkTo: '/investigations/049A?amount=230.90&psarstatus=open&merchant=the-mj-lounge'
                    },
                    {
                        amount: 114.10,
                        date: '12/5/2019 9:00 AM',
                        txId: '9894',
                        psarStatus: 'Open',
                        linkTo: '/investigations/9894?amount=114.10&psarstatus=open&merchant=the-mj-lounge'
                    }]
                case 'harvest-room':
                    return [{
                        amount: 210.25,
                        date: '12/6/2019 9:00 AM',
                        txId: 'F8E9',
                        psarStatus: 'Open',
                        linkTo: '/investigations/F8E9?amount=210.25&psarstatus=open&merchant=harvest-room'
                    },
                    {
                        amount: 114.10,
                        date: '12/6/2019 9:00 AM',
                        txId: 'CC90',
                        psarStatus: 'Open',
                        linkTo: '/investigations/CC90?amount=114.10&psarstatus=open&merchant=harvest-room'
                    }]
                case 'sc-remedies':
                    return [{
                        amount: 273.80,
                        date: '12/5/2019 9:00 AM',
                        txId: '21FD',
                        psarStatus: 'Open',
                        linkTo: '/investigations/21FD?amount=273.80&psarstatus=open&merchant=sc-remedies'
                    }]
                case 'cbd-online':
                    return [{
                        amount: 242.07,
                        date: '12/6/2019 9:00 AM',
                        txId: '7976',
                        psarStatus: 'Open',
                        linkTo: '/investigations/7976?amount=242.07&psarstatus=open&merchant=cbd-online'
                    }]
                case 'medican':
                    return [{
                        amount: 197.82,
                        date: '12/6/2019 9:00 AM',
                        txId: 'D07B',
                        psarStatus: 'Open',
                        linkTo: '/investigations/D07B?amount=197.82&psarstatus=open&merchant=medican'
                    }]
                case 'health-center-llc':
                    return [{
                        amount: 89.60,
                        date: '12/5/2019 9:00 AM',
                        txId: 'BFA5',
                        psarStatus: 'Open',
                        linkTo: '/investigations/BFA5?amount=89.60&psarstatus=open&merchant=health-center-llc'
                    }]
                case 'can-wagon':
                    return [{
                        amount: 407.45,
                        date: '12/03/2019 9:00 AM',
                        txId: 'F7B2',
                        psarStatus: 'Open',
                        linkTo: '/investigations/F7B2?amount=407.45&psarstatus=open&merchant=can-wagon'
                    }]
                case 'mj-health':
                    return [{
                        amount: 133.04,
                        date: '12/6/2019 9:00 AM',
                        txId: '7876',
                        psarStatus: 'Open',
                        linkTo: '/investigations/7876?amount=133.04&psarstatus=open&merchant=mj-health'
                    }]
                default:
                    return []
            }
        },
        randomTxId() {
            return Math.random().toString(36).substr(2, 4).toUpperCase()
        },
        formatToSlashDate(date = '') {
            const nums = date.split('')
            return nums.reduce((all, item, index) => {
                all += index % 2 && index < nums.length - 1 ? `${item}/` : item
                return all
            }, '')
        }
    }
}
</script>
