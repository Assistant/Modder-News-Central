<template>
  <div id="app">
    <div id="nav">
      <nav
        class="navbar is-primary"
        role="navigation"
      >
        <div class="container">
          <div class="navbar-brand">
            <router-link to="/" />
            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              :class="{'is-active': isOpen}"
              @click="isOpen = !isOpen"
            >
              <span />
              <span />
              <span />
            </a>
          </div>
          <div
            class="navbar-menu"
            :class="{'is-active': isOpen}"
          >
            <div class="navbar-start">
              <router-link
                to="/"
                class="navbar-item is-tab"
              >
                Home
              </router-link>
            </div>
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="field is-grouped">
                  <p class="control">
                    <router-link to="/newpost">
                      <button class="button" v-if="this.$store.state.token != ''">
                        New Post
                      </button>
                    </router-link>
                  </p>
                  <p class="control">
                    <button class="button" v-if="this.$store.state.token != ''" @click='logout()'>
                      Log Out
                    </button>
                  </p>
                  <p class="control">
                    <router-link to="/login">
                      <button
                        class="button"
                        v-if="this.$store.state.token == ''">
                        Login
                      </button>
                    </router-link>
                  </p>
                  <p class="control">
                    <router-link to="/register">
                      <button
                        class="button"
                        v-if="this.$store.state.token == ''">
                        Register
                      </button>
                    </router-link> 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isOpen: false,
      authenticated: false
    }
  },
  methods: {
    logout: function() {
      this.$store.state.username = ""
      this.$store.state.password = ""
      this.$store.state.token = ""
      this.$store.state.role = ""
      localStorage.removeItem("username")
      localStorage.removeItem("password")
      localStorage.removeItem("token")
      localStorage.removeItem("role")

      this.$router.push('/')
    }
  },
  created: function() {
    if (localStorage.getItem("username") == null && localStorage.getItem("password") == null && localStorage.getItem("token") == null) {
      this.isOpen = this.isOpen //???
    } else {
      this.$store.state.username = localStorage.username
      this.$store.state.password = localStorage.password
      this.$store.state.token = localStorage.token
      this.$store.state.role = localStorage.role
    }
  }
}
</script>

<style>
html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: transparent;
}
</style>