<template>
  <div class="autocomplete">
    <h1>{{ msg }}</h1>
    <Dropdown
      :options="[
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
        { id: 4, name: 'Option 4' },
        { id: 5, name: 'Option 5' },
        { id: 6, name: 'test 5' },
        { id: 7, name: 'test 7' },
      ]"
      v-on:selected="validateSelection"
      v-on:filter="getDropdownValues"
      :disabled="false"
      name="drop"
      :maxItem="10"
      placeholder="Please select an option"
    >
    </Dropdown>
  </div>
</template>

<script>
import Dropdown from "vue-simple-search-dropdown";
export default {
  name: "SearchWork",
  props: {
    msg: String,
  },
  components: {
    Dropdown,
  },
  methods: {
    validateSelection(selectedValue) {
      console.log("valid", selectedValue);
    },
    getDropdownValues(searchKeyword) {
      console.log("filter", searchKeyword);
      const returnList = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 5, name: "Option 5" },
      ];
      return returnList;
    },
  },
};
</script>
