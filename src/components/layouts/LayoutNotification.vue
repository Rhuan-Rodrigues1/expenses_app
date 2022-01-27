<template>
  <div :class="`alert-${type}`" class="alert alert-dismissible fade show" v-if="show">
  {{ message }}
  <button type="button" class="btn-close" @click="close()"></button>
</div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      type: 'danger',
      message: ''
    }
  },

  created () {
    this.$root.$on('Notification::show', payload => {
      this.show = true
      this.type = payload.type
      this.message = payload.message

      setTimeout(() => { this.close() }, payload.timeout || 4000)
    })
  },
  methods: {
    close () {
      this.type = 'danger'
      this.message = ''
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">
  .alert {
    position: absolute;
    z-index: 1000;
    right: 20px;
    top: 20px;
  }
</style>
