<template>
    <div>
        <h1>Chat App</h1>

        <div v-for="message in messages" :key="message">
            {{ message }}
        </div>

        <form @submit.prevent="sendMessage">
            <input type="text" v-model="inputMessage" />
            <button type="submit">Send</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

const messages = ref([]);
const inputMessage = ref('');

const socket = io('http://localhost:3223');

onMounted(() => {

    // Listen message from server
    socket.on('message', (message: string) => {
        messages.value.push(message);
    })

});
const sendMessage = () => {
    // Sent message to server
    socket.emit("sendMessage", inputMessage.value);

    return inputMessage.value = '';

}

</script>