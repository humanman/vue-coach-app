<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{invalid: !email.isValid}">
        <label for="email">Your Email</label>
        <input id="email" type="email" v-model.trim="email.val" @blur="clearValidation('email')"/>
        <p v-if="!email.isValid" class="errors">Please enter a valid email address</p>
      </div>
      <div class="form-control" :class="{invalid: !message.isValid}">
        <label for="message">Message</label>
        <textarea id="message" v-model.trim="message.val" rows="5" @blur="clearValidation('message')"/>
        <p v-if="!message.isValid" class="errors">Please add a message</p>
      </div>
      <div class="actions">
        <base-button @click="validateForm">Submit Message</base-button>
      </div>
    </form>
    <div v-if="postSubmit">
      <h3>Your message has been sent!</h3>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true
      },
      message: {
        val: '',
        isValid: true
      },
      formIsValid: true,
      postSubmit: false
    }
  },
  mounted() {
    this.postSubmit = false
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.email.val.length == 0 || !this.email.val.includes('@')){
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.val.length == 0 ){
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },
    clearValidation(field) {
      this[field].isValid = true;
    },
    submitForm(){
      if(!this.formIsValid) return false
      const formData = {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id
      }
      this.$store.dispatch('requests/contactCoach', formData)
      // this.email.val = ''
      // this.message.val = ''
      // this.postSubmit = true
      this.$router.replace('/coaches');
    }
  }
}
</script>

<style scoped>
  form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
  }

  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
  }

  input:focus,
  textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
  }

  .errors {
    font-weight: bold;
    color: red;
  }

  .actions {
    text-align: center;
  }
</style>