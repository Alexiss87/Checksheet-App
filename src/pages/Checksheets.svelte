<script>
  // import localSheets from "../localSheets.js";
  import checksheets from "../stores/checksheets";
  import SheetList from "../components/SheetList.svelte";

  import ListItem from "../components/ListItem.svelte";
  import { Col, Row } from "sveltestrap";
  import { get } from "svelte/store";

  //$: console.log(checksheets);
  $: console.log(checksheets);
  //$: store_value = checksheets;

  // $: localsheets = $sheets;
</script>

{#if $checksheets}
  <h1>CheckSheets</h1>
  <SheetList checksheets={$checksheets} />
{:else}
  <h1>Loading</h1>
{/if}
