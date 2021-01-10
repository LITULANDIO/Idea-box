<template>
   <!--Idea item-->
    <article class="p-3 mb-4 rounded-lg bg-gray-300 sm:flex sm:items-center opacity-100	">
         <img
            v-if="userIdea"
            @click="removeIdea"
            class="w-5 mr-3 cursor-pointer"
            src="@/assets/remove.svg"
            alt="Remove idea"
        />
      <section class="text-center sm:flex-1 sm:text-left" >
        <h2 class="text-xl sm:leading-6 sm:text-2xl">{{ idea.name }}</h2>
        <small>{{ idea.userName }}</small>
      </section>

<!--Vote-->
      <section class="pt-3 border-t-2 mt-6 border-black sm:pt-0 sm:pl-3 sm:border-t-0 sm:border-l-2 sm:mt-0 sm:flex sm:items-center">
        <h3 class="text-3xl font-bold text-center ml-3 mr-3">{{ idea.votes }}</h3>
        <nav v-if="user && !userVoted" class="flex justify-center sm:block">
          <img 
            @click="voteIdea(true)" 
            class="w-5 cursor-pointer" 
            src="@/assets/arrow-up.svg" 
            alt="Vote up" />

          <img 
            @click="voteIdea(false)" 
            class="w-5 cursor-pointer transform rotate-180" 
            src="@/assets/arrow-up.svg" 
            alt="Vote down" />
        </nav>
      </section>
    </article>
</template>

<script>
import { computed } from "vue";
export default {
    name: 'AppIdea',
    emits: ["vote-idea", "remove-idea"],
    props:{
        idea:{
            type: Object,
            required: true
        },
        user:{
            type:[Object, null]
        }
    },
    setup(props, { emit }){
        const voteIdea = (type)=>{
          return emit("vote-idea",{ type,id: props.idea.id });
        };
        const userIdea = computed( () => props.user && props.user.uid === props.idea.user);

        const userVoted = computed(() => {
            if (props.user.votes) {
                    return props.user.votes.find(item => item === props.idea.id);
            }
        });
        const removeIdea = () => {
            return emit("remove-idea", { name: props.idea.name, id: props.idea.id });
        }
        
        return { voteIdea, userVoted, userIdea, removeIdea };
    }
    

}
</script>

<style>



</style>