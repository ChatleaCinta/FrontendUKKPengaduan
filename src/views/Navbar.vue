<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#"> <span class="text-primary" style="font-weight:800">PENGADUAN</span>  MASYRAKAT</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item v-if="$store.state.user.role=='admin'||$store.state.user.role=='staff'" to="/tanggapan">Tanggapi</b-nav-item>
          <b-nav-item v-if="$store.state.user.role=='user'" to="/pengaduan">Pengaduan</b-nav-item>
          <b-nav-item v-if="$store.state.user.role=='admin'||$store.state.user.role=='staff'" to="/user">User</b-nav-item>
          <b-nav-item v-if="$store.state.user.role=='admin'||$store.state.user.role=='staff'" :href="this.axios.defaults.baseURL+'/pdf'">Buat Laporan</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="!isLoggedIn">
                <router-link to="/login" class="mr-3">
                    <button class="btn btn-light">LOGIN</button>
                </router-link>
                <router-link to="/register">
                    <button class="btn btn-dark">REGISTER</button>
                </router-link>
            </div>
          <b-nav-item-dropdown v-else right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{$store.state.user.name}}</em>
            </template>
            <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#"> <span class="text-primary" style="font-weight:800">PENGADUAN</span>  MASYRAKAT</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" href="#"
              >Home <span class="sr-only">(current)</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/pengaduan" class="nav-link" href="#"
              >Pengaduan <span class="sr-only">(current)</span></router-link
            >
          </li>
        </ul>
        <div class="d-flex">
            <div v-if="!isLoggedIn">
                <router-link to="/login" class="mr-3">
                    <button class="btn btn-light">LOGIN</button>
                </router-link>
                <router-link to="/register">
                    <button class="btn btn-dark">REGISTER</button>
                </router-link>
            </div>
            <div v-else>
                <button v-on:click="logout" class="btn btn-danger">LOGOUT</button>
            </div>
        </div>
      </div>
    </nav> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      name:"",
    };
  },
  methods:{
    logout(){
      this.$store.dispatch('logout').then((response) => {
          location.href = "/"
        })
        .catch((err) => {
          location.href = "/"});
      
    },
  },
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.isLoggedIn = true;
        // if (this.$store.state.user) {
        //   this.name = this.$store.state.user.name;
        // }
    }
  },
};
</script>