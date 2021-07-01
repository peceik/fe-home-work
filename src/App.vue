<template>
  <div id="app">
    <!-- <search-work msg="insert search keyword"/> -->
    <h1>insert search keyword</h1>
    <SearchAutocomplete />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import SearchWork from './components/SearchWork.vue'
import SearchAutocomplete from "./components/SearchAutocomplete.vue";

const tempItems = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pear",
  "Peach",
  "Grape",
  "Tangerine",
  "Pineapple",
  "ttt",
];

export default {
  name: "App",
  components: {
    SearchAutocomplete,
  },
  data() {
    return {
      temps: tempItems,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
