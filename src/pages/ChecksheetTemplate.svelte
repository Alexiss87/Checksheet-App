<script>
  import localSheets from "../localSheets.js";
  import { link } from "svelte-routing";
  import { Table } from "sveltestrap";

  export let id;
  let sheet = localSheets.find(item => item.id === parseInt(id));
  let response = sheet.response;
  let limit = 10;
</script>

<h1>Historical data for the {sheet.title}`</h1>
<!-- <h2>{sheet.machine_name}</h2> -->
<a href="/checksheets" use:link class="btn btn-primary">back to checksheets</a>

<Table bordered responsive striped>
  <thead>
    <tr>
      <th />
      <th>Supervisor:</th>
      {#each sheet.response as response, i}
        <!-- content here -->
        {#if i < limit - 1}
          <!-- content here -->
          <td>{response.supervisor}</td>
        {/if}
      {/each}
    </tr>
    <tr>
      <th />
      <th>Technician Name:</th>
      {#each sheet.response as response, i}
        <!-- content here -->
        {#if i < limit - 1}
          <!-- content here -->
          <td>{response.technician_name}</td>
        {/if}
      {/each}
    </tr>
    <tr>
      <th />
      <th>Start Time:</th>
      {#each sheet.response as response, i}
        <!-- content here -->
        {#if i < limit - 1}
          <!-- content here -->
          <td>{response.date}</td>
        {/if}
      {/each}
    </tr>
    <tr>
      <th />
      <th>Completion Time:</th>
      {#each sheet.response as response, i}
        <!-- content here -->
        {#if i < limit - 1}
          <!-- content here -->
          <td>1 hour</td>
        {/if}
      {/each}
    </tr>
    <tr>
      <th />
      <th>WO Number:</th>
      {#each sheet.response as response, i}
        <!-- content here -->
        {#if i < limit - 1}
          <!-- content here -->
          <td>{response.id}</td>
        {/if}
      {/each}
    </tr>

    <tr borderless table-primary>
      <th scope="row" />
    </tr>
    <tr borderless>
      <th scope="row" />
    </tr>
  </thead>
  <thead>
    <tr>
      <th>item No.</th>
      <th>Checks</th>
      {#each sheet.response as response, i}
        <!-- content here -->
        {#if i < limit - 1}
          <!-- content here -->
          <th>{response.date}</th>
        {/if}
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
