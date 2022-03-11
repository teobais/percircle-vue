<template>
  <ssh-pre language="html" copy-button @copied="onCopy" dark reactive>
    <slot></slot>
    <template #copy-button>
      <span class="small text-white">{{ copyText }}</span>
    </template>
  </ssh-pre>
</template>

<script>
import SshPre from 'simple-syntax-highlighter'

export default {
  components: {
    SshPre,
  },

  data() {
    return {
      copyText: 'Copy',
      percent: 60,
      secs: 35,
      animate: false,
    }
  },

  methods: {
    onCopy() {
      this.copyText = 'Copied!'
      setTimeout(() => {
        this.copyText = 'Copy'
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped></style>
