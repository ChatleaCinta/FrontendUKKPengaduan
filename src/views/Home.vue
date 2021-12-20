<template>
  <div class="home container-fluid w-75">
    <div class="row mx-0 d-flex justify-content-around">
      <h1 class="ml-0 pl-0">List Pengaduan Masyarakat</h1>
    </div>
    <div class="row mx-0 d-flex flex-column">
      <div
        v-for="(item, index) in data.data"
        :key="index"
        class="card shadow p-3 mb-5 bg-white rounded"
      >
        <div class="card-body">
          <h5 class="card-title">{{ item.user.name }}</h5>
          <img
            class="img-thumbnail normalizewidth"
            :src="'http://localhost/pengaduan/public/image/pengaduan/' + item.foto"
          />
          <p class="card-text">
            {{ item.laporan }}
          </p>
          <router-link :to="'/detail/' + item.id" class="btn btn-primary"
            >Detail</router-link
          >
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li v-if="data.prev_page_url!==null" v-on:click="backPage" class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">{{data.current_page}}</a></li>
          <li v-if="data.next_page_url!==null" v-on:click="nextPage" class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      baseUrl: "",
      page: 1,
    };
  },
  methods: {
    getData() {
      this.axios
        .get("/pengaduan?page=" + this.page)
        .then((response) => {
          this.data = response.data.data;
          console.log(this.data);
        })
        .catch((error) => {});
    },
    nextPage(){
      this.page+=1;
      this.getData();
    },
    backPage(){
      this.page-=1;
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
};
</script>