<template>
    <div class="col mb-5">
        <div class="card card-hero">
            <!-- Hero badge-->
            <div class="badge badge-custom bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
                <div class="d-flex justify-content-center small text-warning mb-2">
                        <span class="badge bg-outline-dark">Last Modified</span>
                </div>
                {{heroDateFormated}}
            </div>
            <!-- Hero image-->
            <img class="card-img-top hero-img" :src="hero.imgSrc ? hero.imgSrc : hero.thumbnail.path+'.'+hero.thumbnail.extension"/>
            <!-- Hero details-->
            <div class="card-body p-0">
                <div class="text-center">
                    <!-- Hero name-->
                    <h5 class="fw-bolder p-2 bg-dark text-white">{{hero.name}}</h5>
                    
                </div>
            </div>
            <!-- Hero actions-->
            <div class="card-footer p-3 pt-0 border-top-0 bg-transparent d-flex justify-content-around">
                <button v-if="hero.description.trim()" class="btn btn-sm btn-outline-info" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseId'+hero.id" aria-expanded="false" aria-controls="collapseExample">
                    <i class="fa fa-eye"></i> Descripción
                </button>
                
                <div class="text-center">
                    <router-link class="btn btn-outline-dark mt-auto btn-sm" :to="{name:'EditHero', params: { name: hero.name }}"><small v-if="!hero.description.trim()">Editar</small> <i class="fa fa-edit"></i> </router-link></div>
            </div>
            <!-- Hero descr-->
            <div class="collapse" :id="'collapseId'+hero.id">
                <small class="text-muted fst-italic">{{hero.description}}</small>
            </div>
        </div>
    </div> 
</template>

<script>
import moment from 'moment'

export default {
    name: 'HeroComponent',
    props: {
        hero: {}
    },
    computed: {
        //Funcion para obtener la fecha de moficacion del heroe en un formato especifico
      heroDateFormated() {
        return moment(String(this.hero.modified)).format('DD-MM-YYYY')
      }
    },
}
</script>

<style scoped>
 /*Transition para efecto de img card hero*/
.hero-img{
    -webkit-transition:all .9s ease; 
    -moz-transition:all .9s ease; 
    -o-transition:all .9s ease;
    -ms-transition:all .9s ease; 
    width: 100%;
    height: 250px;
    object-fit:cover;
  }

/*Hover effect for card de heroes*/
.card-hero:hover .hero-img{
    opacity: 0.7;
    -webkit-transform:scale(1.2);
    -moz-transform:scale(1.2);
    -ms-transform:scale(1.2);
    -o-transform:scale(1.2);
    transform:scale(1.2);
}
</style>
