<template> 
    <footer class="bg-dark text-center text-white">
            <!-- Grid container -->
            <div class="container p-2 pb-0">
              <!-- Section: Social media -->
              <section class="mb-2">
                <!-- Linkedin -->
                <a class="btn btn-outline-light btn-floating m-1" target="_blank" href="https://www.linkedin.com/in/jose-rodriguez-bastidas-4a378a12a/" role="button"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
                <!-- Github -->
                <a class="btn btn-outline-light btn-floating m-1" target="_blank" href="https://github.com/joserb10" role="button"
                  ><i class="fab fa-github"></i
                ></a>
              </section>
              <!-- Section: Social media -->
            </div>
            <!-- Grid container -->
          
            <!-- Copyright -->
            <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
              © 2022 Copyright:
              <a class="text-white">José Alberto Rodríguez Bastidas</a>
            </div>
            <!-- Copyright -->
    </footer>
</template>
<script>
export default {
  name: 'FooterComponent',
}
</script>
<style>
footer {
    position: relative;
    bottom: 100;
}
</style>