<template>
    <tbody class='table-body' :class='{ active: detailsActive }'>
        <tr class='table-body-row' :class='{ "has-details": entry.details }'>
            <TableData
                class='app-table-data' 
                v-for='(header, hIdx) in tableHeaders'
                :format='header.format'
                :key='Math.random() * hIdx'
                :cellData='{ entry, header }'/>
            <td v-if='entry.details' @click='toggleDetails' class='table-button'>
                <ToolTip :message='detailsActive ? "Close" : "View Details"'/>
                <AppIcon size='small' :type='detailsActive ? "close" : "show-list"'/>
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
                        <thead>
                            <tr>
                                <th class='font-bold color-gray' 
                                    v-for='(headers, headerIdx) in details.headers' 
                                    :key='setKey(headerIdx)' 
                                    v-html='headers.header'/>
                            </tr>
                        </thead>
                        <tbody v-for='(detail, idx) in details.data' :key='setKey(idx)'>
                            <tr>
                                <td v-for='(header, idx) in details.headers' :key='setKey(idx)'>
                                    <span v-html='detail[header.prop]'/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <TableInput
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

export default {
    name: 'table-body',
    components: {
        AppIcon,
        ToolTip,
        TableData,
        TableInput
    },
    props: {
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
            activeDetailsIndex: null
        }
    },
    methods: {
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
        onSaveEntryClick(indexes) {
            this.animateNewEntry(indexes)
        },
        toggleDetails(event) {
            this.detailsActive = !this.detailsActive
        },
        setKey(index, name = '') {
            return parseInt((Math.random() * 3) * 10e10) + name
        }
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
}

/* 
    Table Details
    ----------------------------
*/ 

.table-body-details th, 
.table-body-details td {
    padding: vw(5) vw(10);
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

.table-body-details table {
    width: 100%;
    text-align: left;
}

.table-body-details caption {
    text-align: left;
    margin: 0 0 vw(15) 0;
    @include base-font(h5);
}

.table-body-details thead th {
    padding-bottom: vw(10);
}

.table-body-details tbody:nth-of-type(odd) {
    background: rgba($color-gray, 0.05);
}

.table-body-details tbody.new-entry {
    animation: new-entry 1s cubic-bezier(0.39, 0.575, 0.565, 1); //ease-out-sine
}

@keyframes new-entry {
    0% {
        box-shadow: inset 0 0 0 0 $color-primary;
    }
    50% {
        color: $color-primary;
        box-shadow: inset 0 0 0 30px rgba($color-primary-light, 0.6);
    }
    100% {
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
    height: vw(46);
    padding: 0;
    position: absolute;
    background: none;
    right: 0;
    border: none;
    border-left: 1px solid $color-gray-light;
    border-right: 1px solid $color-gray-light;
    outline-color: $color-primary;
    pointer-events: all;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    * {
        pointer-events: none;
    }
    &::before {
        content: '';
        position: absolute;
        bottom: -2px; left: 0; right: 0;
        height: 2px;
        background: $color-gray-light;
        display: none;
    }
    &:hover {
        .app-icon {
            stroke: $color-primary;
        }
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
    &::before {
        display: block;
    }
}

</style>
