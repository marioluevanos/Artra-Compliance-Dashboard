<template>
    <div class='table-input'>

        <!-- Button for all instances -->
        <button
            type='button'
            class='button-primary button-text table-add-button'
            :disabled='activeTableInput'
            v-if='!activeTableInput'
            @click='activeTableInput = true'>
            <AppIcon type='add-details' size='small'/>
            Add {{inputType}}
        </button>

        <!-- Data Input for History instances -->
        <div class='table-user-input' 
            :class='tableUserInputClass'
            ref='tableUserInput'
            :style='{ "grid-template-columns": gridColumnWidths }'  
            v-if='activeTableInput'>
            <div class='input text'>
                <input type='text' class='input-element input-state' disabled :value='newEntry.date'/>
            </div>
            <DropDown 
                :options='[
                    { name: "Purchase Check"},
                    { name: "History Check" },
                    { name: "Pending Status"}
                ]' 
                :selected='{ name: "Select Action" }' 
                @updateOption='event => $set(newEntry, "action", event.name) '
                placeholder='Select Action'
                :closeOnOutsideClick='true'/>
            <div class='input text'>
                <input 
                    placeholder='Enter Comment' 
                     class='input-element input-state'
                    :class='{ "has-text": textInput.length > 0 }' 
                    v-model='textInput' 
                    type='text'/>
            </div>
        </div>      

        <!-- Save or Cancel for all instances -->
        <div class='table-control' v-if='activeTableInput'>
            <button
                type='button' 
                class='button-primary' 
                :disabled='!isFormComplete'
                @click='saveEntryClick(txId, $event)'>
                    <AppIcon type='save' size='small'/>Save {{inputType}}
            </button>
            <button 
                type='button' 
                class='button-secondary button-text font-small' 
                @click='onCancelClick'>
                    <AppIcon type='cancel' size='small'/>Cancel
            </button>
        </div>
    </div>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue'
import Datepicker from 'vuejs-datepicker'
import DropDown from '@/components/DropDown.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'table-input',
    components: {
        AppIcon,
        Datepicker,
        DropDown
    },
    props: {
        txId: String,
        inputType: String,
        rowIndex: Number,
        detailsIndex: Number
    },
    data() {
        return {
            newEntry: {},
            textInput: '',
            activeTableInput: false,
            date: null,
            gridColumnWidths: 'auto auto auto'
        }
    },
    watch: {
        textInput(val) {
            this.$set(this.newEntry, 'comments', val)
        },
        activeTableInput(val) {
            this.$nextTick(() => {
                if (val) {
                    this.setDate()
                    this.setFocus()
                    this.$emit('onActiveTableInput', { 
                        context: this // Sending "this" to the parent to update "gridColumnWidths" prop, maybe not best practice
                    })
                }
            })
        }
    },
    computed: {
        tableUserInputClass() {
            return [this.inputType.toLowerCase()]
        },
        isFormComplete() {
            const {action, comments} = this.newEntry
            const hasAction = action !== undefined 
            const hasComment = comments !== undefined && (comments && comments.length > 0)
            const isFormComplete = hasAction && hasComment
            return isFormComplete
        }
    },
    methods: {
        setCurrentDate(withTime) {
            const newDate = new Date().toLocaleTimeString('en-US', {
                timeZone: 'America/Los_Angeles',
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }).split(', ')

            const [date, time] = newDate

            return withTime ? `${date} ${time}` : date
        },
        setDate() {
            this.$set(this.newEntry, 'date', this.setCurrentDate()) 
        },
        saveEntryClick(txId, event) {

            // indexes are used to append data at the correct location
            const {detailsIndex} = this
            
            const payload = {
                data: this.newEntry,
                detailsIndex,
                txId,
                route: this.$route
            }

            this.$store.commit('ADD_HISTORY', payload)

            // emit to alert the UI there is a new Entry
            this.$emit('onSaveEntryClick', {txId, detailsIndex}) 
            this.clearFields()
        },
        clearFields() {
            this.activeTableInput = false
            this.textInput = ''
            this.newEntry = {}
        },
        onCancelClick() {
            this.clearFields()
        },
        setFocus() {
            const inputs = this.$el.querySelectorAll('.table-user-input .input-element')
            const focusEL = Array.from(inputs).find(el => !el.disabled)
            if (focusEL) focusEL.focus()
        }
    }
}
</script>

<style lang='scss' scoped>

@import '../../styles/vars';
@import '../../styles/mixins';

.table-input {
   position: relative;
   @include base-font(small);
}

.table-user-input {
    display: grid;
    padding: 0;
    grid-gap: 2px;
    margin: vw(15) 0;
}

.table-input .input {
    padding: 0;
    position: relative;
    background: white;
    display: flex; 
    align-items: center;
    color: $color-primary;
}
 
.table-add-button {
    margin-top: vw(15);
}

.table-control {
    display: flex;

    button:last-child {
        margin-left: vw(15);
    }
}

</style>
