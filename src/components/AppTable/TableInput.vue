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
        <div class='table-user-input' :class='[inputType.toLowerCase()]' v-if='activeTableInput && inputType.toLowerCase() === "history"'>
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

        <!-- Data Input for Decision instances -->
        <div class='table-user-input' :class='[inputType.toLowerCase()]' v-if='activeTableInput && inputType.toLowerCase() === "decision"'>
            <div class='input text'>
                <input type='text' class='input-element' disabled :value='newEntry.date'/>
            </div>
            <div class='input text'>
                <input 
                    placeholder='Enter Name' 
                    :class='{ "has-text": textInput.length > 0 }' 
                    class='input-element input-state'
                    v-model='textInput' 
                    type='text'/>
            </div>
            <DropDown 
                :options='[
                    { name: "File Updated PSAR"},
                    { name: "Some Other Update"},
                    { name: "Third Option"     }
                ]' 
                :selected='{ name: "Select SAR Action" }' 
                @updateOption='event => $set(newEntry, "sarAction", event.name) '
                placeholder='Select SAR Action'
                :closeOnOutsideClick='true'/>
            <div class='input text'>
                <input type='text' class='input-element input-state' disabled value='TSAR Pending'/>
            </div>
        </div>

        <!-- Save or Cancel for all instances -->
        <div class='table-control' v-if='activeTableInput'>
            <button
                type='button' 
                class='button-primary' 
                :disabled='!isFormComplete'
                @click='saveEntryClick(inputType, $event)'>
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
        inputType: String,
        rowIndex: Number,
        detailsIndex: Number
    },
    data() {
        return {
            newEntry: {},
            textInput: '',
            activeTableInput: false,
            date: null
        }
    },
    watch: {
        textInput(val) {
            // Using the same text input, probably change later, not best practice, perhaps...
            // Comments or Name is set depeding on input type
            const prop = this.inputType === 'History' ? 'comments' : 'name'
            this.$set(this.newEntry, prop, val)
        },
        activeTableInput(val) {
            this.$nextTick(() => {
                
                // Set date for all new entry inputs
                if (val) {
                    this.setDate()
                }

                // Set SAR Status for Decision input types
                if (val && this.inputType === 'Decision') {
                    this.setSarStatus()
                }

                this.setFocus()
            })
        }
    },
    computed: {
        isFormComplete() {
            const {inputType} = this
            if (inputType === 'History') {
                const {action, comments} = this.newEntry
                const hasAction = action !== undefined 
                const hasComment = comments !== undefined && (comments && comments.length > 0)
                const isFormComplete = hasAction && hasComment

                return isFormComplete
            }
            if (inputType === 'Decision') {
                const {name, sarAction} = this.newEntry
                const hasName = name !== undefined && (name && name.length > 0)
                const hasSarAction = sarAction !== undefined
                const isFormComplete = hasName && hasSarAction
                return isFormComplete
            }
            return false
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
        setSarStatus() {
            
            // Hard-code the SAR Status... For now?
            this.$set(this.newEntry, 'sarStatus', 'TSAR Pending') 
        },
        saveEntryClick(inputType, event) {

            // indexes are used to append data at the correct location
            const {rowIndex, detailsIndex} = this
            
            const payload = {
                data: this.newEntry,
                rowIndex,
                detailsIndex,
                route: this.$route
            }

            if (inputType === 'History') {
                this.$store.commit('ADD_HISTORY', payload)
            }

            if (inputType === 'Decision') {
                this.$store.commit('ADD_DECISION', payload)
            }

            // emit to alert the UI there is a new Entry
            this.$emit('onSaveEntryClick', {rowIndex, detailsIndex}) 
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
}

.table-user-input {
    display: grid;
    grid-gap: 2px;
    margin: vw(15) 0;
    @include base-font(small);
}

.table-user-input.history {
    grid-template-columns: vw(120) vw(170) auto;
}

.table-user-input.decision {
    grid-template-columns: vw(180) vw(210) vw(280) auto;
}

.table-user-input input {
    padding: vw(10);
    width: 100%;
    height: 100%;
    font-family: $font-medium;
    outline: none;

    &[disabled] {
        color: $color-gray;
    }
    
    &.has-text {
        color: $color-primary;
    }
}

.input {
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
}

</style>
