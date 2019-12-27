<template>
    <td v-if='linkTo'>
        <router-link :to='linkTo'>
            <span 
                :class='{
                    "pending": (/Pending/g.test(innerText)),
                    "filed": (/Filed/g.test(innerText))
                }' 
                class='table-capsule' v-html='innerText'/>
        </router-link>
    </td>
    <td v-else>
        <span
            :class='{ "table-capsule font-medium": capsulate && cellData.entry.details }'
            v-html='innerText'/>
    </td>
</template>

<script>

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default {
    props: {
        format: String,
        cellData: Object
    },
    methods: {
        formatText() {
            const el = this.$el
            if (this.format === 'usd') {
                el.innerText = formatter.format(el.innerText)
                el.classList.add('font-medium')
            }
        }
    },
    computed: {
        linkTo() {
            const { entry, header } = this.cellData
            return entry[header.linkTo]
        },
        capsulate() {
            const { entry, header } = this.cellData
            return entry[header.capsulate]
        },
        innerText() {
            const { entry, header } = this.cellData
            const text = entry[header.prop]
            const label = entry[header.addLabel]
            const textAndLabel = `${text} ${label}`

            // If there is a label, return with text & label
            return label ? textAndLabel : text
        }
    },
    mounted() {
        this.formatText()
    }
}
</script>

<style lang='scss' scoped>

@import '../../styles/vars';
@import '../../styles/mixins';

td {
    position: relative;   
    @include base-font(normal);
    position: relative;
    border-top: 1px solid $color-gray-light;
    border-bottom: 1px solid $color-gray-light;
    margin-bottom: -1px;
}

.table-capsule {
    background: rgba($color-gray, .1);
    border-radius: 50px;
    padding: vw(2) vw(10);
    justify-self: flex-start;
    position: relative;
}

.pending,
.filed {
    font-family: $font-medium;
} 

.pending {
    background: rgba($color-secondary, 0.1);
    color: $color-secondary;
}

.filed {
    background: rgba($color-primary, 0.1);
    color: $color-primary;
}

</style>
