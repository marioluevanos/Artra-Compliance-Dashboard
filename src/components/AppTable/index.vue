<template>
    <div>
        <form class='app-table-filter'>
            <input placeholder='Filter results' v-model='searchQuery'/>
            <AppIcon type='search' size='small'/>
        </form>
        <table class='app-table'>
            <thead>
                <tr>
                    <th
                        class='app-table-header' 
                        v-for='(val, index) in tableHeaders' 
                        @click='sortBy(val.prop)' 
                        :class='{ active: sortKey == val.prop }' 
                        :key='index + "table-header"'>
                        <div class='table-header-text'>
                            <span class='label' v-html='val.header'/>
                            <AppIcon 
                                class='icon-sort' 
                                type='sort' 
                                size='small'
                                :class='sortOrders[val.prop] > 0 ? "asc" : "dsc"'/>
                        </div>
                    </th>
                </tr>
            </thead>
            <TableBody
                v-for='(entry, idx) in filteredData'
                :entry='entry' 
                :tableHeaders='tableHeaders'
                :key='idx + "table-body"'>
                <slot/>
            </TableBody>
        </table>
    </div>
</template>

<script>
import TableBody from '@/components/AppTable/TableBody.vue'
import AppIcon from '@/components/AppIcon.vue'

export default {
    name: 'app-table',
    components: {
        TableBody,
        AppIcon
    },
    props: {
        tableData: Array,
        tableHeaders: Array
    },
    data() {
        const sortOrders = {}
        this.tableHeaders.forEach(key => sortOrders[key.prop] = 1)
        
        return {
            sortKey: '',
            sortOrders,
            searchQuery: ''
        }
    },
    computed: {
        filteredData() {
            const sortKey = this.sortKey
            const searchQuery = this.searchQuery && this.searchQuery.toLowerCase()
            const order = this.sortOrders[sortKey] || 1
            let tableData = this.tableData
        
            if (searchQuery) {
                tableData = tableData.filter(row => {
                    return Object.keys(row).some(key => {
                        return String(row[key]).toLowerCase().indexOf(searchQuery) > -1
                    })
                })
            }

            if (sortKey) {
                tableData = tableData.slice().sort((a, b) => {
                    a = a[sortKey]
                    b = b[sortKey]
                    return (a === b ? 0 : a > b ? 1 : -1) * order
                })
            }

            return tableData
        }
    },
    methods: {
        sortBy(key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        }
    }
}
</script>

<style lang='scss'>

@import '../../styles/vars';
@import '../../styles/mixins';

.app-table {
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
}

.app-table-filter {
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    background: transparent;
    border-radius: 3px;
    position: relative;
    align-items: center;
    margin-bottom: vw(5);
    input {
        background: $color-gray-light;
        width: 100%;
        margin: 0;
        height: 100%;
        border: 1px solid transparent;
        border-radius: 3px;
        padding: vw(10) vw(15) vw(10) vw(48);
        outline: none;
        transition: all 0.15s ease-out;
    }

    .app-icon {
        position: absolute;
        left: vw(15);
        opacity: 0.3;
        z-index: 1;
    }

    input:focus {
        color: $color-navy-dark;
        background: white;
        background: rgba($color-green-light, 0.25);
        border: 1px solid $color-green;
    }

    input:focus + .app-icon {
        stroke: $color-green;
        opacity: 1;
    }

    input::placeholder  {
        color: rgba($color-navy-dark, 0.3);
        font-family: $font-medium;
    }

    input:focus::placeholder  {
        color: rgba($color-green, 1);
    }
}

/* 
    Table Header & Data
    ----------------------------
*/

.app-table .app-table-header, 
.app-table .app-table-data {
    padding: vw(12) vw(5);

    &:first-of-type {
        padding-left: vw(15);
    }
}

/* 
    Table Header
    ----------------------------
*/

.app-table .app-table-header {
    text-align: left;
    cursor: pointer;
    @include base-font(regular);
    background: white;
    position: sticky;
    top: vw(89);
    z-index: 2;
    box-shadow: 0 1px 1px rgba(black, 0.15);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:first-child {
        border-radius: 3px 0 0 0;
    }
    &:last-child {
        border-radius: 0 3px 0 0;
    }
}

.table-header-text {
    display: flex;
    align-items: center;
}

.table-header-text small {
    @include base-font(xsmall);
    color: $color-gray;
    display: block;
}

/* 
    Table Header Arrow
    ----------------------------
*/ 

.app-table .icon-sort {
    display: inline-block;
    opacity: 1;
    margin-left: vw(5);
    opacity: 0.3;
}

/* 
    Table Header Active State
    ----------------------------
*/ 

.app-table .app-table-header.active {
    color: $color-green;
}

.app-table .app-table-header.active .icon-sort {
    opacity: 1;
    
    &.asc .top,
    &.dsc .bottom {
        opacity: 0.3;
    }

    &.dsc .top,
    &.asc .bottom {
        fill: $color-green;
    }
}

</style>