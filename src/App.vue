<template>

<!--main container-->
<div class="container mx-auto p-4">
  <div class="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
    <h1 class="mb-5 text-4xl text-center">Ideabox</h1>

<!--Add idea-->
<section class="mb-6">
      <form class="sm:flex">
        <input class="w-full p-3 sm:flex-auto" type="text" required placeholder="Add your idea"/>
        <input v-if="user" class="w-full p-2 bg-gray-600 text-white sm:flex-1" type="submit" value="Add idea"/>
      </form>
      <p class="users-actions" v-if="!user">
        Please <a @click="doLogin" href="#">login</a> first
      </p>
      <p class="users-actions" v-else> 
        Hi 👋{{ user.displayName }}.  <a @click="doLogout" href="#">logout</a>
      </p>
    </section>


    <AppIdea v-for="(idea, $index) in ideas" :key="$index" :idea="idea"/>


  </div>

</div>


</template>

<script>
import AppIdea from '@/components/AppIdea';
import seed from "@/seed.json";
import { ref } from "vue";
import { auth, firebase } from "@/firebase.js";

export default {
  name: "App",
  components: {
    AppIdea
  },
  setup(){
    const ideas = ref(seed.ideas);
    let user = ref(null);

    auth.onAuthStateChanged(async auth => (user.value = auth ?  auth : null));

    const doLogin = async ()=>{
      const provider = new firebase.auth.GoogleAuthProvider();

      try{
        await auth.signInWithPopup(provider);

      }catch(error){
        console.error(error);
      }
    }

    const doLogout = async ()=>{
      try{
        await auth.signOut();

      }catch(error){
        console.error(error);
      }

    }

    return { ideas, user, doLogin, doLogout}

  }
};
</script>

<style>
.users-actions{
  @apply mt-2 text-center;
}
.users-actions a{
  font-weight: bold;
  text-decoration: underline;
}
</style>
