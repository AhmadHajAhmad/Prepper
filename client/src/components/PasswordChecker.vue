<template>
  <div class="progress">
    <div class="bar" :style="{ width: progressBarWidth, backgroundColor: progressBarColor }"></div>
  </div>
</template>

<script>
export default {
  props: ['mypassword'],
  data() {
    return {
      progressBarWidth: '0%',
      progressBarColor: 'red'
    }
  },
  watch: {
    mypassword(newVal) {
      this.passwordchecker(newVal)
    }
  },
  methods: {
    passwordchecker(passwordText) {
      console.log(passwordText)
      let strength = 0
      if (passwordText.length === 0) {
        this.progressBarWidth = '0%'
      }
      if (/[0-9]/.test(passwordText)) strength++
      if (/[a-z]/.test(passwordText)) strength++
      if (passwordText.length > 8) strength++
      if (/[A-Z]/.test(passwordText)) strength++
      if (/[!@#$%^&*()_+{}\\:;<>,.?~\\-]/.test(passwordText)) strength++

      this.progressBarWidth = `${(strength / 5) * 100}%`

      switch (strength) {
        case 1:
          this.progressBarColor = 'red'
          break
        case 2:
          this.progressBarColor = 'orangered'
          break
        case 3:
          this.progressBarColor = 'gold'
          break
        case 4:
          this.progressBarColor = 'deepskyblue'
          break
        case 5:
          this.progressBarColor = 'green'
          break
        default:
          this.progressBarColor = 'red'
      }
    }
  }
}
</script>

<style scoped>
.progress {
  height: 0.4rem;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 4rem;
}
.bar {
  height: 100%;
  border-radius: inherit;
  transition: width 0.4s ease-in-out;
}
</style>
