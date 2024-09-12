<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">

      <span class="mx-auto">Chat App ID {{titleN}}</span>

    </div>

    <div class="flex-1 overflow-y-auto p-4">
      <div class="flex flex-col space-y-2">
        <div v-for="(item, i) of messages" :key="i" :class="item.sender_id === sender_id_prop && 'justify-end'"
             class="flex ">
          <div :class="item.sender_id === sender_id_prop ? 'bg-blue-200' : 'bg-gray-300'"
               class="text-black p-2 rounded-lg max-w-xs">
            {{ item.message }}
          </div>
        </div>

      </div>
    </div>

    <ChatForm :model-value="modelValue" @update:modelValue="handleUpdate" @submit="$emit('submit')"/>
  </div>
</template>

<script setup lang="ts">
import ChatForm from "./ChatForm.vue";
import type {PrivateMessage} from '../types'

defineProps<{
  sender_id_prop: number;
  messages: PrivateMessage[];
  modelValue: string;
  titleN: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

function handleUpdate(val: string) {
  emit("update:modelValue", val);
}
</script>

