<template>
  <div>
    <dir class="months-navigation">
      <div
        :key="i"
      class="month-links"
      @click="setActivedMonth(month)"
      :class="{active: month.month === activeMonth.month}"
      v-for="(month, i) in groupedMonths"
      >
        <div>{{ month.month }}</div>
        <div class="value-label" v-money-format="month.total"></div>
      </div>
    </dir>
    <div class="container">
      <div v-if="activeMonth.data &&  !activeMonth.data.length">
        Você não cadastrou nenhum item
      </div>
      <template v-else>
      <expenses-list-itens
      v-for="(item, index) in activeMonth.data"
      :key="index"
      :data="item"
      />
      </template>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash.groupby'
import moment from 'moment'
import ExpensesListItens from './ExpensesListItens.vue'

export default {
  name: 'ExpensesList',
  components: {
    ExpensesListItens
  },
  data () {
    return {
      expenses: [],
      activeMonth: {}
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.setActivedMonth()
  },

  computed: {
    groupedMonths () {
      let groupedMonths = []

      const addCurrentMonth = () => {
        groupedMonths.push({
          data: [],
          total: 0,
          month: moment().format('MM/YYYY')
        })
      }

      if (this.expenses.length) {
        const months = groupBy(this.expenses, i => {
          return moment(i.createdAt).format('MM/YYYY')
        })

        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = 'MM/YYYY/ HH'
          if (moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))) {
            return 1
          } else {
            return -1
          }
        })

        groupedMonths = sortedMonths.map(month => ({
          month,
          data: months[month],
          total: months[month].map(i => +i.value).reduce((acc, cur) => acc + cur, 0)
        }))
        const lastMonth = moment(groupedMonths[groupedMonths.length - 1].month, 'MM/YYYY')

        if (!lastMonth.isSame(moment(), 'month')) {
          addCurrentMonth()
        }
      } else {
        addCurrentMonth()
      }
      return groupedMonths
    }
  },

  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', snapshot => {
        const values = snapshot.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    },
    setActivedMonth (month) {
      this.activeMonth = month || this.groupedMonths[this.groupedMonths.length - 1]
    }
  }

}
</script>

<style lang="scss" scoped>
.months-navigation {
  width: calc(100% + 30px);
  display: flex;
  margin-left: -12px;
  background: var(--featured);
}

.month-links {
  padding: 15px;
  font-size: 25px;
  cursor: pointer;
}

.month-links:hover {
  background: var(--featured-dark);
  transition: .4s;
}

.value-label {
  color: var(--darker);
  text-align: center;
  font-size: 15px;
}

.container {
  padding-top: 15px;
  padding-bottom: 15px;
  height: calc(100vh - 90px);
  width: 100%;
  overflow: hidden auto;
  font-size: 20px;
}
.month-links.active {
  background: var(--featured-dark);
}
</style>
