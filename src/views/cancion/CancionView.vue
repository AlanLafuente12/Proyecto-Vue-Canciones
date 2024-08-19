<template>
    <div>
      <h1 style="text-align: center;">{{item.nombre}}</h1>
      <br>
      <div style="text-align: center;">
        <h2 >Información de la canción</h2>
        <p><b>Nombre Artista: </b>{{ item.artista.nombre }}</p>
        <p><b>Album: </b>{{ item.album }}</p>
        <p><b>Lanzamiento: </b>{{ item.lanzamiento }} </p>
        <p><b>Genero: </b>{{ item.genero }}</p>
      </div>
      <br>
      <div style="text-align: center;">
        <h2>Letra</h2>
        <p v-for="(verso, index) in letra" :key="index">{{ verso }}</p>
      </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CancionView',
    data() {
        return {
            item: {
                artista:"",
                album:"",
                lanzamiento:"",
                genero:"",
                letra:""
            },
            letra: ""
        }

    },
    components: {
        // Registro de componentes que se utilizaran.
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        getItem() {
            const vm = this;
            const id = this.$route.params.id
            let ruta = "";
            if (id){
                ruta = "/canciones/"+id+"?_expand=artista"
                this.axios.get(this.baseUrl + ruta)
                .then(function (response) {
                    vm.item = response.data;
                    vm.letra = response.data.letra.split("\n");
                })
                .catch(function (error) {
                    console.error(error);
                });
            }
        }
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
        ...mapGetters(['getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
    props: {
        // propiedades que el componente puede recibir.
    },
    mounted() {
        this.getItem();
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>
  
<style></style>