<template>
  <div>
    <base-dialog :show="!!error" :title="'An error occurred'" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="!isLoading && hasRequests">
        <request-item
          v-for="item in receivedRequests"
          :key="item.id"
          :email="item.userEmail"
          :message="item.message"
        ></request-item>
      </ul>
      <h3 v-else>Inbox Empty!</h3>
    </base-card>
  </div>
</template>

<script>
  import RequestItem from '../../components/requests/RequestItem';
import BaseDialog from '../../components/ui/BaseDialog.vue';

  export default {
    components: {RequestItem,BaseDialog},
    data() {
      return {
        isLoading: false,
        error: null
      }
    },
    computed: {
      receivedRequests() {
        return this.$store.getters['requests/requests']
      },
      hasRequests() {
        return this.$store.getters['requests/hasRequests']
      }
    },
    methods: {
      async loadRequests() {
        this.isLoading = true;
        try {
          await this.$store.dispatch('requests/loadRequests');
        } catch(error) {
          this.error = new Error(error.message || 'Something went wrong');
        }
        this.isLoading = false;

      },
      handleError() {
        this.error = null
      }
    }
  }
</script>

<style scoped>
  header {
    text-align: center;
  }

  ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
  }

  h3 {
    text-align: center;
  }
</style>