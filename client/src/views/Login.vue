<template>
  <div class="login">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-10-tablet is-8-desktop is-6-widescreen">
              <form
                onsubmit="return false"
                class="box"
              >
                <h1 class="title is-1">
                  Login
                </h1>
                <p class="has-text-danger">
                  {{ error }}
                </p>
                <div class="field">
                  <label
                    for=""
                    class="label"
                  >Username</label>
                  <div class="control has-icons-left">
                    <input
                      class="input"
                      v-model="input.username"
                      required
                    >
                    <span class="icon is-small is-left">
                      <i class="fa fa-user" />
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label
                    for=""
                    class="label"
                  >Password</label>
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      class="input"
                      v-model="input.password"
                      required
                    >
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock" />
                    </span>
                  </div>
                </div>
                <div class="field">
                  <button
                    class="button is-primary"
                    @click="login()"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: function() {
      return {
          input: {
            username: "",
            password: ""
          },
          error: ""
      }
  },
  methods: {
    login: function () {
      var username = this.input.username
      var password = this.input.password
      if (username != "" && password != "") {
        this.$auth.login({ username, password }).then((resp) => {
            if (resp.data.error != null) {
                this.error = resp.data.error
            } else {
                this.$store.state.username = resp.data.username
                this.$store.state.password = resp.data.password
                this.$store.state.token = resp.data.token
                this.$store.state.role = resp.data.role
                localStorage.setItem("username", resp.data.username)
                localStorage.setItem("password", resp.data.password)
                localStorage.setItem("token", resp.data.token)
                localStorage.setItem("role", resp.data.role)
                this.$router.push('/')
          }
        }).catch(() => {
            this.error = "Network Error"
        })
      }
    }
  },
  created: function () {
    if (this.$store.state.token != "") {
      this.$router.push('/')
    }
  }
}
</script>