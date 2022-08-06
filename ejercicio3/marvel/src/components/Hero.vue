<template>
    <div class="row">
       <div class="col-md-3">
            <div class="card h-100 card-product">
                <!-- Oferta badge-->
                <div class="badge badge-custom bg-dark text-white position-absolute  `+ classHideBadges +`" style="top: 0.5rem; right: 0.5rem">Descuento d%</div>
                <!-- Product image-->
                <img class="card-img-top product-img" src="https://cdn.pixabay.com/photo/2021/10/28/18/02/engaged-6750227_960_720.jpg"/>
                <!-- Product details-->
                <div class="card-body p-0">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder p-2 bg-dark text-white">asd</h5>
                        <!-- Product reviews-->
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            <span class="badge badge-custom">asdasdasd</span>
                        </div>
                        <!-- Product price-->
                        <span class="text-muted text-decoration-line-through  `+ classHideBadges +`">asdasdasdasd asda</span>
                        adqsadasd
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto">Añadir a carrito</a></div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
  name: 'HeroComponent',
  props: {
    hero: {}
  }
}
</script>

<style scoped>
.product-img{
    -webkit-transition:all .9s ease; 
    -moz-transition:all .9s ease; 
    -o-transition:all .9s ease;
    -ms-transition:all .9s ease; 
    width: 100%;
    height: 250px;
    object-fit:cover;
  }
</style>
