<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Edit Contact</p>
        <p class="fst-italic">
          Lorem ipsum sunt in nisi sint voluptate ut occaecat proident sint. Quis excepteur esse in ex in fugiat mollit ut adipisicing nisi anim culpa nulla id. Cupidatat ullamco veniam officia ullamco ea do in dolor quis deserunt magna in laboris veniam ea.
        </p>
      </div>
    </div>
  </div>

      <!-- Spinner -->
  <div v-if="loading">
    <div class="container">
      <div class="row">
        <div class="col">
          <LoadSpinner/>
        </div>
      </div>
    </div>
  </div>

  <!-- Error Message -->
  <div v-if="!loading && errorMessage">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h4 text-danger fw-bold">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>


  <div class="container mt-3" v-if="!loading && isDone()">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="updateSubmit()">
          <div class="mb-2">
            <input type="text" v-model="contact.name" class="form-control" placeholder="Name" required>
          </div>
          <div class="mb-2">
            <input type="text" v-model="contact.photo" class="form-control" placeholder="Photo url" required>
          </div>
          <div class="mb-2">
            <input type="email" v-model="contact.email" class="form-control" placeholder="Email" required>
          </div>
          <div class="mb-2">
            <input type="tel" v-model="contact.mobile" class="form-control" placeholder="Mobile" required>
          </div>
          <div class="mb-2">
            <input type="text" v-model="contact.company" class="form-control" placeholder="Company" required>
          </div>
          <div class="mb-2">
            <input type="text" v-model="contact.title" class="form-control" placeholder="Title" required>
          </div>
          <div class="mb-2">
            <select v-model="contact.groupId" class="form-control" v-if="groups.length > 0" required>
              <option value="">Select Group</option>
              <option :value="group.id" v-for="group of groups" :key="group.id">{{ group.name }}</option>
            </select>
          </div>
          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Update">
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img :src="contact.photo" alt="" class="contact-img">
      </div>
    </div>
  </div>
</template>

<script>
import {ContactService} from "@/services/ContactService";
import LoadSpinner from '@/components/LoadSpinner.vue';

  export default{
    name: 'EditContact',
    components: {LoadSpinner},
    data: function(){
      return {
        contactId : this.$route.params.contactId,
        loading: false,
        contact : {
          name : '',
          company : '',
          email : '',
          title: '',
          mobile: '',
          photo: '',
          groupId: ''
        },
        errorMessage: null,
        groups: [],
      }
    },
    created: async function(){
      try{
        this.loading = true;
        let response = await ContactService.getContact(this.contactId);
        let groupResponse = await ContactService.getAllGroups();
        this.contact = response.data;
        this.groups = groupResponse.data; 
        this.loading = false;
      }
      catch(error){
        this.errorMessage = error;
        this.loading = false;
      }
    },
    methods: {
      isDone: function(){
        return Object.keys(this.contact).length > 0 && Object.keys(this.groups).length > 0;
      },
      updateSubmit: async function(){
        try{
          let response  = await ContactService.updateContact(this.contact, this.contactId);
          if(response){
            return this.$router.push('/');
          }
          else{
            return this.$router.push('/contacts/edit/${this.contactId}');
          }
        }
        catch(error){
          console.log(error);
        }
      }
    }
  }
</script>
<style scoped>

</style>
