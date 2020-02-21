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
  import ChecksheetEditTemplate from "./pages/ChecksheetEditTemplate.svelte";
  import ChecksheetForm from "./pages/ChecksheetForm.svelte";

  import { Col, Container, Row } from "sveltestrap";

  export let url = "";
</script>

<style>
  .bg_color {
    background-color: #d7dfea;
  }
</style>

<Router {url}>
  <Navbar />
  <Container classname="bg_color">
    <main>
      <Route path="/" component={Home} />
      <Route path="/checksheets" component={Checksheets} />
      <Route path="/checksheets/:id" component={ChecksheetTemplate} />
      <Route path="/checksheets/:id/edit" component={ChecksheetEditTemplate} />
      <Route path="/build" component={ChecksheetForm} />
      <Route path="/about" component={About} />
    </main>
  </Container>
</Router>
