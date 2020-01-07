<template>
    <tbody class='table-body' :class='{ active: detailsActive }'>
        <tr class='table-body-row' :class='{ "has-details": entry.details }'>
            <TableData
                class='app-table-data' 
                v-for='(header, hIdx) in tableHeaders'
                :format='header.format'
                :key='Math.random() * hIdx'
                :cellData='{ entry, header }'/>
            <td v-if='entry.details' class='table-button' ref='tableButton'>
                <button type='button' @click='toggleDetails'>
                    <ToolTip :message='detailsActive ? "Close" : "View Details"'/>
                    <AppIcon size='small' :type='detailsActive ? "close" : "show-list"'/>    
                </button>
            </td>
        </tr>
        <tr class='table-body-details' v-if='entry.details && detailsActive' ref='tableBodyDetails'>
            <td :colspan='tableHeaders.length'>
                <div 
                    class='detail-entry' 
                    v-for='(details, detailsIndex) in entry.details' 
                    :key='setKey(detailsIndex, "details")'>
                    <table>
                        <caption class='details-title font-bold' v-html='details.title'/>
                        <thead class='detail-head'>
                            <tr class='detail-head-row'>
                                <th class='font-bold color-gray' 
                                    v-for='(headers, headerIdx) in details.headers' 
                                    :key='setKey(headerIdx)' 
                                    v-html='headers.header'/>
                            </tr>
                        </thead>
                        <DetailsBody 
                            v-for='(detail, idx) in details.data' 
                            :key='setKey(idx)' 
                            :txId='entry.txId'
                            :title='details.title'
                            :detail='detail'
                            :rowIndex='rowIndex'
                            :dataIndex='idx'
                            :canEditDetails='canEditDetails'
                            :detailsIndex='detailsIndex' 
                            :headers='details.headers'/>
                    </table>
                    <TableInput
                        :txId='entry.txId'
                        v-if='canAddDetails && details.title === "History"'
                        @onActiveTableInput='onActiveTableInput'
                        @onSaveEntryClick='onSaveEntryClick' 
                        :rowIndex='rowIndex'
                        :detailsIndex='detailsIndex'
                        :inputType='details.title'/>
                </div><!-- end -->
            </td>
        </tr>
    </tbody>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue'
import ToolTip from '@/components/ToolTip.vue'
import TableData from '@/components/AppTable/TableData.vue'
import TableInput from '@/components/AppTable/TableInput.vue'
import {debounce} from '@/mixins/utils'
import DetailsBody from '@/components/AppTable/DetailsBody.vue'

export default {
    name: 'table-body',
    components: {
        DetailsBody,
        AppIcon,
        ToolTip,
        TableData,
        TableInput
    },
    props: {
        canEditDetails: {
            type: Boolean,
            default: true
        },
        canAddDetails: {
            type: Boolean,
            default: true
        },
        tableHeaders: Array,
        entry: Object,
        onSortClick: Boolean,
        rowIndex: Number
    },
    watch: {
        onSortClick(val) {
            this.detailsActive = false
        }
    },
    data() {
        return {
            detailsActive: false,
            activeDetailsIndex: null,
            debouncedFn: null,
            gridColumnWidths: 'auto auto auto'
        }
    },
    methods: {
        onActiveTableInput({context}) {
            context.gridColumnWidths = this.setTableInputColumnWidths()
        },
        setTableInputColumnWidths() {
            const {tableBodyDetails} = this.$refs
            if (tableBodyDetails) {
                const tr = tableBodyDetails.querySelector('.detail-head-row')
                const {children} = tr
                if (!children) return []
                return Array.from(children).reduce((all, child, index) => {
                    // Last grid column is set to "auto"
                    all += index === children.length - 1 ? 'auto' : `${child.clientWidth}px `
                    return all
                }, '')
            }
        },
        setButtonHeight() {
            const {tableButton} = this.$refs
            if (!tableButton) return 
            const parent = tableButton.parentElement
            const height = !parent ? 'auto' : `${parent.clientHeight}px`
            tableButton.style.height = height
        },
        animateNewEntry({detailsIndex}) {
            const animationClass = 'new-entry'
            setTimeout(() => { // needs to be on next tick
                const {tableBodyDetails} = this.$refs
                const details = tableBodyDetails.querySelectorAll('.detail-entry')
                const newEntry = details[detailsIndex].querySelector('tbody') // gets the first node
                newEntry.addEventListener('animationend', () => newEntry.classList.remove(animationClass))
                newEntry.classList.add(animationClass)
            }, 250) 
        },
        onSaveEntryClick(payload) {
            this.animateNewEntry(payload)
        },
        toggleDetails(event) {
            this.detailsActive = !this.detailsActive
        },
        setKey(index, name = '') {
            return parseInt((Math.random() * 3) * 10e10) + name
        }
    },
    mounted() {
        this.debouncedFn = debounce(this.setButtonHeight, 250)
        window.addEventListener('resize', this.debouncedFn)
        this.setButtonHeight()

        if (this.$route.name === 'investigations-id') {
            this.$refs.tableButton.firstElementChild.click()
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.debouncedFn)
    }
}
</script>

