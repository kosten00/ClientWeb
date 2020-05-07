<template>
  <div class="home">
    <Form/>
    <List/>
  </div>
</template>

<script>
  import Form from '../components/Form';
  import List from '../components/List';

  export default {
    name: 'Home',
    components: { Form, List }
  }
</script>
