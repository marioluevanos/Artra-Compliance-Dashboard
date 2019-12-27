<template>
    <section :class='$route.name'>7</section>
</template>

<script>
export default {
    name: 'admin',
    middleware: 'route-auth',
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

</style>
