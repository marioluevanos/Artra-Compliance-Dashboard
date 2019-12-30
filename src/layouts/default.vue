<template>
    <div class='layout-default'>
        <AppHeader v-if='isLogin'/>
        <AppNavigation v-if='isLogin'/>
        <main class='page' :class='$route.name'>
            <nuxt/>
        </main>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppNavigation from '@/components/AppNavigation'

export default {
    name: 'layout-default',
    components: {
        AppHeader,
        AppNavigation
    },
    computed: {
        isLogin() {
            return this.$route.name !== 'login'
        }
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.page:not(.login) {
    padding: vw(105) vw(15) vw(15) vw(280);
}

</style>
