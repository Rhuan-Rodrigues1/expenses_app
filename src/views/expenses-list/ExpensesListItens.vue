<template>
  <div class="expenses-list-itens row">
    <div class="col-10">
    <div class="description">
      <span>{{ data.description }}</span>
      <button @click="openReceipt()" v-if="data.receipt" class="btn btn-sm btn-outline-primary"> Ver comprovante <i class="fas fa-external-link-alt"></i></button>
      </div>
    <small><div v-date-format="data.createdAt"></div></small>
    </div>
    <div class="col-2" v-money-format="data.value"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, require: true }
  },
  methods: {
    openReceipt () {
      window.open(this.data.receipt, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.expenses-list-itens {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--dark-medium);
}

.description {
  font-size: 24px;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
small {
  font-size: 15px;
  color: var(--featured);
}
</style>
