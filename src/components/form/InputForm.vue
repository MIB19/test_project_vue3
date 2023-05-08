<script setup lang="ts">
import message from 'ant-design-vue/lib/message'
import 'ant-design-vue/lib/message/style/css';
import { computed, onBeforeMount, ref, watch } from 'vue';
const props = defineProps({
  type: { type: String, default: 'text' },
  label: { type: String, default: null },
  modelValue: { type: String, default: null },
})
const emit = defineEmits([
  'delete',
  'input',
  'change',
  'enter',
  'update:modelValue'
])

const inputValue = ref('')
const inputRef = ref()

const showDelete = computed(() => {
  if (inputValue.value !== '' && inputValue.value !== null) {
    return true
  }
  return false
})

watch(
  () => props.modelValue,
  () => {
    changeValue(props.modelValue)
  },
  { deep: true }
)

function deleteValue() {
  inputValue.value = ''
  emit('delete')
}
function changeValue(value: string) {
  inputValue.value = value
}
function onChange(value: string) {
  emit('input', inputValue.value)
  emit('change', value)
}
// function enterFunction(key) {
//   emit('enter')
// }
function focused() {
  inputRef.value.focus()
}
function blurFunction() {
  if (props.type === 'email' && inputValue.value !== '') {
    if (
      // eslint-disable-next-line no-useless-escape
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue.value)
    ) {
      //
    } else {
      message.error('Please enter a valid email address')
      focused()
    }
  }
}

onBeforeMount(() => {
  changeValue(props.modelValue)
})
</script>

<template>
  <div class="mt-6 w-full relative">
    <input
      ref="inputRef"
      v-model="inputValue"
      :type="props.type"
      class="peer block w-full px-2 py-1 transition duration-100 ease-in-out text-sm focus:outline-none disabled:opacity-50 border-gray-300 focus:ring-0 focus:border-gray-400 disabled:cursor-not-allowed text-black placeholder-transparent bg-white border-gray-300 focus:ring-0 focus:border-gray-400 placeholder-shown:border-gray-300 placeholder-transparent text-black bg-white border-t-0 border-l-0 border-r-0 border-b focus:ring-0"
      @change="onChange"
      @blur="blurFunction"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <label
      :for="'input' + props.label"
      class="absolute cursor-text top-1 -translate-y-5 left-0 text-gray-500 duration-300 transition-transform peer-focus:text-sm peer-focus:left-0 peer-focus:-translate-y-5 peer-focus:text-yellow-500 peer-placeholder-shown:text-base peer-placeholder-shown:left-2 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:text-gray-300"
      @click="focused"
    >
      {{ props.label }}
    </label>
    <font-awesome-icon
      v-if="showDelete"
      icon="fa-solid fa-times"
      class="absolute right-3 text-gray-400 top-1 cursor-pointer"
      @click="deleteValue"
    />
  </div>
</template>
