<template>
  <div>
    <header-image
      v-if="listing.images[0]"
      :image-url="listing.images[0]"
      :id = 'listing.id'
      @header-clicked="openModal"
    ></header-image>
    <div class="listing-container">
      <div class="heading">
        <h1>{{ listing.title }}</h1>
        <p>{{ listing.address }}</p>
      </div>
      <hr>
      <div class="about">
        <h3>About this listing</h3>
        <expandable-text>{{ listing.about }}</expandable-text>
      </div>
      <div class="lists">
        <feature-list title="Amenities" :items="listing.amenities">
          <template v-slot="{ item: amenty}">
            <i class="fa fa-lg" :class="amenty.icon"></i>
            <span>{{ amenty.title }}</span>
          </template>
        </feature-list>
        <feature-list title="Prices" :items="listing.prices">
          <template v-slot="{ item: price}">
            {{ price.title }}: <strong>{{ price.value }}</strong>
          </template>
        </feature-list>
      </div>
    </div>
    <modal-window ref="imagemodal">
      <image-carousel :images="listing.images"></image-carousel>
    </modal-window>
  </div>
</template>

<script>
  import { populateAmenitiesAndPrices } from '../js/helpers';

  import ImageCarousel from '../components/ImageCarousel.vue';
  import ModalWindow from '../components/ModalWindow.vue';
  import HeaderImage from '../components/HeaderImage.vue';
  import FeatureList from '../components/FeatureList.vue';
  import ExpandableText from '../components/ExpandableText.vue';

export default {
  computed: {
    listing() {
      return populateAmenitiesAndPrices(
        this.$store.getters.getListing(this.$route.params.listing)
      );
    }
  },
  methods: {
    assignData({ listing }) {
      Object.assign(this.$data, populateAmenitiesAndPrices(listing))
    },
    openModal () {
      this.$refs.imagemodal.modalOpen = true;
    }
  },
  components: {
    ImageCarousel,
    ModalWindow,
    HeaderImage,
    FeatureList,
    ExpandableText
  }
}
</script>

<style lang="css">
  .about {
    margin-bottom: 2em;
  }

  .about h3 {
    font-size: 22px;
  }

  .about p {
    white-space: pre-wrap;
  }

  .heading {
    margin-bottom: 2em;
  }

  .heading h1 {
    font-size: 32px;
    font-weight: 700;
  }
</style>
