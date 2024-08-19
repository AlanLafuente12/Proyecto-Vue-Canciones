<template>
    <div>
      <h1>Registrar Artista</h1>
      <form @submit.prevent="submitForm()">
        <div class="form-group">
          <label for="nombre">Nombre artista:</label>
          <input type="text" id="nombre" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
            placeholder="Ingrese el nombre de la canción" />
          <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
        </div> 

        <div class="form-group">
          <label for="idioma">Idioma:</label>
          <input type="text" id="idioma" v-model="form.idioma" :class="{ 'is-invalid': errors.idioma }"
            placeholder="Ingrese el idioma" />
          <div v-if="errors.idioma" class="invalid-feedback">{{ errors.idioma }}</div>
        </div>

        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </template>
    
  <script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'CancionNew',
    data() {
      return {
        form: {
            nombre: '',
            idioma: ''
        },
        errors: {}
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        if (!this.form.nombre) {
          this.errors.nombre = 'El nombre es obligatorio.';
        }
        if (!this.form.idioma) {
          this.errors.album = 'El idioma es obligatorio.';
        }
        return Object.keys(this.errors).length === 0;
      },
  
      submitForm() {
        if (this.validateForm()) {
          // Enviar los datos al servidor
          this.save();
          // Reiniciar el formulario
          this.form = {
            nombre: '',
            idioma: ''
          };
        }
      },
      save() {
        const vm = this;
        console.log("/artistas")
        this.axios.post(this.baseUrl + "/artistas", this.form)
          .then(function (response) {
            if (response.status == '200') {
              vm.$emit('on-update', response.data);
            }
            vm.itemList = response.data;
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    computed: {
      // propiedades computadas que dependen de otras propiedades reactivas
      ...mapGetters(['getBaseUrl']),
      baseUrl() {
        return this.getBaseUrl
      }
    }
  }
  </script>
    