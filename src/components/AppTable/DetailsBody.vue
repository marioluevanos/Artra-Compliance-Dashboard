<template>
    <tbody class='details-body' :class='{ "is-editing": isEditing }'>
        <tr>
            <td v-for='(header, hIdx) in headers' :key='hIdx'>
                <div class='position-div'>
                    <span
                        class='detail-column-text' 
                        :class='{ "is-editing": isEditing }' 
                        v-html='detail[header.prop]'/>
                    <input
                        :data-col='hIdx' 
                        type='text' 
                        class='input-state'
                        :data-prop='header.prop' 
                        :value='detail[header.prop]' 
                        @input='onInput' 
                        v-if='isEditing && !inputPreferDD(header.prop) && !inputPreferDate(header.prop)'/>

                    <DropDown
                        v-if='isEditing && inputPreferDD(header.prop)' 
                        :options='ddOptions(header.prop, detail[header.prop])' 
                        :selected='{ name: detail[header.prop] }' 
                        @updateOption='event => $set(newValues, header.prop, event.name)'
                        placeholder='Select to Edit'
                        :closeOnOutsideClick='true'/>
                    
                    <DatePicker
                        ref='datePicker'
                        @opened='onDateOpened'
                        @selected='onDateSelected'
                        :value='detail[header.prop]'
                        :data-prop='header.prop'
                        format='MM/dd/yyyy'
                        v-if='isEditing && inputPreferDate(header.prop)'
                        :name='detail[header.prop]'/>
                </div>
            </td>
            <td class='edit-control' v-if='canEditDetails'>
                <div class='position-div'>
                    <div class='edit-dd' v-if='showingContextMenu && !isEditing'>
                        <button type='button' class='control edit button-text' @click='isEditing = !isEditing'>
                            <AppIcon size='small' type='edit'/>
                            Edit {{ title }}
                        </button>
                        <button 
                            type='button' 
                            v-if='title !== "Decision"'
                            class='control delete button-text' 
                            @click='onDeleteClick'>
                            <AppIcon size='small' type='delete'/>
                            Delete {{ title }}
                        </button>
                    </div>
                    <button type='button' class='control edit button-text' @click='onEditClick'>
                        <ToolTip :message='isEditing ? "Cancel" : "Options"'/>
                        <AppIcon size='small' :type='isEditing ? "cancel" : "options"'/>
                    </button>
                    <button type='button' class='control save button-text' @click='onSaveClick' v-if='isEditing'>
                        <ToolTip message='Save'/>
                        <AppIcon size='small' type='save'/>
                    </button>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script>
import DatePicker from 'vuejs-datepicker'
import AppIcon from '@/components/AppIcon.vue' 
import ToolTip from '@/components/ToolTip.vue'
import DropDown from '@/components/DropDown.vue'
import {formatDate} from '@/mixins/utils'

