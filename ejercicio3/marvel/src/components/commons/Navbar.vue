<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div class="container px-4 px-lg-5">
                <!-- Logo Enviame -->
                <a class="navbar-brand" href="#">
                    <img class="imgLogo bg-dark rounded" width="100" src="https://enviame.io/wp-content/uploads/2020/09/logotipo-enviame-1.png" alt="">
                </a>
                <!-- Navegacion-->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Home</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Hero</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><router-link to="/" class="dropdown-item">All Heroes</router-link></li>
                                <li><hr class="dropdown-divider" /></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <router-link to="/hero/create" class="btn btn-outline-dark" type="button" @click="even">
                            <i class="bi-cart-fill me-1"></i>
                            Nuevo
                            <i class="fa fa-plus"></i>
                        </router-link>
                    </form>
                </div>
            </div>
    </nav>
</template>
<script>
export default {
  name: 'NavbarComponent',
}
</script>
<style>
</style>