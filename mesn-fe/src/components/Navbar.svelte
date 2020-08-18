<script>
  import { AppBar, Image, Button, Icon } from "smelte";
  import { links, navigate } from "svelte-routing";

  let token = localStorage.getItem("token");

  function showMenu() {
    let menu = document.querySelector("#menu");
    menu.classList.toggle("hidden");
  };

  function signOut() {
    localStorage.clear();
    navigate("/", {replace: true});
  }
</script>

<div class="mb-20" use:links>
  <AppBar class="bg-dark-700 p-3">
    <a href="/products" class="mr-4 inline-flex items-center">
      <Image src="favicon.png" class="h-12 w-auto" />
      <span class="text-xl text-white font-bold">MATTWEB</span>
    </a>
    <Button
      fab
      class="inline-flex ml-auto lg:hidden"
      on:click={showMenu}>
      <Icon color="white">menu</Icon>
    </Button>
    <div
      class="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
      id="menu">
      {#if token}
        <div
          class="text-gray-400 lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto
          w-full lg:items-center items-start flex flex-col lg:h-auto">
          <a
            href="/products"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded
            items-center justify-center hover:bg-gray-900">
            <span>Products</span>
          </a>
          <a
            href="/orders"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded
            items-center justify-center hover:bg-gray-900">
            <span>Orders</span>
          </a>
	  <a
            href="/make-order"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded
            items-center justify-center hover:bg-gray-900">
            <span>Make an order</span>
          </a>
	  <Button on:click="{signOut}" color="gray" outlined small class="ml-3">sign out</Button>
        </div>
      {:else}
        <div
          class="text-gray-400 lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto
          w-full lg:items-center items-start flex flex-col lg:h-auto">
          <a
            href="/signin"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded
            items-center justify-center hover:bg-gray-900">
            <span>Sign In</span>
          </a>
          <a
            href="/signup"
            class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded
            items-center justify-center hover:bg-gray-900">
            <span>Sign Up</span>
          </a>
        </div>
      {/if}
    </div>
  </AppBar>
</div>
