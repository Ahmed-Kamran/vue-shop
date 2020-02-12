<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <div class="product-test">
        <h3 class="d-inline-block">Products list</h3>
        <button @click="addNew" class="btn btn-primary float-right">Add Product</button>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Tag</th>
                <th>Price</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products">
                <td>{{product.name}}</td>
                <!-- <td>{{product.image}}</td> -->
                <!-- :src="'/public/img/' + item.name" -->
                <!-- v-for="(image, index) in product.images" -->
                <td>
                  <!-- <img :src="product.images" class="img-thumbnail" /> -->
                  <carousel
                    :perPage="1"
                    :paginationEnabled="false"
                    :navigationEnabled="true"
                    :navigationClickTargetSize="0"
                  >
                    <slide v-for="(image, index) in product.images" :key="index.id">
                      <img
                        :src="image"
                        class="align-self-center img-responsive"
                        width="100px"
                        height="50px"
                      />
                    </slide>
                    <!-- <slide>Slide 2 Content</slide> -->
                  </carousel>
                </td>
                <td>{{product.tags}}</td>

                <td>{{product.price}}</td>

                <td>
                  <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
                  <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->

    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'">Edit Product</h5>
            <h5 class="modal-title" id="editLabel" v-if="modal == 'new'">Save Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <!-- <vue-editor v-model="product.description"></vue-editor> -->
                  <vue-editor v-model="product.description"></vue-editor>
                  <!-- <VueEditor v-model="product.description"></VueEditor> -->

                  <!-- <textarea name="description" v-model="product.description" id="" class=form-control cols="30" rows="10"></textarea> -->
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr />

                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product price"
                    v-model="product.price"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    @keyup.188="addTag"
                    placeholder="Product tags"
                    v-model="tag"
                    class="form-control"
                  />

                  <div class="d-flex">
                    <p v-for="tag in product.tags">
                      <span class="p-1">{{tag}}</span>
                    </p>
                  </div>
                </div>

                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input @change="uploadImage" type="file" class="form-control" />
                </div>

                <div class="form-group d-flex">
                  <!-- <div class="p-1" v-for="(image, index) in product.images"> -->
                  <div class="p-1" v-for="(image, index) in product.images">
                    <div class="img-wrapp">
                      <img :src="image" alt class="img-thumbnail" />
                      <span class="delete-img" @click="deleteImage(image,index)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              @click="addProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >Add Product</button>
            <button
              @click="updateData()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >Update changes</button>
            <!-- <button  @click="" type="button" class="btn btn-primary" >Apply changes</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { VueEditor, Quill } from "vue2-editor";
import { VueEditor } from "vue2-editor";
import { fb, db } from "../firebase";

export default {
  name: "Products",
  components: { VueEditor },
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      },
      activeItem: null,
      modal: null,
      tag: null
      // images:null
    };
  },
  firestore() {
    return {
      // Collection
      products: db.collection("products")
      // Doc
      // ford: firestore.collection('cars').doc('ford')
    };
  },
  methods: {
    // getImage(images) {
    //   return images[0];
    // },
    deleteImage(img, index) {
      let imaged = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      imaged
        .delete()
        .then(() => {
          console.log("image Delated");
        })
        .catch(error => {
          console.log("an error occurred");
        });
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },

    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        var storageRef = fb
          .storage()
          .ref("products/" + Math.random() + "_" + file.name);
        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            //   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log("File available at", downloadURL);
              this.product.images.push(downloadURL);
            });
          }
        );
      }
    },
    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      };
    },
    addNew() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },

    updateData() {
      // this.$firestore.products.doc(doc['.key']).update(this.product);
      this.$firestore.products.doc(this.product.id).update(this.product);
      $("#product").modal("hide");

      Toast.fire({
        icon: "success",
        title: "Product Updated successfully"
      });
    },

    editProduct(product) {
      this.modal = "edit";
      //  this.activeItem = product['.key'];
      this.product = product;
      $("#product").modal("show");
    },

    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete();

          Toast.fire({
            icon: "success",
            title: "Product Delated successfully"
          });
        }
      });
    },

    readData() {},

    addProduct() {
      this.$firestore.products.add(this.product);
      $("#product").modal("hide");
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
  color: red;
  font-weight: 10px;
}
</style>
