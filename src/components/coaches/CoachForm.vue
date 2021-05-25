<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !firstName.isValid}">
      <label for="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" v-model.trim="firstName.val" @blur="clearValidity('firstName')"/>
      <p v-if="!firstName.isValid" class="invalid">Please include your first name</p>
    </div>
    <div class="form-control" :class="{invalid: !lastName.isValid}">
      <label for="LastName">Last Name</label>
      <input id="LastName" name="lastName" type="text" v-model.trim="lastName.val" @blur="clearValidity('lastName')"/>
      <p v-if="!lastName.isValid" class="invalid">Please include your last name</p>
    </div>
    <div class="form-control" :class="{invalid: !description.isValid}">
      <label for="description">Description</label>
      <textarea id="description" name="description" rows="5" v-model.trim="description.val" @blur="clearValidity('description')"/>
      <p v-if="!description.isValid" class="invalid">Please include a description</p>
    </div>
    <div class="form-control" :class="{invalid: !rate.isValid}">
      <label for="rate">Hourly Rate</label>
      <input id="rate" name="rate" type="number" v-model.number="rate.val" @blur="clearValidity('rate')"/>
      <p v-if="!rate.isValid" class="invalid">Please include an hourly rate that is greater than 0</p>
    </div>
    <div class="form-control" :class="{invalid: !areas.isValid}">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" name="area" value="frontend" v-model="areas.val" @blur="clearValidity('areas')"/>
        <label for="frontend">Front End Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" name="area" value="backend" v-model="areas.val" @blur="clearValidity('areas')"/>
        <label for="backend">Back End Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" name="area" value="career" v-model="areas.val" @blur="clearValidity('areas')"/>
        <label for="career">Career Development</label>
      </div>
      <p v-if="!areas.isValid" class="invalid">Please select at least one area of expertise</p>
    </div>
    <p v-if="!formIsValid" class="invalid">Please fix above errors</p>
    <base-button type="submit" id="submit" @click="validateForm">Register</base-button>
  </form>
</template>

<script>
  export default {
    emits: ['save-data'],
    data() {
      return {
        formIsValid: true,
        firstName: {
          val: '',
          isValid: true
        },
        lastName: {
          val: '',
          isValid: true
        },
        description: {
          val: '',
          isValid: true
        },
        rate: {
          val: null,
          isValid: true
        },
        areas:  {         
          val: [],
          isValid: true
        },
      }
    },
    methods: {
      clearValidity(input) {
        this[input].isValid = true;
      },
      validateForm() {
        this.formIsValid = true;
        if (this.firstName.val === '') {
          this.firstName.isValid = false;
          this.formIsValid = false
        }
        if (this.lastName.val === '') {
          this.lastName.isValid = false;
          this.formIsValid = false
        }
        if (this.description.val === '') {
          this.description.isValid = false;
          this.formIsValid = false
        }
        if (this.rate.val === '' || this.rate.val < 0 || Number.isNaN(this.rate.val)) {
          this.rate.isValid = false;
          this.formIsValid = false
        }
        if (this.areas.val.length === 0) {
          this.areas.isValid = false;
          this.formIsValid = false
        }
      },
      submitForm(){
        if (this.formIsValid) {
          const formData = {
            first: this.firstName.val,
            last: this.lastName.val,
            desc: this.description.val,
            rate: this.rate.val,
            areas: this.areas.val
          };
          this.$emit('save-data', formData);
        }
      }
    }
  }
</script>
<style scoped>
  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type='checkbox'] + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
  }

  input:focus,
  textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
  }

  input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
  }

  input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  .invalid {
    color: red;
  }

  .invalid input,
  .invalid textarea {
    border: 1px solid red;
  }
</style>