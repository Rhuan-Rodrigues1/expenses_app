<template>
  <div>
    <form @submit.prevent="formLogin()" class="form">
    <div class="card">
      <h2 class="title">Expenses</h2>
      <div class="card-body">
        <div class="form-group">
          <input type="email" class="form-control" placeholder="E-mail" v-model="email" required>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="password" v-model="pass" required>
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          Logar
          <template v-if="loading">
            <i class="fas fa-spinner fa-spin"></i>
          </template>
          <template v-else>
             <i class="fas fa-sign-in-alt"></i>
          </template>
        </button>
      </div>
    </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      pass: '',
      loading: false
    }
  },
  methods: {
    async formLogin () {
      this.loading = true
      const { email, pass } = this
      try {
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, pass)
        window.uid = res.user.uid

        this.$root.$emit('Notification::show', {
          type: 'success',
          message: 'Logado com sucesso'
        })
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possivel logar: Email/Senha Incorretos'
        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 30%;
  height: 60%;
  display: flex;
  top: 0;
  left: 0;
  text-align: center;
  border-top: outset var(--featured);
}

.title {
  margin-top: 2rem;
  margin-bottom: 0;
  color: var(--darker)
}

.card-body {
  padding-top: 2rem;
}

.card-body .form-control{
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
}

</style>
