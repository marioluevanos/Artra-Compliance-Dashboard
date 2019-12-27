<template>
    <header class='page-header'>
        <a @click='goPrev'>Go Back</a><slot/>
    </header>
</template>

<script>
export default {
    name: 'page-header',
    methods: {
        goPrev() {
            this.$router.go(-1)
        }
    }
}
</script>


<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.page-header {
    position: relative;
    padding: vw(5) 0 vw(20);
    display: flex;
    justify-content: space-between;
}

</style>