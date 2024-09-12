<template>
  <div class="flex">
    <ChatDisplay v-for="id of users" :key="id" :messages="msgs"
                 v-model="userMessages[id]"
                 :sender_id_prop="id"
                 @submit="sendMessage(id)"
                 :titleN="id"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import ChatDisplay from "./components/ChatDisplay.vue";
import type {Message, PrivateMessage} from './types'

const sockets: { [key: number]: WebSocket } = {
  39: new WebSocket('ws://5.182.26.58:4321/ws/web?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozOSwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzI2MDMzMzEyLCJleHAiOjE3NTQ4MzMzMTIsImp0aSI6IjlmNmQ5ZDBmYTEwZTRlYzliMmEwYTNkNDIwNWRkYzlkIiwidG9rZW5fdHlwZSI6ImFjY2VzcyJ9.B5OKfmc7JxLyUCeHXIXH2WF2rafgxES1jB4XCX_zgmA'),
  40: new WebSocket('ws://5.182.26.58:4321/ws/web?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MCwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzI2MDMzMzQyLCJleHAiOjE3NTQ4MzMzNDIsImp0aSI6IjJmNDI0YzVjOWY3YzQyMDhiMTgxZDFiOTRhNjIyMTQ1IiwidG9rZW5fdHlwZSI6ImFjY2VzcyJ9.mw_I2PBmceVt6qZSfsHC85QKN1v5nzoczG4TJ7yyvao')
}

const users = [39, 40]
const rooms = ref([])
const msgs = ref<PrivateMessage[]>([])

const userMessages = reactive<{ [key: number]: string }>({
  39: '',
  40: ''
})


sockets[39].onopen = () => {
  sockets[39].send(JSON.stringify({
    action: 'get_private_chat_message',
    payload: null,
    query: {
      chat_room_id: 8,
      page_size: 15,
    }
  }))
}


sockets[39].onmessage = ({data}) => {
  const msg = JSON.parse(data)
  if (msg.action === 'get_private_chat_list') {
    rooms.value = msg;
  }

  if (msg.action === 'get_private_chat_message') {
    msgs.value = msg.results.reverse()
  }

  if (msg.action === 'send_message_to_chat') {
    msgs.value.push(msg.data)
  }
}

function sendMessage(id: number) {
  sockets[id].send(JSON.stringify({
    action: 'send_message_to_chat',
    payload: {
      chat_room_id: 8,
      message: userMessages[id],
      reply_message: null
    },
    query: null
  } as Message))

  userMessages[id] = ''
}
</script>
