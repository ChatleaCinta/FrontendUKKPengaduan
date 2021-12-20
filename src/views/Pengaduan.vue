<template>
  <div class="container-fluid w-75">
    <div class="row mx-0 d-flex justify-content-around">
      <h1 class="ml-0 pl-0">Aduan Saya</h1>
    </div>
    <b-button v-b-modal.modal-xl variant="success">Buat Aduan</b-button>
    <div class="row mx-0">
      <table class="table shadow">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Foto</th>
            <th scope="col" class="w-50">Laporan</th>
            <th scope="col">Status</th>
            <th scope="col" class="w-50">Tanggapan</th>
            <th scope="col" class="w-50">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data.data" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td><img
            class="img-thumbnail normalizewidth"
            :src="'http://localhost/pengaduan/public/image/pengaduan/' + item.foto"
          /></td>
            <td>{{ item.laporan }}</td>
            <td>{{ item.status }}</td>
            <span v-for="(itemx, index) in item.tanggapan" :key="index">
              <td v-if="index+1 == item.tanggapan.length">
                <!-- {{itemx.user.name}}<br/><br/> -->
                {{itemx.tanggapan}}
              </td>
            </span>
              <td>
              <button v-on:click="editClick(item.id,item.laporan)" class="btn btn-warning">EDIT</button>
              <button v-on:click="deleteItem(item.id)" :disabled="isDeleteDisabled" class="btn mx-1 btn-danger">DELETE</button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li v-if="data.prev_page_url!==null" v-on:click="backPage" class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">{{data.current_page}}</a></li>
          <li v-if="data.next_page_url!==null" v-on:click="nextPage" class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>  
    </div>
    <b-modal id="modal-edit" size="xl" title="Buat Aduan">
      <div>
        <form @submit.prevent="submitEdit">
          <b-alert v-if="success" show variant="success">Success Mengedit</b-alert>
          <b-alert v-if="failed" show variant="danger">Failed Mengedit</b-alert>
          <div class="form-group">
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </div>
          <div class="form-group">
            <textarea
              v-model="laporan"
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
    </b-modal>
    <b-modal id="modal-xl" size="xl" title="Buat Aduan">
      <div>
        <form @submit.prevent="submit">
          <b-alert v-if="success" show variant="success">Success Menambahkan</b-alert>
          <b-alert v-if="failed" show variant="danger">Failed Menambahkan</b-alert>
          <div class="form-group">
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </div>
          <div class="form-group">
            <textarea
              v-model="laporan"
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
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      edit:"",
      key: "",
      file:"",
      laporan:"",
      idAduan:"",
      page:1,
      isDisabled:false,
      isDeleteDisabled:false,
      success:false,
      failed:false,
    };
  },
  methods: {
    getData() {
      this.file='';
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/pengaduanku?page="+this.page, conf)
        .then((response) => {
          this.data = response.data.data;
          this.isDeleteDisabled=false;
          this.failed=false;
          this.success=false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    submit(){
      this.isDisabled=true;
      let formData = new FormData();
      formData.append('foto', this.file);
      formData.append('laporan', this.laporan);
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .post("http://localhost/pengaduan/public/api/pengaduan", formData, conf)
        .then((response) => {
          this.isDisabled=false;
          this.success=true;
          this.getData();
          this.$bvModal.hide('modal-xl')
        })
        .catch((error) => {
          this.isDisabled=false;
          this.failed=true;
          this.getData();
          console.log(error);
        });      
    },
    deleteItem($id){
      this.isDeleteDisabled=true;
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .delete("/pengaduan/"+$id, conf)
        .then((response) => {
          console.log(response.data);
          this.getData();
        })
        .catch((error) => {
          console.log(error);
        this.isDeleteDisabled=false;
        });      
    },
    editClick($id,$laporan){
      this.laporan = $laporan;
      this.idAduan = $id;
      this.$bvModal.show('modal-edit');
    },
    submitEdit(){
      this.isDisabled=true;
      let formData = new FormData();
      if(file!==''){
        formData.append('foto', this.file);
      }
      formData.append('laporan', this.laporan);
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .post("/pengaduan/edit/"+this.idAduan, formData, conf)
        .then((response) => {
          this.isDisabled=false;
          this.success=true;
          this.getData();
          this.$bvModal.hide('modal-edit')
        })
        .catch((error) => {
          this.isDisabled=false;
          this.failed=true;
          this.getData();
          console.log(error);
        });      
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
    this.key = this.key = localStorage.getItem("Authorization");
    this.getData();
  },
};
</script>