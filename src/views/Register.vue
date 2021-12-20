<template>
  <div class="login-form">
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
        <select v-model="jenis_kelamin" class="form-control">
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
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
</template>
<script>
export default {
  data() {
    return {
      name: "",
      nik: "",
      username: "",
      jenis_kelamin: "",
      email: "",
      password: "",
      password_confirmation: "",
      gender: "",
      telepon: "",
      alert: false,
      alertType: "",
      isDisabled:false,
    };
  },
  methods: {
    Register: function () {
        this.isDisabled = true;
      let name = this.name;
      let nik = this.nik;
      let username = this.username;
      let jenis_kelamin = this.jenis_kelamin;
      let email = this.email;
      let password = this.password;
      let password_confirmation = this.password_confirmation;
      let telepon = this.telepon;
      this.$store
        .dispatch("register", {
          name,
          nik,
          username,
          jenis_kelamin,
          email,
          password,
          password_confirmation,
          telepon,
        })
        .then((response) => {
            this.alert=true;
            this.alertType="alert-success";
            this.alertText="Register Berhasil"
            console.log(this.alertText);
            this.$router.push("/");
        })
        .catch((err) => {
            this.isDisabled = false;
            if(err.response.status == 400){
                this.alert=true;
                this.alertType="alert-danger";
                let vald = err.response.data;
                this.alertText=vald[0];
            }else{
                this.alert=true;
                this.alertType="alert-danger";
                this.alertText="Register Gagal"
            }
            });
    },
  },
};
</script>
<style>
.login-form {
  width: 500px;
  margin: 50px auto;
  font-size: 15px;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>