<template>
    <div class="container mt-4">
        <form class="customForm">
            
            <div class="form-outline mb-4 d-flex align-items-center row">
                <div class="col-md-2">
                    <label class="form-label" for="name">Nombre:</label>
                </div>
                <div class="col-md-10 ">
                    <input type="text" id="name" class="form-control" v-model="hero.name"/>
                </div>
            </div>
            <div class="form-outline mb-4 d-flex align-items-center row">
                <div class="col-md-2">
                    <label class="form-label" for="desc">Descripción:</label>
                </div>
                <div class="col-md-10">
                    <textarea rows="5" id="desc" class="form-control" v-model="hero.description"/>
                </div>
            </div>
            
            <div class="form-outline mb-4 d-flex align-items-center row">
                <div class="col-md-2">
                    <label class="form-label" for="thumb">Thumbnail:</label>
                </div>
                 <div class="col-md-3">
                    <input type="file" class="form-control"  accept="image/x-png,image/gif,image/jpeg" @change="changeFile"/>
                </div>
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block" @click="saveChanges">Guardar</button>
            </form>
    </div>
    
</template>}
<script>
import axios from 'axios';

export default {
    name: 'HeroEditComponent',
    //Variables reactivas para el template
    data() {
        return {
            hero: {},
            urlApiBase: 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=8fcd20f1539c4f92f60d1adb1dc6ae37&hash=792c436316bc46923e180b600fce46a7'
        }
    },
    mounted() {
        console.log(this.$route.params)
        //Ejecutar la funcion getHeroData al montar el componente
        this.getHeroData()
    },
    methods: {
        //Función para obtener los datos del hero a editar con el param de la ruta que es el nombre
        async getHeroData() {
            const urlApiComplete = this.urlApiBase+'&name='+this.$route.params.name
            try {
                const resp = await axios.get(urlApiComplete);
                console.log(resp.data.data.results[0]);
                this.hero = resp.data.data.results[0]
            } catch (err) {
                // Handle Erro Here
                console.error(err);
            }
        },
        //Funcion para manejar el estado del input file para obtener el src de la imagen cargada
        changeFile(e){
            let file = URL.createObjectURL(e.target.files[0])
            console.log(file)
            
            let fr = new FileReader();
            let me = this
            fr.onload = function () {
                me.hero['imgSrc'] = fr.result;
            }
            fr.readAsDataURL(e.target.files[0]);
            console.log(this.hero)
        },
        //Funcion para enviar almacenar los datos del heroe editado en localstorage y redirigir a la lista de heroes
        saveChanges() {
            localStorage.removeItem('heroUpdated')
            localStorage.setItem('heroUpdated', JSON.stringify(this.hero))
            console.log(localStorage.getItem('heroUpdated'))
            this.$router.push({ path: '/' })
        }
    }
}
</script>
<style scoped>
.customForm {
    border: 1px solid black;
    padding: 15px;
    border-radius: 5px;
    background-color: black;
    color: aliceblue;
}
.container {
}
</style>