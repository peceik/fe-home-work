<template>
  <div class="autocomplete">
    <input
      type="text"
      @input="onChange"
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      class="search-input"
    />
    <ul
      id="autocomplete-results"
      v-show="isOpen"
      class="autocomplete-results"
      ref="autocompleteResults"
    >
      <li class="loading" v-if="isLoading">
        Loading results...
      </li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result.view }}
      </li>
    </ul>
  </div>
</template>

<script>
import search from "../service/search.js";

export default {
  name: "SearchAutocomplete",
  props: {
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      isLoading: false,
      arrowCounter: -1,
      scrollLocation: 0,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    setResult(result) {
      console.log("setResult", result);
      search.setSelectedCount(result.id);
      this.search = `${result.url}=====>${result.count}`;
      this.isOpen = false;
    },
    filterResults() {
      console.log("filter", this.search);
      // this.results = this.items.filter((item) => {
      //   return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      // });
      const searchKey = this.search;
      this.results = search.filter(searchKey);
    },
    isResult(item, key) {
      key = key.toLowerCase();

      // 내포되지 않은 경우
      // item.name
      if (item.name.toLowerCase().indexOf(key) > -1) {
        return true;
      }
      // item.category
      if (item.category.toLowerCase().indexOf(key) > -1) {
        return true;
      }
      // item.content
      if (item.content.toLowerCase().indexOf(key) > -1) {
        return true;
      }
      // item.tag
      if (
        item.tags.findIndex((it) => {
          return it.toLowerCase().indexOf(key) > -1;
        }) > -1
      ) {
        return true;
      }

      //내포된 경우

      return false;
    },
    //   onChange() {
    //     this.$emit('input', this.search);

    //     if (this.isAsync) {
    //       this.isLoading = true;
    //     } else {
    //       this.filterResults();
    //       this.isOpen = true;
    //     }
    //   },
    onChange($event) {
      this.$emit("input", $event.target.value);
      console.log("onchange");

      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
        this.isOpen = true;
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
        this.scrollLocation = 0;
      }
    },
    onArrowDown() {
      // console.log(this.$refs.autocompleteResults.clientHeight);
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
        this.downScroll();
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.$refs.autocompleteResults.scrollTop = 0;
        this.upScroll();
      }
    },
    onEnter() {
      search.setSelectedCount(this.results[this.arrowCounter].id);
      const result = this.results[this.arrowCounter];
      this.search = `${result.url}=====>${result.count}`;
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    upScroll() {
      if (this.scrollLocation > 32) {
        this.scrollLocation -= 33;
      }
      this.$refs.autocompleteResults.scrollTop = this.scrollLocation;
    },
    downScroll() {
      if (this.scrollLocation < 70) {
        this.scrollLocation += 33;
      }
      this.$refs.autocompleteResults.scrollTop = this.scrollLocation;
    },
  },
};
</script>

<style>
.autocomplete {
  /* position: relative;
  width: 300px; */
  width: 500px;
  margin: 0 auto;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 70px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
.search-input {
  font-size: 15pt;
  height: 42px;
  width: 500px;
}
</style>
