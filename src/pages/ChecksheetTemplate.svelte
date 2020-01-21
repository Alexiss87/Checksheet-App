<script>
  import localSheets from "../localSheets.js";
  import { link } from "svelte-routing";
  import { Table } from "sveltestrap";

  export let id;
  let sheet = localSheets.find(item => item.id === parseInt(id));
  console.log(sheet.response);
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
      <!-- <th>Responses</th> -->
    </tr>
  </thead>
  <tbody>
    {#each sheet.checks as check (check.id)}
      <!-- content here -->
      <tr>
        <th scope="row">{check.id}</th>
        <td>{check.title}</td>
        {#each sheet.response.responses as response}
          <!-- content here -->
          <th>{response.title}</th>
        {/each}

      </tr>
    {/each}
    <!-- <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr> -->
  </tbody>
</Table>
