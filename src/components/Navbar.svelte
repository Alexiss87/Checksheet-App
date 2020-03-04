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
  import Links from "../constants/Links";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
  //console.log(window.location.href);
</script>

<Navbar color="primary" dark expand="md">
  <NavbarBrand href="/">CheckApp</NavbarBrand>
  <!-- <a class="navbar-brand" href="#">Navbar</a> -->
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      {#each Links as navLink}
        <!-- content here -->
        <NavItem>
          <!-- TODO active link -->
          <a href={navLink.url} use:link class="nav-link active">
            {navLink.text}
          </a>
        </NavItem>
      {/each}
    </Nav>
  </Collapse>
</Navbar>
