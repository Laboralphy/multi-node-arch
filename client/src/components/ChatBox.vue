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
    import {createNamespacedHelpers, mapActions} from 'vuex';
    import * as NET_ACTIONS from '../store/net/action-types';

    const {netMapActions} = createNamespacedHelpers('net');


    export default {
        name: "ChatBox",
        components: {ChatMessages},
        data: function() {
            return {
                message: ''
            }
        },
        methods: {
            ...mapActions('net', {
                sendMessage: NET_ACTIONS.SEND_MESSAGE
            }),
            postMessage: function() {
                const sMessage = this.message;
                this.message = '';
                this.sendMessage({content: sMessage});
            }
        }
    }
</script>

<style scoped>

</style>