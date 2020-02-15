<template>
  <div class="minicart">
    <!-- Modal -->
    <div
      class="modal fade"
      id="miniCart"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">My Bag</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul>
              <li v-for="item in this.$store.state.cart" class="media">
                <img :src="item.productImage" width="80px" class="align-self-center mr-3" />
                <div class="media-body">
                  <h3 class="mt-0 d-flex">{{item.productName}}</h3>
                  <span
                    class="float-right mr-5 del_item"
                    @click="$store.commit('removeFromCart',item)"
                    style="cursor:pointer;"
                  >X</span>
                  <h4 class="mt-0 d-flex">{{item.productPrice | currency}}</h4>
                  <p class="mt-0 d-flex">Quantity : {{item.productQuantity}}</p>
                </div>

                <!-- <div class="mt-5">
                  <h4>Total: {{item.productQuantity}} x {{item.productPrice | currency}}</h4>
                </div>-->
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Contiune Shopping</button>
            <button type="button" class="btn btn-primary" @click="checkout">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniCart",
  props: {
    msg: String
  },
  methods: {
    checkout() {
      $("#miniCart").modal("hide");
      this.$router.push("/checkout");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.del_item {
  border: 1px solid black;
  padding: 4px 5px 4px 5px;
}
.del_item:hover {
  color: white;
  background: red;
  transition-duration: 0.5s;
}
</style>
