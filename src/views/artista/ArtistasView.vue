<template>
    <div>
        <Modal v-model:modelValue="showModalNuevo">
            <ArtistaNew @on-register="onRegister($event)"/>
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <ArtistaEdit @on-update="onUpdate($event)" :item="itemToEdit"/>
        </Modal>
        <h1>Artistas</h1>
        <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
        <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
        <input type="search" style="float:right" v-model="textToSearch" @search="buscar()">

        <div style="margin: 20px 0;">
            <form @submit.prevent="filtrar()">
                <label for="idioma"> Idioma: </label>
                <select id="idioma" v-model="filter.idioma">
                    <option value="">Todos</option>
                    <option :value="idioma" v-for="(idioma, index) in idiomaList" :key="`idioma-${index}`">{{ idioma }}
                    </option>
                </select>
                <button type="submit" class="btn btn-lith">Fitrar</button>
            </form>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Idioma</th>
                    <th></th>
                </tr>
            </thead> 
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.idioma }}</td>
                    <td>
                        <button @click="verCanciones(item.id)" class="btn btn-dark" style="margin-right: 15px;">Ver canciones</button>
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
import ArtistaNew from './ArtistasNewView.vue'
import ArtistaEdit from './ArtistasEditView.vue'


export default {
    name: 'ArtistasView',
    data() {
        return {
            currentPage: 1,
            totalPages: 100,
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            itemList: [],
            idiomaList: [
                "Español",
                "Ingles",
                "Frances",
                "Italiano",
                "Portuges"
            ],
            textToFilter: '',
            filter: {
                idioma: ''
            }
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        Modal,
        ArtistaNew,
        ArtistaEdit
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        getList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/artistas?" + this.textToFilter + "&q=" + this.textToSearch)
                .then(function (response) {
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        verCanciones(id){
            this.$router.push("/artista/"+id+"/canciones");
        },
        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Esta seguro de eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + "/artistas/" + id)
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
        filtrar() {
            this.textToFilter = '';
            if (this.filter.idioma != '') {
                this.textToFilter += "&idioma=" + this.filter.idioma;
            }
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