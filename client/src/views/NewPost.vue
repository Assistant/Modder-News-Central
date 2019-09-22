<template>
  <div class="login">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-11-tablet is-10-desktop is-8-widescreen">
              <form @submit.prevent="upload" onsubmit="return false" class="box">
                <p>{{ error }}</p>
                <div class="field">
                  <label for="" class="label">Image URL</label>
                  <div class="control">
                    <input type="field" placeholder="" class="input" v-model="input.image" required>
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Title</label>
                  <div class="control">
                    <input type="field" placeholder="" class="input" v-model="input.title" required>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Description</label>
                  <div class="control">
                    <textarea class="textarea" v-model="input.desc" placeholder="The post information! (Supports Markdown)"></textarea>
                  </div>
                </div>
                <div class="field">
                  <button class="button is-info">
                    Create New Post
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
import axios from 'axios'
export default {
  data: function() {
    return {
      input: {
        image: "",
        title: "",
        desc: ""
      },
      error: ""
    }
  },
  methods: {
    async upload() {
        this.$http.post('https://mnc.auros.dev/api/post', { image: this.input.image, title: this.input.title, description: this.input.desc, uploader: this.$store.state.username, token: this.$store.state.token, role: this.$store.state.role }).then((response) => {
            console.log(response.data)
        })
    }
  },
  created: function () {
    if (this.$store.state.token == "") {
      this.$router.push('/')
    } else if (this.$store.state.role == 0) {
        this.$router.push('/')
    }
  }
}
</script>