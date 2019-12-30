<template>
    <main class='error'>
        <div class='message'>
            <h3>{{error.message}}</h3>
            <p>{{error.statusCode}}</p>
            <router-link to='/'>Go to the Dashboard.</router-link>
        </div>
    </main>
</template>

<script>
export default {
    name: 'layout-error',
    props: {
        error: Object
    }
}
</script>

<style lang='scss' scoped>

@import '../styles/vars';
@import '../styles/mixins';

main.error {
    position: relative;
    display: flex;
    padding: vw(240) vw(120);
    align-content: center;
    justify-content: space-evenly;
    flex-direction: column;
    text-align: center;
}

p {
    @include base-font(h1);
    margin: vw(15) 0;
    color: $color-secondary;
}
</style>