<template>
    <button class="btn btn-logout" @click="logout()">
      <i class="fas fa-sign-out-alt"></i>
      Sair
    </button>
</template>

<script>
export default {
  methods: {
    async logout () {
      this.$root.$emit('Spinner::show')

      await this.$firebase.auth().signOut()

      this.$router.push({ name: 'login' })

      this.$root.$emit('Spinner::hide')
    }
  }
}
</script>

<style style="scss" scoped>
  .btn-logout {
    width: 100%;
    color: var(--light);
    cursor: pointer;
    text-decoration: none;
    margin-top: 420px;
  }

  .btn-logout:hover {
    color: var(--featured);
  }
</style>
