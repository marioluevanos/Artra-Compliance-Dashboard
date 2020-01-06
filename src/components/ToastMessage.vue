<template>
    <div class='toast-message'>
        <div class='toast font-small font-bold' 
            v-for='(message) in toastMessages'
            :key='message.id'
            :data-id='message.id'
            :data-text='message.text'
            :class='{ deleted: isDeleted(message.text)}'
            @click='dismissMessage'>
            <AppIcon :type='isDeleted(message.text) ?  "delete" : "success"'/>
            {{message.text}}
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AppIcon from '@/components/AppIcon.vue'
import {randomId} from '@/mixins/utils'

export default {
    name: 'toast-message',
    components: {
        AppIcon
    },
    data() {
        return {
            delayToDismiss: 4 // Seconds
        }
    },
    computed: {
        ...mapGetters({
            toastMessages: 'toastMessages'
        })
    },
    watch: {
        toastMessages(val) {
            if (val) {
                this.timeoutMessage()
            }
        }   
    },
    methods: {
        isDeleted(message) {
            return /deleted/g.test(message)
        },
        dismissMessage({target}) {
            const {text, id} = target.dataset
            target.addEventListener('transitionend', () => this.$store.commit('DELETE_MESSAGE', { text, id }))
            target.classList.add('dismiss')
        },
        timeoutMessage() {
            setTimeout(() => {
                Array.from(this.$el.children).find(message => message.click())
            }, this.delayToDismiss * 1000)
        }
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.toast-message {
    width: vw(300);
    position: fixed;
    top: 0;
    right: vw(30);
    pointer-events: none;
    z-index: 9001;

    .toast {
        color: $color-off-white;
        background: $color-navy-dark;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        padding: vw(15) vw(15);
        overflow: hidden;
        pointer-events: all;
        transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
        margin-bottom: 1px;
    }

    .toast:last-child {
        border-radius: 0 0 5px 5px;
    }

    .app-icon {
        pointer-events: none;
        stroke-width: 1.5;
        stroke: $color-primary-light;
    }

    .deleted .app-icon {
        stroke: lighten($color-secondary, 15%);
    }

    .dismiss.toast {
        transition: 
            transform 0.4s cubic-bezier(0.47, 0, 0.745, 0.715),
            opacity 0.3s cubic-bezier(0.47, 0, 0.745, 0.715);
        transform: translate3d(0, -150%, 0);
        opacity: 0;
    }
}

</style>
