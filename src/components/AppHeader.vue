<template>
    <header class='app-header'>
        <router-link to='/'><AppLogo class='header-logo'/></router-link>
        <h2 class='header-title' v-html='headerTitle'/>
    </header>
</template>

<script>

import AppLogo from '@/components/AppLogo.vue'

export default {
    name: 'app-header',
    components: {
        AppLogo
    },
    computed: {
        headerTitle() {
            const { name, params } = this.$route

            // Get the name of the router and replace the hashes with spaces
            var title = !name ? 'index' : name.replace(/[-]/g, ' ')
            
            // Going to change this
            if (params.id) {
                title = title.replace(/id/g, '/ ' + params.id.replace(/[-]/g,' '))
            }
            
            // Return the name of the page
            return title === 'index' ? 'Dashboard' : title
        }
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: vw(90);
    background: white;
    display: flex;
    align-items: center;
    padding: 0 vw(40);
    box-shadow: 0 1px 1px rgba(black, 0.15);
    z-index: 20;
}

.header-logo {
    width: vw(120);
}

.header-title {
    text-transform: capitalize;
    color: rgba($color-navy-dark, 0.3);
    margin-left: vw(280 - (120 + 40));

}

</style>
