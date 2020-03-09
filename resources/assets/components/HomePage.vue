<template>
  <div class="home-container">
    <listing-summary-group
      v-for="(group, country) in listing_groups"
      :key="country"
      :country="country"
      :listings="group"
      class="listing-summary-group"
    ></listing-summary-group>
  </div>
</template>

<script>
  import { groupByCountry } from '../js/helpers';
  import ListingSummary from './ListingSummary';
  import ListingSummaryGroup from './ListingSummaryGroup';

  import axios from 'axios';

  export default {
    computed: {
      listing_groups() {
        return groupByCountry(this.$store.state.listing_summaries);
      }
    },
    methods: {
      assignData({ listings }) {
        this.listing_groups = groupByCountry(listings)
      }
    },
    components: {
      ListingSummary,
      ListingSummaryGroup
    }
  }
</script>

<style>
</style>
