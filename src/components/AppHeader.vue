<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <div class="container">
      <b-navbar-brand href="#">Percircle</b-navbar-brand>

      <b-navbar-nav class="ms-auto">
        <b-nav-form>
          <github-button
            href="https://github.com/teobais/percircle-vue/fork"
            data-icon="octicon-repo-forked"
            data-size="large"
            data-show-count="true"
            aria-label="Fork teobais/percircle-vue on GitHub"
            >Fork</github-button
          >
          <github-button
            class="ms-3"
            href="https://github.com/teobais/percircle-vue"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star teobais/percircle-vue on GitHub"
            >Star</github-button
          >
        </b-nav-form>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script>
import GithubButton from 'vue-github-button'

export default {
  components: {
    GithubButton,
  },
}
</script>

<style lang="scss" scoped></style>
