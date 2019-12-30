<template>
    <nav class='app-navigation'>
        <router-link class='navigation-link' v-for='link in pageLinks' :key='link.id' :to='link.href' tabindex='0'>
            <div class='navigation-icon'>
                <span class='icon-count' v-if='link.icon === "alerts"'>2</span>
                <AppIcon :type='link.icon'/>
            </div>
            <span class='navigation-text font-bold' v-html='link.text'/>
        </router-link>
        <a class='navigation-link' @click='signOff'>
            <AppIcon type='sign-off'/><span class='navigation-text font-bold'>Sign Off</span>
        </a>
    </nav>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue'

export default {
    name: 'app-navigation',
    components: {
        AppIcon
    },
    data() {
        return {
            sections: [
                'Summary',
                'To Do',
                'Alerts',
                'Investigations',
                'Submission History',
                'Transactions',
                'Admin',
                'Help'
            ]
        }
    },
    watch: {
        '$route'() {
            this.recordRoute()
        }
    },
    computed: {
        pageLinks() {
            return this.sections.map((section, idx) => {
                const slug = section.toLowerCase().replace(/ /g, '-')
                return {
                    id: idx + '-link',
                    text: section,
                    icon: slug,
                    href: `/${slug}`
                }
            })
        }
    },
    methods: {
        signOff() {
            this.$store.commit('SET_USER', null)
            window.sessionStorage.clear()
            alert('Signed Out')
            this.$router.push('login')
        },
        recordRoute() {
            const {$route} = this
            // Return if the login route, don't need to record that as history
            if (/login/.test($route.name)) return
            const route = { name: $route.name }
            const data = JSON.stringify(route)
            window.sessionStorage.setItem('arta-admin', data)
        }
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.app-navigation {
    position: fixed;
    top: vw(105);
    bottom: 0;
    left: 0;
    width: vw(280);
    display: flex;
    flex-direction: column;
}

.navigation-link {
    display: flex;
    align-items: center;
    height: vw(56);
    padding: 0 vw(40);
    position: relative;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: vw(20);
        background: rgba($color-primary, 0.3);
        transform: scale(0, 1);
        transform-origin: 0 50%;
        transition: all 0.3s ease-in;
        border-radius: 0 3px 3px 0;
    }
}

.navigation-link:hover {
    color: $color-primary;
    text-decoration: none;
    .app-icon {
        stroke: $color-primary;
    }    
}

.navigation-link:focus {
    .navigation-text {
        color: $color-primary;
    }
    .app-icon {
        stroke: $color-primary;
    }
}

.navigation-icon {
    position: relative;
}

.navigation-link .icon-count {
    background: darken(red, 10%);
    width: vw(14);
    height: vw(14);
    border-radius: 50px;
    position: absolute;
    color: white;
    @include base-font(xsmall);
    font-family: $font-bold;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    top: 0;
    right: 0;
}

.navigation-link .app-icon {
    margin-right: vw(5);
}

.navigation-text {
    white-space: nowrap;
}

// Active State

.navigation-link.nuxt-link-active {
    color: $color-primary;
    text-decoration: none;
    .app-icon {
        stroke: $color-primary;
    }
    &:before {
        transform: scale(1, 1);
        transition: all 0.3s ease-out;
    }
 }

 @include bp(tablet) {
     .navigation-text {
         display: none;
     }
 }

</style>
