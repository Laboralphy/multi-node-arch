<template>
  <div class="home">
    <ChatBox></ChatBox>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatMessages from "../components/ChatMessages.vue";
import ChatBox from "../components/ChatBox";

export default {
  name: 'home',
  components: {
    ChatBox,
    ChatMessages
  }
}
</script>
