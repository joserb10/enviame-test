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
import Swal from 'sweetalert2'

export default {
    name: 'HeroNewComponent',
    //Variables reactivas para el template
    data() {
        return {
            hero: {
                name: '',
                description: '',
                imgSrc:''
            },
            arrayHeroes: [],
            urlApiBase: 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=8fcd20f1539c4f92f60d1adb1dc6ae37&hash=792c436316bc46923e180b600fce46a7'
        }
    },
    mounted() {
    },
    methods: {
        //Funcion para obtener el src para la imagen del nuevo heroe
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
        //Funcion para validar campos y ejecutar la funcion getHeroByName
        saveChanges() {
            if(this.hero.name.length < 1 || this.hero.imgSrc.length < 1) {
                Swal.fire({
                        position: 'top-left',
                        background: '#FF5733',
                        customClass: 'swal-small-cart',
                        title: 'Ingrese el nombre e imagen!',
                        showConfirmButton: false,
                        timer: 1300
                });
                return
            }
            this.getHeroByName()
        },
        /*Funcion para validar que el heroe a crear no exista en la lista original y almacenar data en el localstorage
        para añadirlo a la lista original*/
        async getHeroByName() {
            const urlApiComplete = this.urlApiBase+'&name='+this.hero.name
            try {
                const resp = await axios.get(urlApiComplete);
                console.log(resp.data.data.results.length)
                if (resp.data.data.results.length == 0) {
                    console.log('pasovalidacion')
                    localStorage.removeItem('heroCreated')
                    localStorage.setItem('heroCreated', JSON.stringify(this.hero))
                    console.log(localStorage.getItem('heroCreated'))
                    this.$router.push({ path: '/' })
                        
                } else {
                    Swal.fire({
                        position: 'top-left',
                        background: '#FF5733',
                        customClass: 'swal-small-cart',
                        title: 'Ya existe un héroe con ese nombre!',
                        showConfirmButton: false,
                        timer: 1300
                    });
                }
               
            } catch (err) {
                console.error(err);
            }
        },
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

</style>