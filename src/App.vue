<template>

<!--main container-->
<div class="container mx-auto p-4">
  <div class="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
    <h1 class="mb-5 text-4xl text-center">Ideabox</h1>

    <AddIdea :user="user" @do-login="doLogin" @do-logout="doLogout" @add-idea="addIdea"/>

    <AppIdea v-for="(idea, $index) in ideas" :key="$index" :idea="idea"/>


  </div>

</div>


</template>

<script>
import AppIdea from '@/components/AppIdea';
import AddIdea from '@/components/AddIdea';
import { ref } from "vue";
import { auth, firebase, db } from "@/firebase.js";

export default {
  name: "App",
  components: {
    AppIdea,
    AddIdea
  },
  setup(){
    const ideas = ref([]);
    let user = ref(null);

    auth.onAuthStateChanged(async auth => (user.value = auth ?  auth : null));

    db.collection("ideas").onSnapshot(snapshot =>{
      const newIdeas = [];

      snapshot.docs.forEach(doc => {
        let { name, user, userName, votes } = doc.data();
        let id = doc.id;

        newIdeas.push({
          name,
          user,
          userName,
          votes,
          id
        });
      });
      ideas.value = newIdeas;
    },
    error =>console.error(error)
    );

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

    const addIdea = async (data) =>{
      try{
        await db.collection("ideas").add({
          name: data.value,
          user: user.value.uid,
          userName: user.value.displayName,
          votes: 0
        })
      }catch(error){
        console.log(error)
      }

    }

    return { ideas, user, doLogin, doLogout, addIdea}

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
