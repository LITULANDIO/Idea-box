<template>

<!--main container-->
<div class="container mx-auto p-4">
  <div class="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
    <h1 class="mb-5 text-4xl text-center">Ideabox</h1>

<!--Add idea-->
<section class="mb-6">
      <form class="sm:flex">
        <input class="w-full p-3 sm:flex-auto" type="text" required placeholder="Add your idea"/>
        <input class="w-full p-2 bg-gray-600 text-white sm:flex-1" type="submit" value="Add idea"/>
      </form>
    </section>


    <AppIdea v-for="(idea, $index) in ideas" :key="$index" :idea="idea"/>


  </div>

</div>


</template>

<script>
import AppIdea from '@/components/AppIdea';
import seed from "@/seed.json";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    AppIdea
  },
  setup(){
    const ideas = ref(seed.ideas);

    return { ideas }

  }
};
</script>

<style>

</style>
