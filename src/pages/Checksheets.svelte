<script>
  // import localSheets from "../localSheets.js";
  import sheets from "../stores/checksheets";
  import SheetList from "../components/SheetList.svelte";

  // $: localsheets = $sheets;
</script>

<h1>CheckSheets</h1>
<SheetList sheets={$sheets} />
