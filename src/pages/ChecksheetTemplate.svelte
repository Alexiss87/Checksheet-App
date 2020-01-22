<script>
  import localSheets from "../localSheets.js";
  import { link } from "svelte-routing";
  import { Table } from "sveltestrap";

  export let id;
  let sheet = localSheets.find(item => item.id === parseInt(id));
  let response = sheet.response;
  // console.log(sheet);
  // console.log(sheet.checks);
  // console.log(response[0]);
</script>

<h1>{sheet.title}</h1>
<h2>{sheet.machine_name}</h2>
<a href="/checksheets" use:link class="btn btn-primary">back to checksheets</a>

<Table bordered>
  <thead>
    <tr>
      <th>item No.</th>
      <th>Checks</th>
      {#each sheet.response as response}
        <!-- content here -->
        <th>{response.date}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each sheet.checks as check (check.id)}
      <tr>
        <th scope="row">{check.id}</th>
        <td>{check.title}</td>
        {#each response as date, i}
          <!-- {console.log(check.id)} -->
          {#if date.responses[check.id - 1].value === null}
            <!-- content here -->
            <td>{date.responses[check.id - 1].status}</td>
          {:else}
            <!-- else content here -->
            <td>{date.responses[check.id - 1].value}</td>
          {/if}
        {/each}
      </tr>
    {/each}  
  </tbody>
</Table>
