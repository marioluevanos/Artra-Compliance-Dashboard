<template>
    <div class='input drop-down' 
        :class='{ 
            active: isActive, 
            "has-selected": hasSelected
        }'>
        <button 
            aria-haspopup='listbox' 
            aria-labelledby='dd-list dd-list-button' 
            :aria-expanded='isActive'
            type='button' 
            @click='isActive = !isActive' 
            class='dropdown-toggle input-element input-state'>
            {{ !selectedOption.name ? placeholderText : selectedOption.name }}
            <span class='caret'/>
        </button>
        <ul 
            class='dropdown-menu' 
            v-show='isActive' 
            tabindex='-1' 
            role='listbox' 
            aria-labelledby='dd-list-button'
            ref='dropDownMenu'
            :aria-activedescendant='slugify(selectedOption.name)'>
            <li 
                v-for='(option, idx) in options' 
                :key='idx'
                class='dropdown-item font-medium' 
                tabindex='0'
                @keydown='onListItemKeyDown'
                @click='updateOption(option)' 
                role='option'>
                {{ option.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'drop-down',
    data() {
        return {
            selectedOption: { name: '' },
            isActive: false,
            placeholderText: 'Select Item',
            hasSelected: false,
            currentFocusedItem: null,
            keyDown: 40,
            keyUp: 38
        }
    },
    props: {
        options: {
            type: [Array, Object]
        },
        selected: {},
        placeholder: String,
        closeOnOutsideClick: {
            type: Boolean,
            default: true,
        },
    },
    watch: {
        selectedOption(val) {
            if (val.name !== this.placeholder) {
                this.hasSelected = true
            }
        },
        isActive(val) {
            if (val) {
                document.addEventListener('keydown', this.onKeyDown)
                document.addEventListener('keyup', this.onKeyUp)

                this.$nextTick(() => this.setFirsItemFocus())
            }
            else {
                document.removeEventListener('keydown', this.onKeyDown)
                document.removeEventListener('keyup', this.onKeyUp)
            }
        }
    },
    mounted() {
        this.selectedOption = this.selected
        if (this.placeholder) {
            this.placeholderText = this.placeholder
        }

        if (this.closeOnOutsideClick) {
            document.addEventListener('click', this.clickHandler)
        }

        this.$emit('updateOption', this.selectedOption)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.clickHandler)
    },
    methods: {
        onKeyDown({keyCode}) {
            if (keyCode === this.keyDown) {
                const next = this.currentFocusedItem.nextElementSibling
                if (next) this.currentFocusedItem = next
                this.currentFocusedItem.focus()
            }
        },
        onKeyUp({keyCode}) {
            if (keyCode === this.keyUp) {
                const prev = this.currentFocusedItem.previousSibling
                if (prev) this.currentFocusedItem = prev
                this.currentFocusedItem.focus()
            }
        },
        setFirsItemFocus() {
            const {dropDownMenu} = this.$refs
            this.currentFocusedItem = dropDownMenu.firstElementChild
            this.currentFocusedItem.focus()
        },
        onListItemKeyDown(event) {
            if (event.keyCode === 13) event.target.click()
        },
        slugify(name = 'item') {
            return 'dd-list-' + name.toLowerCase().replace(/ /g, '-')
        },
        updateOption(option) {
            this.selectedOption = option
            this.isActive = false
            this.$emit('updateOption', this.selectedOption)
        },
        clickHandler(event) {
            const { target } = event
            const { $el } = this
            if (!$el.contains(target)) {
                this.isActive = false
            }
        }
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

div.input.drop-down {
    padding: 0;
    height: 100%;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    background: white;
}

.dropdown-toggle {
    height: inherit;
    text-transform: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: vw(10) vw(30) vw(10) vw(10);
    background: white;
    font-family: $font-medium;
    appearance: none;
    border: none;
    width: 100%;
    border-radius: 0;
    border: 1px solid transparent;
}

.drop-down.has-selected.active .dropdown-toggle {
    color: $color-navy-dark;
    background: white;
    background: rgba($color-primary-light, 0.25);
    border: 1px solid $color-primary;
    outline: none;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: vw(180);
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: left;
    background-color: white;
    border: 1px solid $color-gray-light;
    border-radius: 0 0 3px 3px;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
}

.dropdown-item {
    list-style: none;
    border: 1px solid transparent;
    padding: vw(10) vw(15);
    display: block;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    color: $color-navy-dark;
    outline: none;
}

.dropdown-item:hover,
.dropdown-item:focus {
    border: 1px solid $color-primary;
    background: $color-primary;
    color: white;
}

.dropdown-toggle .caret {
    width: 0;
    position: absolute;
    height: 0;
    margin-left: -24px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid currentColor;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    right: vw(10);
}

</style>
