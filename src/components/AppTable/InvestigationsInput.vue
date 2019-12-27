<template>
    <div class='investigation-input'>

        <div slot='details-input' class='details-input' v-if='showInputs'>
            <Datepicker @selected='onSelectedDate' ref='picker' placeholder='Select Date'/>
            <DropDown 
                :options='selectOptions' 
                :selected='selectedItem' 
                @updateOption='onSelectedAction'
                placeholder='Select Action'
                :closeOnOutsideClick='true'/>
            <div class='input'>
                <input 
                    placeholder='Enter Comment' v-model='commentInput' 
                    type='text'/>
            </div>
        </div>
        
        <button
            slot='details-cta'
            type='button'  
            class='button-primary button-text details-add-button'
            :disabled='showInputs'
            v-if='!showInputs'
            @click='showInputs = true'>
            <AppIcon type='add-details' size='small'/>
            Add History
        </button>
        
        <div slot='details-control' class='details-control' v-if='showInputs'>
            <button
                type='button' 
                class='button-primary' 
                :disabled='!hasDateAction'
                @click='saveHistoryClick'>
                    <AppIcon type='save' size='small'/>Save History
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

export default {
    name: 'investigation-input',
    components: {
        AppIcon,
        Datepicker,
        DropDown
    },
    data() {
        return {
            newHistoryEntry: [],
            selectOptions: [
                { name: 'Purchase Check'},
                { name: 'History Check' },
                { name: 'Pending Status' }
            ],
            selectedItem: {
                name: 'Select Action',
            },
            commentInput: '',
            showInputs: false
        }
    },
    watch: {
        commentInput(val) {
            this.$set(this.newHistoryEntry, 2, val)
        },
        // showInputs(val) {
        //     this.$nextTick(() => {
        //         if (val) this.activatePicker()
        //     })
        // }
    },
    computed: {
        hasDateAction() {
            const [date, action] = this.newHistoryEntry
            const hasDate = date !== undefined
            const hasAction = action !== undefined
            return hasDate && hasAction
        }
    },
    methods: {
        onSelectedDate(event) {
            this.$set(this.newHistoryEntry, 0, this.formatDate(event))
        },
        onSelectedAction(event) {
            this.$set(this.newHistoryEntry, 1, event.name)
        },
        saveHistoryClick(event) {
            const index = parseInt(event.target.dataset.index)
            this.$store.commit('ADD_HISTORY', {
                data: this.newHistoryEntry,
                index,
                route: this.$route
            })
            this.clearFields()
        },
        clearFields() {
            this.showInputs = false
            this.commentInput = ''
            this.newHistoryEntry = []
        },
        formatDate(inputDate) {
            const date = (inputDate.toISOString()).replace(/T/, ' ').split(' ')[0].split('-')
            const day = parseInt(date[2])
            const leadingZeroDay = day <= 9 ? `0${day}` : day
            const month = date[1]
            const year = date[0]
            const formattedDate = `${ month}/${ leadingZeroDay }/${ year }`
            return formattedDate
        },
        activatePicker() {
            const [picker] = this.$refs.picker
            const input = picker.$el
                .firstElementChild // nested DIV in the date picker
                .firstElementChild // another
            input.click()
        },
        onCancelClick() {
            this.clearFields()
        }
    }
}
</script>

<style lang='scss'>

@import '../../styles/vars';
@import '../../styles/mixins';

.investigation-input {
    display: flex;
}

</style>
