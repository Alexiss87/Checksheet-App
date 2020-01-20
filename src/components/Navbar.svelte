<script>
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "sveltestrap";
  import { link } from "svelte-routing";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
  console.log(window.location.href);
</script>

<Navbar color="primary" dark expand="md">
  <NavbarBrand href="/">CheckSheet App</NavbarBrand>
  <!-- <a class="navbar-brand" href="#">Navbar</a> -->
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      <NavItem>
        <!-- <NavLink href="/">Home</NavLink> -->
        <a href="/" use:link class="nav-link active">Home</a>
      </NavItem>
      <NavItem>
        <a href="/about" class="nav-link" use:link>About</a>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>
