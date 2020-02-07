<script>
  import ListItem from "./ListItem.svelte";
  import { Col, Row } from "sveltestrap";

  export let checksheets = [];

  //console.log("Sheets:" + checksheets);
</script>

<Row>
  <Col>
    {#each checksheets as sheet (sheet.id)}
      <ListItem id={sheet.id} title={sheet.Title} />
    {/each}
  </Col>
</Row>
