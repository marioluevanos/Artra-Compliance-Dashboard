<template>
    <section :class='$route.name'>
        <div></div>
        <div></div>
        <div></div>
    </section>
</template>

<script>
export default {
    name: 'Dashboard',
    middleware: 'route-auth',
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

section.index {
    min-height: calc(100vh - #{vw(105 + 15)});
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: vw(15);
    div {
        border-radius: 3px;
        padding: vw(20);
        background: $color-gray-light;
    }
    div:first-child {
        grid-column: 1/3;        
    }
}

</style>
