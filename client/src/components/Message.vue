<template>
    <div class="message">
        <span v-if="name !== ''" class="name">{{ name }}</span>
        <span v-if="name !== ''" class="separator">:</span>
        <span class="content"><slot></slot></span>
    </div>
</template>

<script>
    export default {
        name: "Message",
        props: {
            type: {
                type: String,
                required: false,
                default: 'message'
            },
            name: {
                type: String,
                required: false,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>