<script>
  import localSheets from "../localSheets.js";
  import { link } from "svelte-routing";
  import { Button } from "sveltestrap";
</script>

<h1>CheckSheets</h1>
<ul>
  {#each localSheets as sheet, i (sheet.id)}
    <!-- content here -->
    <li>
      <a href={`/checksheets/${sheet.id}`} use:link>{sheet.title}</a>
      <a
        href={`/checksheets/${sheet.id}/edit`}
        class="btn btn-outline-success"
        use:link>
        Fill out
      </a>
      <a
        href={`/checksheets/${sheet.id}`}
        class="btn btn-outline-primary"
        use:link>
        History
      </a>

    </li>
  {/each}
</ul>
