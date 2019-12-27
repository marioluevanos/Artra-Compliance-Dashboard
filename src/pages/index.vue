<template>
    <section :class='$route.name'>
        <h3>Your Customized Stats:</h3>
    </section>
</template>

<script>
export default {
    name: 'Index',
    middleware: 'route-auth',
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

</style>
