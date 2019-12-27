<template>
    <section :class='$route.name'>8</section>
</template>

<script>
export default {
    name: 'Help',
    middleware: 'route-auth',
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

</style>
