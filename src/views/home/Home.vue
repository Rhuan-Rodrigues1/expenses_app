<template>
  <div id="home">
    <div class="row">
      <div class="col-6 home-box">
        <small>Você gastou: </small>
        <div class="money" v-money-format="totals.totalSpent"></div>
        <small>Em {{this.expenses.length}} compra(s)</small>
      </div>
      <div class="col-6 home-box">
        <small>A média dos gastos foi: </small>
        <div class="money" v-money-format="totals.average"></div>
      </div>
      <div class="col-6 home-box">
        <small>O maior gasto foi: </small>
        <div class="money" v-money-format="totals.biggest.value"></div>
        <small v-date-format="totals.biggest.createdAt"></small>
      </div>
      <div class="col-6 home-box">
        <small>O menor gasto foi: </small>
        <div class="money" v-money-format="totals.lowest.value"></div>
        <small v-date-format="totals.lowest.createdAt"></small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      expenses: []
    }
  },
  computed: {
    totals () {
      const { expenses: exp } = this

      const values = {
        totalSpent: 0,
        average: 0,
        biggest: {},
        lowest: {}
      }
      if (exp) {
        values.totalSpent = exp.map(e => +e.value).reduce((acc, cur) => acc + cur, 0).toFixed(1)

        values.average = (values.totalSpent / exp.length).toFixed(1)
        values.biggest = exp.sort((a, b) => +b.value - +a.value)[0]
        values.lowest = exp.sort((a, b) => +a.value - +b.value)[0]
      }
      return values
    }
  },

  created () {
    this.getValues()
  },

  methods: {
    getValues () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  padding: 15px;
}
#home .home-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 30pt;
  justify-content: center;
  height: calc(50vh - 15px);
  border: 1px solid var(--dark-medium);
  small {
    font-size: 1.3rem;
  }
}

#home .home-box:nth-child(2),
#home .home-box:nth-child(4) {
 border-left: none;
}

#home .home-box:nth-child(3),
#home .home-box:nth-child(4) {
  border-top: none;
}

.money {
  color: var(--featured);
}
</style>
