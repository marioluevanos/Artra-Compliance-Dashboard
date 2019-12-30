<template>
    <div class='tool-tip'>
        <span 
            :class='{ active: isActiveTip }'
            class='message'
            v-if='isActiveTip'>
            {{message}}
        </span>
    </div>
</template>

<script>
export default {
    name: 'tool-tip',
    props: {
        message: {
            type: String,
            default: 'Tool Tip'
        }
    },
    data() {
        return {
            isActiveTip: false
        }
    },
    mounted() {
        const parent = this.$el.parentElement
        if (parent) {
            parent.addEventListener('mouseenter', this.onMouseEnter)
            parent.addEventListener('mouseleave', this.onMouseLeave)
        }
    },
    destroyed() {
        const parent = this.$el.parentElement
        if (parent) {
            parent.removeEventListener('mouseenter', this.onMouseEnter)
            parent.removeEventListener('mouseleave', this.onMouseLeave)
        }
    },
    methods: {
        onMouseEnter(event) {
            this.isActiveTip = true
        },
        onMouseLeave(event) {
            this.isActiveTip = false
        }
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.tool-tip {
    @include max-area;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    pointer-events: none;
    user-select: none;
    z-index: 1337;
}

.tool-tip .message {
    background: rgba(darken($color-navy-dark, 5%), 0.85);
    color: white;
    @include base-font(xsmall);
    letter-spacing: 0.01em;
    font-family: $font-medium;
    padding: vw(5) vw(10);
    text-transform: none;
    border-radius: 3px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    bottom: 100%;
    transform: translate3d(0, -25%, 0);
    &::before {
        content: '';
        border-width: 10px;
        border-style: solid;
        border-color: rgba(darken($color-navy-dark, 5%), 0.85) transparent transparent transparent;
        position: absolute;
        bottom: 0;
        transform: translateY(100%)
    }
}
</style>

