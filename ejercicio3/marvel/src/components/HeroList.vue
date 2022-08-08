<template>
    <section class="p-4 bg-dark">
        <div class="container">
            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-sm-12 col-md-5 col-lg-5 col-xl-4 d-flex justify-content-center">
                    <div class="col-sm-11 col-md-10">
                        <input v-on:keyup.enter="getHeroByName()" type="text" class="form-control input-search w-100" placeholder="Buscar Heroes" v-model="textSearch">
                    </div>
                    <div class="col-sm-2 col-md-2">
                        <button @click="getHeroByName()" class="btn btn-dark w-100" type="button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                
            </div> 
        </div> 
    </section>  
    <div class="spinner" v-if="loading"><div></div><div></div></div>
    <section v-if="arrayHeroes" class="py-3" id="section-heroes" ref="scrollComponent">
            <div class="container px-4 px-lg-5 mt-5">
                <div id="containerHeroes" class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <Hero v-for="(hero, index) in arrayHeroes" :key="index" :hero="hero"></Hero>
                </div>
                <div v-if="arrayHeroes.length" v-observe-visibility="visibilityChanged"></div>
            </div>
    </section>
</template>

<script>
import Hero from './Hero.vue';
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: "HeroListComponent",
    components: { Hero },
    //Variables reactivas para el template
    data() {
        return {
            timeStamp: 1,
            hashApi: '792c436316bc46923e180b600fce46a7',
            publicKeyApi: '8fcd20f1539c4f92f60d1adb1dc6ae37',
            urlApiHeroes: 'https://gateway.marvel.com/v1/public/characters',
            arrayHeroes: [],
            offSet: 0,
            offsetLast: 0,
            textSearch: '',
            aditionalQuery: '',
            aditionalQueryActive: false,
            totalHeroes: 0,
            timesRequest: 0,
            counterTimesRequest: 0,
            loading: false
        };
    },
    async mounted(){
        //Obtener una primera lista de heroes al montar el componente de manera asincrona
        await this.getMoreHeroes(this.aditionalQuery);
    }, 
    unmounted(){
    },  
    methods:{
        //Funcion para obtener heroes de acuerdo al offset con el limite de 20 heros por defecto
        async getMoreHeroes(aditionalQuery){
            console.log("get more heroes")
            console.log(this.offSet +'-' +this.offsetLast)

            //Validar que el offset varie del anterior request realizado
            if (this.offSet!=0 && this.offSet == this.offsetLast ) {return}
            let me = this

            let urlApiComplete = this.urlApiHeroes+'?ts='+this.timeStamp+'&apikey='+this.publicKeyApi+'&hash='+this.hashApi+'&offset='+this.offSet+'&orderBy=name'+aditionalQuery;
            this.loading = true    
            
            //Validar que el el request no exceda la cantidad total de registros que posee el api con el query que tenga
            if (this.timesRequest != 0 && this.timesRequest == this.counterTimesRequest) {
                this.loading= false
                return
            }

            //Realizar la peticion http a la api de marvel
            try {
                const resp = await axios.get(urlApiComplete);
                console.log(resp.data);
                if(me.aditionalQueryActive && resp.data.data.results.length == 0){
                        Swal.fire({
                        position: 'top-left',
                        background: '#FF5733',
                        customClass: 'swal-small-cart',
                        title: 'No existen heroes con ese texto!',
                        showConfirmButton: false,
                        timer: 1300
                    });
                    me.aditionalQuery = ''
                    me.getMoreHeroes(me.aditionalQuery)
                }

                me.totalHeroes = resp.data.data.total
                me.timesRequest = Math.ceil(me.totalHeroes / 20)
                me.counterTimesRequest++ 
                me.arrayHeroes.push(...resp.data.data.results)
                me.offsetLast = resp.data.offset
                me.offSet +=20
                console.log(me.timesRequest)
                console.log(me.counterTimesRequest)
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
            me.loading = false

            //Modificar lista original de heroes si es que se realizo un update dentro de localstorage
            if(localStorage.getItem('heroUpdated')) {
                let heroUpdated = JSON.parse(localStorage.getItem('heroUpdated'))
                console.log('heroupdated')
                this.arrayHeroes[this.arrayHeroes.findIndex(el => el.id === heroUpdated.id)] = heroUpdated
                console.log(this.arrayHeroes[this.arrayHeroes.findIndex(el => el.id === heroUpdated.id)])
            }

            //Modificar lista original de heroes si es que se creo uno nuevo dentro de localstorage
            if(localStorage.getItem('heroCreated') && !this.aditionalQueryActive) {
                let heroCreated = JSON.parse(localStorage.getItem('heroCreated'))
                console.log('heroCreated')
                const heroExists = this.arrayHeroes.find(el => el.name === heroCreated.name)
                console.log(heroExists)
                if (!heroExists) {
                    this.arrayHeroes.unshift(heroCreated)
                }
            }

        },
        //Funcion para obtener heros que inicien el campo nombre con el texto dado
        getHeroByName() {
            if(!this.textSearch) { 
                Swal.fire({
                    position: 'top-left',
                    background: '#FF5733',
                    customClass: 'swal-small-cart',
                    title: 'Debe ingresar un texto para buscar!',
                    showConfirmButton: false,
                    timer: 1300
                });
                return
            }
            this.arrayHeroes = []
            this.offSet = 0
            this.offsetLast = 0
            this.aditionalQueryActive = true
            this.aditionalQuery = '&nameStartsWith='+this.textSearch
            this.timesRequest=0
            this.counterTimesRequest=0

            this.getMoreHeroes(this.aditionalQuery)
        },

        //Observar la visibilidad que el bottom de la seccion de heroes para el infinite scroll
        visibilityChanged(isVisible, entry) {
            if(!isVisible) { return }
            this.getMoreHeroes(this.aditionalQuery)
            
            console.log(isVisible)
            console.log(entry)
        }
    }

}
</script>

<style>
/*Customizar swal*/
.swal2-title {
    color: white !important;
    font-size: 15px !important;
}

/*Customizar Swal Alert al buscar heroes*/
.swal-small-cart {
    height: 43px !important;
    width: 300px !important;
}


/*Spinner styles*/
.spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.spinner div {
  position: absolute;
  border: 10px solid rgb(35, 6, 165);
  opacity: 1;
  border-radius: 50%;
  animation: spinner 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.spinner div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes spinner {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

</style>
