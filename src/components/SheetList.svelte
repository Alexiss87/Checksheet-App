<script>
  import ListItem from "./ListItem.svelte";
  import { Card, Col, Row } from "sveltestrap";

  export let sheets = [];
</script>


<Row>
  <Col>
    {#each sheets as sheet}
      <!-- content here -->
      <ListItem id={sheet.id} title={sheet.title} />
    {/each}
  </Col>
</Row>
