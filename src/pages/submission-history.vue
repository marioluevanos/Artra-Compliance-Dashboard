<template>
    <section :class='$route.name'>
    </section>
</template>

<script>
export default {
    name: 'SubmissionHistory',
    middleware: 'route-auth'
}
</script>