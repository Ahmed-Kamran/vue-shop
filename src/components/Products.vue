<template>
    <div class="products">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Products Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="/img/svg/products.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div>

          <hr>

          <!-- <div class="product-test">


            <h3 class="d-inline-block">Products list</h3>
            <button  class="btn btn-primary float-right">Add Product</button>

            <div class="table-responsive">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Modify</th>
                    </tr>
                  </thead>

                  <tbody>
                      <tr v-for="product in products">
                      
                        <td>
                          {{product.name}}
                        </td>

                        <td>
                          {{product.price}}
                        </td>

                        <td>

                          <button class="btn btn-primary" >Edit</button>
                          <button class="btn btn-danger" >Delete</button>
                        </td>

                      </tr>


                  </tbody>
                </table>
            </div>

          </div> -->


          <h3>Basic CRUD System in Firebase and vue</h3>
          <div class="product-test">
            <div class="from-group">
              <input type="text" placeholder="Product Name" v-model="name" class="from-control">
            </div>

             <div class="from-group">
              <input type="text" placeholder="Price" v-model="price" class="from-control">
            </div>

             <div class="from-group">
              <button class="btn btn-primary" @click="saveData">Save Data</button>          
            </div>
          </div>
      </div>

      <!-- Modal -->

      <!-- <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row"> -->



                  <!-- main product -->



                  <!-- <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name"  class="form-control">
                    </div>

                    <div class="form-group"> -->


                      <!-- <vue-editor v-model="product.description"></vue-editor> -->


                    <!-- </div>
                  </div> -->
                  <!-- product sidebar -->
                  <!-- <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price"  class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text"  placeholder="Product tags"  class="form-control">
                      
                      <div  class="d-flex"> -->
                        <!-- <p v-for="tag in product.tags"> -->
                        <!-- <p >
                            <span class="p-1"></span>
                        </p>

                      </div>
                    </div> -->


                    <!-- <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file"  class="form-control">
                    </div>

                    <div class="form-group d-flex"> -->
                      <!-- <div class="p-1" v-for="(image, index) in product.images"> -->
                      <!-- <div class="p-1" >
                          <div class="img-wrapp">
                              <img  alt="" width="80px">
                              <span class="delete-img" >X</span>
                          </div>
                      </div>
                    </div>

                  </div>
                </div> -->




            <!-- </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button  type="button" class="btn btn-primary" >Save changes</button>
              <button type="button" class="btn btn-primary" >Apply changes</button>
            </div>
          </div>
        </div>
      </div> -->


    
  </div>
</template>

<script>
export default {
  name: "Products",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}

</style>
