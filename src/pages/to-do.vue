<template>
    <section :class='$route.name'>
        2
    </section>
</template>

<script>

import AppIcon from '@/components/AppIcon.vue'

export default {
    name: 'PageToDo',
    middleware: 'route-auth',
    components: {
        AppIcon
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';


</style>
