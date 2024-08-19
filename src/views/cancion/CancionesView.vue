<template>
    <div>
        
        <Modal v-model:modelValue="showModalNuevo">
            <CancionNew @on-register="onRegister($event)"/>
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <CancionEdit @on-update="onUpdate($event)" :item="itemToEdit"/>
        </Modal>
        <h1>Canciones</h1>
        <button @click="showModalNuevo = true" class="btn btn-primary">Crear nueva cancion</button>

        <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
        <input type="search" style="float:right" v-model="textToSearch" @search="buscar()">
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Album</th>
                    <th>Lanzamiento</th>
                    <th>Genero</th>
                    <th>Artista</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.album }}</td>
                    <td>{{ item.lanzamiento }}</td>
                    <td>{{ item.genero }}</td>
                    <td>{{ item.artista.nombre }}</td>
                    <td>
                        <button @click="verCancion(item.id)" class="btn btn-dark" style="margin-right: 15px;">Ver cancion</button>
                        <button @click="edit(item)" class="btn btn-warning" style="margin-right: 15px;">Editar</button>
                        <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex'
import Modal from '../../components/Modal.vue'
import CancionNew from './CancionNewView.vue'
import CancionEdit from './CancionEditView.vue'


export default {
    name: 'CancionesView',
    data() {
        return {
            currentPage: 1,
            totalPages: 100,
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            itemList: []
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        Modal,
        CancionNew,
        CancionEdit
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        getList() {
            const vm = this;
            const id = this.$route.params.id
            let ruta = "";
            if (id){
                ruta = "/artista/"+id+"/canciones?_expand=artista"
            }else{
                ruta = "/canciones?_expand=artista&q=" + this.textToSearch
            }
            this.axios.get(this.baseUrl + ruta)
                .then(function (response) {
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        verCancion(id){
            alert(id);
            // this.$router.push("/canciones/"+id);
        },
        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Esta seguro de eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + "/canciones/" + id)
                    .then(function (response) {
                        vm.getList();
                        vm.$toast.show("Registro eliminado.", "danger");
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }

        },
        buscar() {
            this.getList();
        },
        onRegister(event) {
            this.getList();
            this.showModalNuevo = false;
            this.$toast.show('Registro exitoso', 'success');
        },
        onUpdate(event) {
            this.getList();
            this.showModalEdit = false;
            this.itemToEdit = null;
            this.$toast.show('Edicion exitosa', 'info');
        },
        showToast(message, type) {
            this.$toast.show(message, type);
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
        this.getList();
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>
  
<style></style>