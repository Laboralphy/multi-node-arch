<template>
    <div>
        <ChatMessages></ChatMessages>
        <label>Message:
            <input v-model="message" @keypress.enter="postMessage"/>
        </label>
    </div>
</template>

<script>
    import ChatMessages from "./ChatMessages.vue";
    export default {
        name: "ChatBox",
        components: {ChatMessages},
        data: function() {
            return {
                message: ''
            }
        },
        methods: {
            postMessage: function() {
                const sMessage = this.message;
                this.message = '';
            }
        }
    }
</script>

<style scoped>

</style>