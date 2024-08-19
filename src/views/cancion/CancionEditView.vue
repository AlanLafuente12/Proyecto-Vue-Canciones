<template>
    <div>
      <h1>Editar Canción</h1>
      <form @submit.prevent="submitForm()" v-if="form">
        <div class="form-group">

          <label for="artista">Artista:</label>
          <select id="artista" v-model="form.artistaId" :class="{ 'is-invalid': errors.artistaId }">
            <option :value="artista.id" v-for="(artista, index) in artistasList" :key="`artista-${index}`">{{ artista.nombre }}
            </option>
          </select>
          <div v-if="errors.artistaId" class="invalid-feedback">{{ errors.artistaId }}</div>
        </div>
  
        <div class="form-group">
          <label for="nombre">Nombre canción:</label>
          <input type="text" id="nombre" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }"
            placeholder="Ingrese el nombre de la canción" />
          <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
        </div> 

        <div class="form-group">
          <label for="album">Album:</label>
          <input type="text" id="album" v-model="form.album" :class="{ 'is-invalid': errors.album }"
            placeholder="Ingrese el album" />
          <div v-if="errors.album" class="invalid-feedback">{{ errors.album }}</div>
        </div>

        <div class="form-group">
          <label for="lanzamiento">Lanzamiento:</label>
          <input type="text" id="lanzamiento" v-model="form.lanzamiento" :class="{ 'is-invalid': errors.lanzamiento }"
            placeholder="Ingrese el año de lanzamiento" />
          <div v-if="errors.lanzamiento" class="invalid-feedback">{{ errors.lanzamiento }}</div>
        </div>
        
        <div class="form-group">
            <label for="genero">Género:</label>
            <select id="genero" v-model="form.genero" :class="{ 'is-invalid': errors.genero }">
                <option :value="genero" v-for="(genero, index) in generoList" :key="`genero-${index}`">{{ genero }}</option>
            </select>
            <div v-if="errors.genero" class="invalid-feedback">{{ errors.genero }}</div>
        </div>

        <div class="form-group">
          <label for="letra">Letra:</label>
          <textarea  type="text" id="letra" v-model="form.letra" :class="{ 'is-invalid': errors.letra }"
            placeholder="Ingrese la letra de la canción" />
          <div v-if="errors.letra" class="invalid-feedback">{{ errors.letra }}</div>
        </div>
  
        <button type="submit" class="btn btn-primary">Registrar</button>
      </form>
    </div>
  </template>
    
  <script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'CancionEdit',
    data() {
      return {
        artistasList: [],
        generoList: [
          "Pop",
          "Rock",
          "Pop rock",
          "Jazz",
          "Hip Hop",
          "Electronic",
        ],
        errors: {}
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        if (!this.form.nombre) {
          this.errors.nombre = 'El nombre es obligatorio.';
        }
        if (!this.form.album) {
          this.errors.album = 'El album es obligatorio.';
        }
        if (!this.form.lanzamiento) {
          this.errors.lanzamiento = 'El año de lanzamiento es obligatorio.';
        }
        if (!this.form.genero) {
          this.errors.genero = 'El genero es obligatorio.';
        }
        if (!this.form.letra) {
          this.errors.letra = 'La letra es obligatoria.';
        }
        if (!this.form.artistaId) {
          this.errors.artistaId = 'El artista es obligatorio.';
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
            album: '',
            lanzamiento: '',
            genero: '',
            letra: '',
            artistaId: null
          };
        }
      },
      save() {
        const vm = this;
        delete this.form.artista;
        this.axios.patch(this.baseUrl + "/canciones/"+ this.item.id, this.form)
          .then(function (response) {
            if (response.status == '200') {
              vm.$emit('on-update', response.data);
            }
            vm.itemList = response.data;
          })
          .catch(function (error) {
            console.error(error);
          });
      },
      getArtistasList() {
        const vm = this;
        this.axios.get(this.baseUrl + "/artistas")
          .then(function (response) {
            vm.artistasList = response.data;
          })
          .catch(function (error) {
            console.error(error);
          });
      },
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
        ...mapGetters(['getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        },
        form() {
            return Object.assign({},this.item);
        }
    },
    mounted() {
      this.getArtistasList();
    },
    props: ['item']
  }
  </script>
    
  <style scoped></style>
    