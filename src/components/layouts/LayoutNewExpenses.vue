<template>
  <div class="w-100 d-flex justify-content-center">
    <button @click="showModal = true" class="btn bnt-lg btn-outline-primary">
      <i class="fa fa-plus"></i>
      Novos custos
    </button>
    <form @submit="submit()">
      <div class="modal fade" :class="{show: showModal}" tabindex="-1" style="display: block;" :style="{display: showModal ? 'block' : 'none'}">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLiveLabel">Adicionar novo gasto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal()"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group col-8">
                <label for="">Descrição</label>
                <input type="text" class="form-control" v-model="form.description" required>
              </div>
              <div class="form-group col-4">
                <label for="">Valor</label>
                <input type="text" class="form-control" v-model="form.value" required>
              </div>
              <div class="form-group col-12 flex-column d-flex align-items-center">
                <input type="file" accept="image/*" class="d-none" ref="input" @change="handleFile($event)">
                <button type="button" class="btn w-50 btn-outline-secondary button-recibo" @click="openFileDialog()">Adicionar Recibo</button>
                <div class="mt-4" v-if="form.receipt">
                  {{form.receipt.name}}
                  <button class="btn badge badge-light" @click="form.receipt = ''">
                    <i class="fa fa-trash text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal()">Fechar</button>
            <button class="btn btn-primary">Incluir novo gasto</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}"></div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showModal: false,
      form: {
        description: '',
        value: '',
        receipt: ''
      }
    }
  },
  computed: {
    fileName () {
      const { receipt } = this.form

      if (receipt) {
        const split = receipt.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    },
    async submit () {
      try {
        let url = ''
        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key

        if (this.form.receipt) {
          const snapshot = await this.$firebase.storage().ref(window.uid).child(this.fileName).put(this.form.receipt)

          url = await snapshot.ref.getDownloadURL()
        }

        const payload = {
          id: id,
          ...this.form,
          receipt: url,
          createdAt: new Date().getTime()
        }

        ref.child(id).set(payload, err => {
          if (err) {
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message: 'Não foi possivel inserir gastos'
            })
          } else {
            this.closeModal()
            this.form.description = ''
            this.form.value = ''
            this.$root.$emit('Notification::show', {
              type: 'success',
              message: 'Gasto inserido com sucesso'
            })
          }
        })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possivel inserir gastos'
        })
      } finally {
        this.$root.$emit('Spinner::hide')
      }
    },
    openFileDialog () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },

    handleFile (e) {
      this.form.receipt = e.target.files[0]
    }
  }

}
</script>

<style lang="scss" scoped>
.modal {
  color: var(--darker);
}

.btn-outline-primary {
  margin-top: 20px;
}

.button-recibo {
  margin-top: 7px;
}

</style>
