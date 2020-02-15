<template>
  <div class="products" id="products">
    <div class="container">
      <h1 class="text-center p-5">Our Products List</h1>
      <div class="row">
        <div class="col-md-4" v-for="product in products">
          <div class="card product-item">
            <carousel :perPage="1">
              <slide v-for="(image, index) in product.images" :key="index.id">
                <img :src="image" class="card-img-top" alt="..." width="250px" />
              </slide>
              <!-- <slide>Slide 2 Content</slide> -->
            </carousel>

            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title d-flex">{{product.name}}</h5>
                <h5 class="card-price d-flex">{{product.price | currency}}</h5>
              </div>

              <!-- <p class="card-text" v-html="product.description"></p> -->
              <!-- <button class="btn btn-primary d-flex">Add to Cart</button> -->
              <add-to-cart
                :image="getImage(product.images)"
                :p-id="product.id"
                :name="product.name"
                :price="product.price"
              ></add-to-cart>
              <!-- <div class="d-flex justify-content-between"></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { db } from "../firebase";

export default {
  name: "Products-list",
  props: {
    msg: String
  },

  data() {
    return {
      products: []
    };
  },

  methods: {
    getImage(images) {
      return images[0];
    }
  },

  firestore() {
    return {
      products: db.collection("products")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}
</style>
