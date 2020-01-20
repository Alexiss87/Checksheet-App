<script>
  //components
  import Navbar from "./components/Navbar.svelte";
  // Router
  import { Router, Route, Link } from "svelte-routing";
  //pages
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";

  export let url = "";
</script>

<style>

</style>

<Router {url}>
  <Navbar />
  <main>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </main>
</Router>
