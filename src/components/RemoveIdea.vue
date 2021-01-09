<template>
  <div class="w-full flex justify-center absolute top-40">
      <article class="w-3/4 p-4 bg-gray-400 shadow-2xl rounded-xl">  
        <p class="text-center text-xl mb-3">Remove {{ name }}?</p>
        <section class="flex justify-center">
            <button @click="$emit('remove-ok')" class="p-3 m-1 bg-red-500 text-white rounded-xl">Ok</button>
            <button @click="$emit('remove-cancel')" class="p-3 m-1 bg-gray-200 rounded-lg">Cancel</button>
        </section>
      </article>
  </div>
</template>

<script>
export default {
    name: 'RemoveIdea',
    emits: ["remove-ok", "remove-cancel"],
    props:{
        name:{
            type: String,
            required: true
        }
    }

}
</script>

<style>

</style>