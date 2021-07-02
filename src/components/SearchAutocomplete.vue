<template>
  <div class="autocomplete">
    <input
      type="text"
      @input="onChange"
      :value="search"
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
      <li
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
      search.setSelectedCount(result.id);
      this.search = `url:${result.url}, 조회수:${result.count}`;
      this.isOpen = false;
    },
    filterResults() {
      const searchKey = this.search;
      this.results = search.filter(searchKey);
    },
    onChange($event) {
      this.search=$event.target.value;
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
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
        this.downScroll();
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.upScroll();
      }
    },
    onEnter() {
      search.setSelectedCount(this.results[this.arrowCounter].id);
      const result = this.results[this.arrowCounter];
      this.search = `url:${result.url}, 조회수:${result.count}`;
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    upScroll() {
      if (this.scrollLocation > 32) {
        this.scrollLocation = this.arrowCounter * 33;
      }
      //console.log('location', this.scrollLocation);
      //console.log('arrowCounter', this.arrowCounter);
      this.$refs.autocompleteResults.scrollTop = this.scrollLocation;
    },
    downScroll() {
      if (this.scrollLocation < 70) {
        this.scrollLocation = this.arrowCounter * 33;
      }
      //console.log('location', this.scrollLocation);
      //console.log('arrowCounter', this.arrowCounter);
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
