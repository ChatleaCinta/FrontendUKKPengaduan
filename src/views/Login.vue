<template>
  <div class="login-form">
    <form @submit.prevent="Login">
      <h2 class="text-center">Log in</h2>
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
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required="required"
        />
      </div>
      <div class="form-group">
        <button
          type="submit"
          :disabled="isDisabled"
          class="btn btn-primary btn-block"
        >
          Log in
        </button>
      </div>
    </form>
    <router-link to="/register" class="text-center">Create an Account</router-link>
  </div>
</template>
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
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isAlertSuccess: false,
      alertStatus: "",
      alertMesage: "",
      showAlert: false,
      isDisabled: false,
    };
  },
  computed: {
    alertType() {
      return {
        "alert-success": this.isAlertSuccess,
        "alert-danger": !this.isAlertSuccess,
      };
    },
  },
  methods: {
    Login: function () {
      this.isDisabled = true;
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then((response) => {
          this.isDisabled = false;
          this.alertMesage = "Login Berhasil";
          this.isAlertSuccess = true;
          this.showAlert = true;
          console.log(this.isAlertSuccess);
          location.href = "/";
        })
        .catch((err) => {
          this.isDisabled = false;
          this.alertMesage = "Login Gagal";
          this.isAlertSuccess = false;
          this.showAlert = true;
        });
    },
  },
  mounted() {
    // console.log(this.$store.state.token);
  },
};
</script>