<style lang='scss'>

@import '../../styles/vars';
@import '../../styles/mixins';

/* 
    Table Body
    ----------------------------
*/

.table-body {
    position: relative;
}

.table-body:nth-child(odd) {
    background: $color-gray-light;
}

.table-body:not(.active):hover {
    background: rgba($color-primary-light, 0.25);
    .table-button {
        opacity: 1;
    }
}

/* 
    Table Details
    ----------------------------
*/ 
.table-body-details {
    position: relative;
}

.table-body-details th {
    padding: vw(5) vw(10);
    position: relative;
}

.table-body .table-body-row.has-details td:nth-last-of-type(2) {
    padding-right: vw(46);
}

.table-body-details td[colspan] {
    padding: 0;
}

.table-body-details .detail-entry {
    position: relative;
    background: $color-gray-light;
    padding: vw(20) vw(46) vw(20) vw(40);
    border-bottom: 1px solid white;
    border-left: vw(10) solid darken($color-gray-light, 5%);
}

.table-body-details .detail-entry:last-child {
    padding-bottom: vw(40);
}

.table-body-details table {
    width: 100%;
    text-align: left;
}

.table-body-details caption {
    text-align: left;
    margin: 0 0 vw(15) 0;
    @include base-font(h5);
}

.details-body.new-entry {
    animation: new-entry 3s cubic-bezier(0.39, 0.575, 0.565, 1); //ease-out-sine
}

@keyframes new-entry {
    10% {
        color: $color-primary;
        box-shadow: inset 0 0 0 30px rgba($color-primary, 0.6);
    }
    50% {
        color: $color-navy-dark;
        box-shadow: inset 0 0 0 0 $color-primary-light;
    }
}

/* 
    Table Toggle Button
    ----------------------------
*/ 

.table-button {
    width: vw(46);
    height: vw(43);
    padding: 0;
    position: absolute;
    background: none;
    right: 0;
    border: none;
    border-left: 1px solid $color-gray-light;
    border-right: 1px solid $color-gray-light;
    outline-color: $color-primary;
    outline: none;
    cursor: pointer;
    z-index: 2;
    // opacity: 0;
    button {
        @include max-area;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 0;
        width: 100%;
        height: 100%;
        outline: none;
        border-radius: 0;
        * {
            margin: 0;
            pointer-events: none;
        }
    }
    
    &::before {
        content: '';
        position: absolute;
        bottom: -2px; left: 0; right: 0;
        height: 2px;
        background: $color-gray-light;
        display: none;
    }
    button:hover,
    button:focus  {
        .app-icon {
            stroke: $color-primary;
        }
    }

    button:focus {
        // border: 1px solid $color-primary;
    }
}

/* 
    Table Active Details
    ----------------------------
*/ 

.table-body.active .table-body-row {
    background: darken($color-gray-light, 5%);
}

.table-body.active .table-button {
    background: $color-gray-light;
    opacity: 1;
    &::before {
        display: block;
    }
}

</style>
