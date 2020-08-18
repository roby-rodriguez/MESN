<script>
  import Navbar from "../../components/Navbar.svelte";
  import Snackbar from "../../components/Snackbar.svelte";
  import { TextField, Button } from "smelte";
  import { navigate } from 'svelte-routing';

  import * as auth from "../../api/auth.js";

  let user = { name: "", email: "", password: "" };
  let nameError = false;
  let emailError = false;
  let passwordError = false;
  let formValid = true;
  let snackbar = {};

  async function signUp() {
    if (validateForm()) {
      try {
        const response = await auth.signUp(user);
        if (response.status == 400) {
          snackbar = {
            value: true,
            color: "error",
            message: response.data.message,
          };
        } else {
          localStorage.setItem("token", response);
	  navigate('/products', { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function validateForm() {
    formValid = true;
    validateName();
    validateEmail();
    validatePasswod();
    return formValid;
  }

  function validateName() {
    if (user.name == "") {
      nameError = "Name is required";
      formValid = false;
    }
  }

  function validateEmail() {
    if (user.email == "") {
      emailError = "E-mail is required";
      formValid = false;
    } else if (!/.+@.+\..+/.test(user.email)) {
      emailError = "E-mail must be valid";
      formValid = false;
    }
  }
  function validatePasswod() {
    if (user.password == "") {
      passwordError = "Password is required";
      formValid = false;
    }
  }
</script>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>
<Navbar />
<div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 p-8">
  <div class="col-span-1 sm:col-start-2 md:col-start-2">
    <div class="border-dotted border-2 border-gray-600 rounded p-8">
      <form on:submit|preventDefault={signUp}>
        <div class="mb-8">
          <TextField
            on:input={() => (nameError = false)}
            bind:value={user.name}
            outlined
            append="account_circle"
            label="Name"
            error={nameError} />
        </div>
        <div class="mb-8">
          <TextField
            on:input={() => (emailError = false)}
            bind:value={user.email}
            outlined
            append="alternate_email"
            label="E-mail"
            error={emailError} />
        </div>
        <div class="mb-8">
          <TextField
            bind:value={user.password}
            error={passwordError}
            on:input={() => (passwordError = false)}
            outlined
            append="lock"
            label="Password"
            type="password" />
        </div>
        <Button block color="dark" type="submit">Sign Up</Button>
      </form>
    </div>
  </div>
</div>

<Snackbar {snackbar}/>
