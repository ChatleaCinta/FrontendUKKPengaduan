<template>
  <div class="container-fluid w-75">
    <div class="row mx-0 d-flex justify-content-around">
      <h1 class="ml-0 pl-0">User</h1>
    </div>
    <b-button v-b-modal.modal-xl variant="success">Tambahkan User</b-button>
    <div class="row mx-0">
      <table class="table shadow">
        <thead class="thead-dark">
          <tr>
            <th scope="col">NIK</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Telepon</th>
            <th scope="col">Jenis Kelamin</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data.data" :key="index">
            <th scope="row">{{ item.nik }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.telepon }}</td>
            <td>{{ item.jenis_kelamin }}</td>
            <td>{{ item.role }}</td>
            <td>{{ item.status }}</td>
            <td>
              <button
                v-on:click="editClick(item)"
                class="btn btn-warning"
              >
                Status
              </button>
              <button
                v-on:click="deleteItem(item.id)"
                :disabled="isDeleteDisabled"
                class="btn mx-1 btn-danger"
              >
                DELETE
              </button>
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
    <b-modal id="modal-edit" size="xl" title="Ganti Status">
      <div>
        <form @submit.prevent="submitEdit">
          <div class="form-group">
            <select v-if="$store.state.user.role=='admin'" v-model="role" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                <option value="user">User</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
            </select>
          </div>
          <div class="form-group">
            <select v-model="status" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
            </select>
          </div>
          <b-alert v-if="success" show variant="success"
            >Success Mengedit</b-alert
          >
          <b-alert v-if="failed" show variant="danger">Failed Mengedit</b-alert>
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
    <b-modal id="modal-xl" size="xl" title="Buat User">
      <div>
        <form @submit.prevent="Register">
          <h2 class="text-center">Register</h2>
          <div class="form-group">
            <input
              v-model="nik"
              type="text"
              class="form-control"
              placeholder="NIK"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Name"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Username"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Email"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              v-model="telepon"
              type="text"
              class="form-control"
              placeholder="Telepon"
              required="required"
            />
          </div>
          <div class="form-group">
            <select v-model="role" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                <option selected disabled>Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
            </select>
          </div>
          <div class="form-group">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Password"
              required="required"
            />
          </div>
          <div class="form-group">
            <input
              v-model="password_confirmation"
              type="password"
              class="form-control"
              placeholder="Password Confirmation    "
              required="required"
            />
          </div>
          <div class="form-group">
            <select v-model="role" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                <option selected disabled>Role</option>
                <option value="user">User</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
            </select>
          </div>
          <div class="form-group">
            <select v-model="status" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                <option selected disabled>Status</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
            </select>
          </div>
          <b-alert v-if="success" show variant="success"
            >Success Mengedit</b-alert
          >
          <b-alert v-if="failed" show variant="danger">Failed Mengedit</b-alert>
          <div class="form-group">
            <button
              type="submit"
              :disabled="isDisabled"
              class="btn btn-primary btn-block"
            >
              Register
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
      name: "",
      nik: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      gender: "",
      telepon: "",
      role: "",
      userRole: "",
      status: "",
      edit: "",
      key: "",
      file: "",
      laporan: "",
      idUser: "",
      page: 1,
      isDisabled: false,
      isDeleteDisabled: false,
      success: false,
      failed: false,
    };
  },
  methods: {
      Register: function () {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.isDisabled = true;
      let formData = new FormData();
      formData.append("name" , this.name);
      formData.append("nik" , this.nik);
      formData.append("username" , this.username);
      formData.append("email" , this.email);
      formData.append("password", this.password);
      formData.append("password_confirmation" , this.password_confirmation);
      formData.append("telepon" , this.telepon);
      formData.append("role" , this.role);
      formData.append("status" , this.status);
      this.axios
        .post("/admin/register", formData, conf)
        .then((response) => {
          this.isDisabled = false;
          this.success = true;
          this.getData();
          this.$bvModal.hide("modal-xl");
        })
        .catch((error) => {
          this.isDisabled = false;
          this.failed = true;
          this.getData();
          console.log(error);
        });
    },
    getData() {
      this.file = "";
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/user?page="+this.page, conf)
        .then((response) => {
          this.data = response.data.data;
          this.isDeleteDisabled = false;
          this.failed = false;
          this.success = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    deleteItem($id) {
      this.isDeleteDisabled = true;
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .delete("/user/" + $id, conf)
        .then((response) => {
          console.log(response.data);
          this.getData();
        })
        .catch((error) => {
          console.log(error);
          this.isDeleteDisabled = false;
        });
    },
    editClick($user) {
      this.role = $user.role;
      this.userRole = $user.role;
      this.status = $user.status;
      this.idUser = $user.id;
      this.$bvModal.show("modal-edit");
    },
    submitEdit() {
      this.isDisabled = true;
      let formData = new FormData();
      formData.append("status", this.status);
        if(this.role !== this.userRole ){
            formData.append("role", this.role);
        }
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .post("/edituser/" + this.idUser, formData, conf)
        .then((response) => {
          this.isDisabled = false;
          this.success = true;
          this.getData();
          this.$bvModal.hide("modal-edit");
        })
        .catch((error) => {
          this.isDisabled = false;
          this.failed = true;
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