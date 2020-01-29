<script>
  import localSheets from "../localSheets.js";
  import { link } from "svelte-routing";
  import { Button } from "sveltestrap";
  import SheetList from "../components/SheetList.svelte";
</script>

<h1>CheckSheets</h1>
<SheetList sheets={localSheets} />
