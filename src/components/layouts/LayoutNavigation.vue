<template>
    <nav class="nav flex-column d-flex justify-content-between">
      <div>
          <router-link exact
              :key="i"
              v-for="(router, i) in routerLinks"
              :to="{name: router.name}"
              class="nav-link"
              exact-active-class="active">
                <i class="fa" :class="`fa-${router.meta.icon}`"></i>
                  {{router.meta.title}}
              </router-link>
              <layout-new-expenses />
      </div>
         <layout-logout/>
</nav>
</template>

<script>
import LayoutLogout from './LayoutLogout.vue'
import LayoutNewExpenses from './LayoutNewExpenses.vue'
export default {
  components: {
    LayoutLogout,
    LayoutNewExpenses
  },
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(r => r.name !== 'login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    margin-left: -15px;
  }

  .nav-link {
    color: var(--light);
    transition: 0.4s;
  }

  .nav-link:hover {
    color: var(--dark);
    background-color: var(--featured);
  }

  .nav-link.active {
    color: var(--featured);
    background-color: transparent;
  }

</style>
