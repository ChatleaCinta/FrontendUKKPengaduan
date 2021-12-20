<template>
  <div class="home container-fluid w-75">
    <div class="row mx-0 d-flex justify-content-around">
      <h1 class="ml-0 pl-0">Aduan Masyarakat</h1>
    </div>
    <div class="row mx-0 d-flex flex-column">
      <div class="card shadow p-3 mb-2 bg-white rounded">
        <div class="card-body">
          <h5 class="card-title">{{ data.user.name }}</h5>
          <img
            class="img-thumbnail normalizewidth"
            :src="'http://localhost/pengaduan/public/image/pengaduan/' + data.foto"
          />
          <p class="card-text">
            {{ data.laporan }}
          </p>
        </div>
      </div>
      <div class="card shadow p-3 mb-2 bg-white rounded">
        <div class="row mx-0 d-flex justify-content-between">
          <h3 class="d-inline">Tanggapan</h3>
        </div>
        <div class="row mx-0">
          <div
            v-for="(item, index) in data.tanggapan"
            :key="index"
            class="card shadow p-3 mb-2 bg-white rounded"
          >
            <p class="my-0">
              {{ item.user.name }} <br />
              <small>{{ item.created_at }}</small>
            </p>
            <p>{{ item.tanggapan }}</p>
            <button :disabled="isDeleteDisabled" v-on:click="deleteItem(item.id)" class="btn text-danger w-25">Delete</button>
          </div>
        </div>
      </div>
      <div class="card shadow p-3 mb-2 bg-white rounded">
        <h3>Tanggapi</h3>
        <form @submit.prevent="submit">
          <b-alert v-if="success" show variant="success"
            >Success Mengedit</b-alert
          >
          <b-alert v-if="failed" show variant="danger">Failed Mengedit</b-alert>
          <div class="form-group">
            <textarea
              v-model="tanggapan"
              type="textarea"
              class="form-control"
              placeholder="Masukan Keterangan"
              required="required"
            />
          </div>
          <div class="form-group">
            <button
              type="submit"
              :disabled="isDisabled"
              class="btn btn-primary btn-block"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      idpengaduan: this.$route.params.idpengaduan,
      failed: false,
      success: false,
      isDisabled: false,
      tanggapan: "",
      isDeleteDisabled:false
    };
  },
  methods: {
    getData() {
      this.file = "";
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/pengaduan/" + this.idpengaduan, conf)
        .then((response) => {
          this.failed = false;
          this.success = false;
          this.isDisabled = false;
          this.data = response.data.data;
          this.isDeleteDisabled = false;
        })
        .catch((error) => {
          this.isDisabled = false;
          this.failed = false;
          this.success = false;
          console.log(error);
        });
    },
    submit() {
      this.isDisabled = true;
      let formData = new FormData();
      formData.append("tanggapan", this.tanggapan);
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .post("/tanggapan/" + this.idpengaduan, formData, conf)
        .then((response) => {
          this.isDisabled = false;
          this.success = true;
          this.getData();
        })
        .catch((error) => {
          this.isDisabled = false;
          this.failed = true;
          this.getData();
          console.log(error);
        });
    },
    deleteItem($id) {
      this.isDeleteDisabled = true;
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .delete("/tanggapan/" + $id, conf)
        .then((response) => {
          console.log(response.data);
          this.getData();
        })
        .catch((error) => {
          console.log(error);
          this.isDeleteDisabled = false;
        });
    },
  },
  mounted() {
    this.key = this.key = localStorage.getItem("Authorization");
    this.getData();
  },
};
</script>