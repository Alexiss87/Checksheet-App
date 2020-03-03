<script>
  //components
  import Navbar from "./components/Navbar.svelte";
  // Router
  import { Router, Route, Link } from "svelte-routing";
  //pages
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Checksheets from "./pages/Checksheets.svelte";
  import ChecksheetHistory from "./pages/ChecksheetHistory.svelte";
  import ChecksheetInspection from "./pages/ChecksheetInspection.svelte";
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
  <Container class="bg_color">
    <main>
      <Route path="/" component={Home} />
      <Route path="/checksheets" component={Checksheets} />
      <Route path="/checksheets/:id/history" component={ChecksheetHistory} />
      <Route path="/checksheets/:id/inspect" component={ChecksheetInspection} />
      <Route path="/build" component={ChecksheetForm} />
      <Route path="/about" component={About} />
    </main>
  </Container>
</Router>
