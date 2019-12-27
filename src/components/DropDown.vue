<template>
    <div 
    class="drop-down" 
    :class='{ 
        active: showMenu, 
        "has-selected": hasSelected
    }'>
        <li @click="toggleMenu()" class="dropdown-toggle" v-if="selectedOption.name !== undefined">
            {{ selectedOption.name }}
            <span class="caret"></span>
        </li>
        <li @click="toggleMenu()" class="dropdown-toggle" v-if="selectedOption.name === undefined">
            {{placeholderText}}
            <span class="caret"></span>
        </li>
        <ul class="dropdown-menu" v-if="showMenu">
            <li v-for="(option, idx) in options" :key="idx" @click="updateOption(option)">
                <a>{{ option.name }}</a>
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
                showMenu: false,
                placeholderText: 'Select Item',
                hasSelected: false
            }
        },
        props: {
            options: {
                type: [Array, Object]
            },
            selected: {},
            placeholder: [String],
            closeOnOutsideClick: {
                type: [Boolean],
                default: true,
            },
        },
        watch: {
            selectedOption(val) {
                if (val.name !== this.placeholder) {
                    this.hasSelected = true
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
        },
        beforeDestroy() {
            document.removeEventListener('click', this.clickHandler)
        },
        methods: {
            updateOption(option) {
                this.selectedOption = option
                this.showMenu = false
                this.$emit('updateOption', this.selectedOption)
            },
            toggleMenu() {
              this.showMenu = !this.showMenu
            },
            clickHandler(event) {
                const { target } = event
                const { $el } = this
                if (!$el.contains(target)) {
                  this.showMenu = false
                }
            }
        }
    }
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.drop-down {
    height: 100%;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    background: white;
}

.drop-down a:hover {
    text-decoration: none;
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
    padding: 0 vw(30) 0 vw(10);
    background: white;
    font-family: $font-medium;
    color: $color-gray;
}

.dropdown-toggle:hover {
    background: rgba($color-green-light, 0.15);
    color: $color-green;
    cursor: pointer;
}

.drop-down.active .dropdown-toggle {
    background: rgba($color-green-light, 0.15);
    color: $color-navy-dark;
}

.drop-down.has-selected .dropdown-toggle {
    color: $color-navy-dark;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 160px;
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

.dropdown-menu > li > a {
    padding: vw(10) vw(15);
    display: block;
    clear: both;
    font-weight: normal;
    line-height: 1.6;
    white-space: nowrap;
    text-decoration: none;
}

.dropdown-menu > li > a:hover {
    background: rgba($color-green-light, 0.15);
}

.dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.caret {
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

li {
    list-style: none;
}
</style>
