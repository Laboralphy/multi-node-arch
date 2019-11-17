<template>
    <div class="chat-messages">
        <Message
            v-for="m in getMessages"
            :key="m.key"
            :name="m.name"
            :type="message"
        >{{ m.content }}</Message>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex';
    import Message from "./Message.vue";

    const {mapGetters: chatMapGetters} = createNamespacedHelpers('chat');

    export default {
        name: "ChatMessages",
        components: {Message},

        computed: {
            ...chatMapGetters([
                'getMessages'
            ])
        }
    }
</script>

<style scoped>

</style>