export default {
    name: 'DetailsBody',
    props: {
        headers: Array,
        detail: Object,
        title: String,
        txId: String,
        detailsIndex: Number,
        rowIndex: Number,
        dataIndex: Number,
        canEditDetails: {
            type: Boolean,
            default: true
        }
    },
    components: {
        DatePicker,
        DropDown,
        AppIcon,
        ToolTip
    },
    data () {
        return {
            isEditing: false,
            showingContextMenu: false,
            newValues: {}
        }
    },
    watch: {
        isEditing(val) {
            if (val) this.$nextTick(() => this.initializeInputs())
        }
    },
    methods: {
        initializeInputs() {
            const inputs = this.setInputValues()
            this.focusOnInput(inputs)
        },
        onEditClick(event) {
            if (this.isEditing) this.isEditing = false
            this.showingContextMenu = !this.showingContextMenu
        },
        ddOptions(header, name) {
            switch (header) {
                case 'action':
                    return [
                        { name: 'Account Review'  },
                        { name: 'History Check'   },
                        { name: 'Action Required' }
                    ]        
                case 'name':
                    const options = [
                        { name: 'James Jones' },
                        { name: 'Judy Miller' },
                        { name: 'Alice Wonder'},
                        { name: 'Unassigned'  }
                    ]
                    // Remove the current name and place it at the top of the list
                    const filtered = options.filter(opt => opt.name !== name)
                    return [{name}, ...filtered]
                default:
                    return [
                        { name: 'No Value' }
                    ]
            }
        },
        inputPreferDD(headerName) {
            switch (headerName) {
                case 'action':
                    return true
                case 'name':
                    return true
                default:
                    return false
            }
        },
        inputPreferDate(headerName) {
            return headerName === 'date' ? true : false
        },
        focusOnInput(inputs) {
            if (!inputs) return 
            inputs
            .reverse()
            .find(input => input.focus())
        },
        onInput({target}) {
            this.newValues[target.dataset.prop] = target.value
        },
        onDateSelected(selectedDate) {
            const [date] = formatDate(selectedDate)
            this.newValues['date'] = date
        },
        onDateOpened() {
            this.setDateProp()
        },
        onSaveClick(event) {
            const payload = {
                txId: this.txId,
                data: this.newValues,
                rowIndex: this.rowIndex,
                detailsIndex: this.detailsIndex,
                dataIndex: this.dataIndex
            }
            this.$store.commit('SAVE_DETAILS', payload)

            this.isEditing = false
        },
        onDeleteClick(event) {
            if (window.confirm('Are you sure you want to delete?')) {
                this.$store.commit('DELETE_DETAILS', {
                    txId: this.txId,
                    detailsIndex: this.detailsIndex,
                    dataIndex: this.dataIndex
                })
                this.isEditing = false
            }
        },
        getInputs() {
            return Array.from(this.$el.querySelectorAll('input'))
        },
        setDateProp() {
            const [currentDate] = formatDate(new Date())
            const [DatePicker] = this.$refs.datePicker
            const dateInput = DatePicker.$el.querySelector('input')

            // Assig the current date if the field has no value
            dateInput.value = !dateInput.value ? currentDate : dateInput.value

            return this.getInputs().map(input => {
                if (!input.dataset.prop) {
                    input.setAttribute('data-prop', 'date')
                }
                return input
            })
        },
        setInputValues() {
            const inputs = this.setDateProp()
            return inputs.map(input => {
                const { prop } = input.dataset
                const value = input.value
                if (prop) {
                    this.newValues[prop] = value
                }
                return input
            })
        },
        closeContextMenu(event) {
            const { target } = event
            const { $el } = this
            if (!$el.contains(target)) {
                this.showingContextMenu = false
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.closeContextMenu)
    },
    destroyed() {
        document.removeEventListener('click', this.closeContextMenu)
    }
}
</script>

<style lang='scss'>

@import '../../styles/vars';
@import '../../styles/mixins';

.details-body {
    position: relative;
    @include base-font(small);
}

.details-body td {
    padding: 0 1px;
    border: none;
    line-height: 1.75;
}

.details-body thead th {
    padding-bottom: vw(10);
}

.details-body:nth-of-type(odd) .position-div {
    background: rgba($color-gray, 0.05);
}

.details-body .position-div {
    position: relative;
}

// Expand the drop down into max-area
.details-body .position-div div.input.drop-down {
    @include max-area;
}

.details-body .dropdown-toggle {
    padding: 0 vw(10);
}

// Expand the comments 100%
.details-body td:nth-last-child(2) .position-div {
    width: 100%;
}

.details-body span.detail-column-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    z-index: 1;
    padding: vw(5) vw(11);
    min-height: vw(36);
    min-width: vw(90);
}

.details-body input {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
}

.details-body .edit-control button.control.save {
    position: absolute;
    right: 0;
    transform: translateX(100%);
    padding: 0;
}

/* 
    Edit Control Buttons
    ---------------------------------------
*/

.details-body .edit-control {
    padding: 0;
    min-width: 30px;
    opacity: 0;
    .position-div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .control {
        position: relative;
        padding: vw(9);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: none;
    }

    .control.edit {
        padding: 0;
    }


    .edit-dd {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        background: white;
        min-width: vw(180);
        z-index: 3;
        box-shadow: 0 1px 3px rgba(black, 0.15);
        border-radius: 3px;
    }

    .edit-dd .control {
        padding: vw(12);
        width: 100%;
        justify-content: flex-start;
    }

    .edit-dd .control:hover {
        background: rgba($color-primary-light, 0.15);
    }
}

/* 
    Hover of the tBody Row
    ---------------------------------------
*/

.details-body:hover {
    .position-div {
        background: rgba(lighten($color-off-white, 100%), 0.5);
    }
    .edit-control {
        opacity: 1;
    }
}

.details-body .edit-control .position-div {
    background: none;
}



// Hide current text while Editing...
.details-body span.detail-column-text.is-editing {
    visibility: hidden;
    pointer-events: none;
    cursor: default;
}


// Show these other elements
.details-body.is-editing {
    background: transparent;

    .vdp-datepicker {
        @include max-area;
        width: 100%;
        z-index: 3;

        .vdp-datepicker__calendar {
            border-color: transparent;
            border-radius: 0 0 6px 6px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(black, 0.16);
        }
    }


    .vdp-datepicker__calendar .cell.selected {
        background: $color-primary-light;
    }

    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, 
    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, 
    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
        border-color: $color-primary;
    }

    .edit-control {
        opacity: 1;
    }
    .app-icon {
        margin: 0;       
    }
    .control .app-icon.cancel,
    .control .app-icon.delete {
        stroke: $color-secondary;
    }

    .control.save .app-icon {
        stroke: lighten($color-primary, 0%);
    }
    
    .control:hover .app-icon {
        stroke: $color-navy-dark;
    }
    
}



</style>