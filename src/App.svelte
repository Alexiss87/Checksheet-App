<script>
  //components
  import Navbar from "./components/Navbar.svelte";
  // Router
  import { Router, Route, Link } from "svelte-routing";
  //pages
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Checksheets from "./pages/Checksheets.svelte";
  import ChecksheetTemplate from "./pages/ChecksheetTemplate.svelte";

  export let url = "";
</script>

<style>

</style>

<Router {url}>
  <Navbar />
  <main>
    <Route path="/" component={Home} />
    <Route path="/checksheets" component={Checksheets} />
    <Route path="/checksheets/:id" component={ChecksheetTemplate} />
    <Route path="/about" component={About} />
  </main>
</Router>
