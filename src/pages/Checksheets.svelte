<script>
  import localSheets from "../localSheets.js";
  import { link } from "svelte-routing";
</script>

<h1>CheckSheets</h1>
<ul>
  {#each localSheets as sheet, i (sheet.id)}
    <!-- content here -->
    <li>
      <a href={`/checksheets/${sheet.id}`} use:link>{sheet.title}</a>
    </li>
  {/each}
</ul>
