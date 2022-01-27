<template>
  <div id="app">
    <base-spinner />
    <layout-notification />
    <div class="cotainer-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 nav-layout">
          <h1 class="nav-title">Expenses</h1>
            <layout-navigation/>
        </div>
        <div class="col">
            <router-view/>
        </div>
      </div>
    </div>

    <router-view v-else />
  </div>
</template>

<script>
import LayoutNavigation from './components/layouts/LayoutNavigation.vue'
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNotification from './components/layouts/LayoutNotification.vue'
export default {
  components: {
    BaseSpinner,
    LayoutNavigation,
    LayoutNotification
  },
  data () {
    return {
      isLogged: false
    }
  },
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user

      if (window.uid) {
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: 'login' })
      }

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
  background: var(--darker);
  color: var(--light);
}

.nav-layout {
  background: var(--dark-medium);
  height: 100vh;
}

.nav-title {
  font-size: 25px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
