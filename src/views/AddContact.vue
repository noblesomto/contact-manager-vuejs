<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Add Contact</p>
        <p class="fst-italic">
          This command will install and execute create-vue, the official Vue project scaffolding tool. You will be presented with prompts for a number of optional features such as TypeScript and testing support:
        </p>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="submitCreate()">
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
            <input type="submit" class="btn btn-success" value="Create">
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

  export default{
    name: 'AddContact',
    data: function(){
      return{
        contact : {
          name : '',
          company : '',
          email : '',
          title: '',
          mobile: '',
          photo: '',
          groupId: ''
        },
        groups: []
      }
    },
    created: async function(){
      try{
        let response = await ContactService.getAllGroups();
        this.groups = response.data;
      }
      catch(error){
        console.log(error);
      }
    },
    methods : {
      submitCreate: async function(){
        try{
          let response  = await ContactService.createContact(this.contact);
          if(response){
            return this.$router.push('/');
          }
          else{
            return this.$router.push('/contacts/add');
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
