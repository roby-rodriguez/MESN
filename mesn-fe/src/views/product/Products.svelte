<script>
  import Navbar from "../../components/Navbar.svelte";
  import Snackbar from "../../components/Snackbar.svelte";
  import { Card, Button, Image, Dialog, TextField } from 'smelte';
  import { onMount } from 'svelte';
  import { getProducts, createProduct, readProduct, updateProduct, deleteProduct } from '../../api/product.js';
  import { apiURL, isLoggedIn } from '../../store.js';

  let productsList = [];
  let product = {name: "", uprice: "", image: ""};
  let dialog = false;
  let form = false; // true for create and false for update a product
  let snackbar = {};

  let formValid = true;
  let nameError = false;
  let upriceError = false;

  onMount(async () => {
    isLoggedIn();
    try {
      productsList = await getProducts();
    } catch (error) {
      console.log(error);
    }
  });

  async function sendProduct() {
    if(validateForm()) {
      try {
	form? addProduct() : editProduct();
	resetForm();
      } catch (error) {
	console.log(error);
      }
    }
  };

  async function addProduct() {
    const productToAdd = new FormData();
    productToAdd.append("name", product.name);
    productToAdd.append("uprice", product.uprice);
    productToAdd.append("image", product.image);
    const response = await createProduct(productToAdd);
    productsList = [...productsList, response.product];
    snackbar = {
      value: true,
      color: 'success',
      message: response.message
    };
  };

  async function editProduct() {
    const id = product._id;
    const productToEdit = new FormData();
    productToEdit.append("name", product.name);
    productToEdit.append("uprice", product.uprice);
    productToEdit.append("image", product.image);
    const response = await updateProduct(id, productToEdit);
    const index = productsList.findIndex(p => p._id == id);
    const newProductsList = productsList.slice(0);
    newProductsList[index] = response.updatedProduct;
    productsList = newProductsList;
    snackbar = {
      value: true,
      color: 'success',
      message: response.message
    };
  };

  async function removeProduct(id) {
    try {
      const response = await deleteProduct(id);
      const index = productsList.findIndex(p => p._id == id);
      const newProductsList = productsList.slice(0);
      newProductsList.splice(index, 1);
      productsList = newProductsList;
      snackbar = {
	value: true,
	color: 'success',
	message: response.message
      };
    } catch (error) {
      console.log(error);
    }
  };

  function openAddForm() {
    form = true;
    dialog = true;
  };

  async function openEditForm(id) {
    form = false;
    product = await readProduct(id);
    dialog = true;
  }

  function resetForm() {
    product = {name: "", uprice: "", image: ""};
    dialog = false;
  }

  function validateForm() {
    formValid = true;
    validateName();
    validateUprice();
    validateImage();
    return formValid;
  };

  function validateName() {
    if (product.name == "") {
      nameError = "Name is required";
      formValid = false;
    }
  };

  function validateUprice() {
    if (product.uprice == "") {
      upriceError = "Unit price is required";
      formValid = false;
    } else if(isNaN(product.uprice)) {
      upriceError = "Unit price must be a number";
      formValid = false;
    }
  };

  function validateImage() {
    if(product.image == "") {
      snackbar = {
      value: true,
      color: 'error',
      message: "Please choose a image for the product"
      };
      formValid = false;
    }
  };

</script>

<svelte:head>
  <title>Products</title>
</svelte:head>
<Navbar/>
  <div class="fixed right-0 bottom-0 m-3">
    <Button color="alert" icon="add" on:click="{openAddForm}"></Button>
  </div>
<h3 class="ml-12 font-serif">My products</h3>
<div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 m-12">
  {#each productsList as {_id, name, image, uprice}}
    <Card.Card>
      <Image class="w-full" src={$apiURL + image}/>
      <div class="m-3"><b>Name: </b>{name} <br> <b>Price: </b>${uprice}</div>
      <div class="p-2 absolute grid grid-cols-2 gap-1">
	<Button on:click="{() => (openEditForm(_id))}" color="gray" icon="edit" small/>
	<Button on:click="{() => (removeProduct(_id))}" color="dark" icon="delete" small/>
      </div>
    </Card.Card>
  {/each}
</div>
<Dialog bind:value={dialog}>
    <form on:submit|preventDefault={sendProduct}>
        <div class="mb-8">
          <TextField
            on:input={() => (nameError = false)}
            bind:value={product.name}
            outlined
            append="add_shopping_cart"
            label="Name"
	    error={nameError}
	    />
        </div>
        <div class="mb-8">
          <TextField
            on:input={() => (upriceError = false)}
            bind:value={product.uprice}
            outlined
            append="attach_money"
            label="Unit price"
	    error={upriceError}
	    />
        </div>
        <div class="mb-8">
          <input
	    accept="image/png, .jpeg, .jpg, image/gif"
	    type="file" 
	    on:change="{(e) => (product.image = e.target.files[0])}"
	    />
        </div>
	{#if form} <!-- Add form -->
	  <Button block color="alert" type="submit">add</Button>
	{:else}  <!-- Edit form -->
	  <Button block color="gray" type="submit">edit</Button>
	{/if}
      </form>
</Dialog>
<Snackbar {snackbar}/>
