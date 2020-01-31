<script>
  import ListItem from "./ListItem.svelte";
  import { Col, Row } from "sveltestrap";

  export let sheets = [];
</script>

<Row>
  <Col>
    {#each sheets as sheet}
      <ListItem id={sheet.id} title={sheet.title} />
    {/each}
  </Col>
</Row>
