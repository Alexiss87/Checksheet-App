<script>
  import localSheets from "../localSheets.js";
  import { link } from "svelte-routing";
  import { Table } from "sveltestrap";

  export let id;
  let sheet = localSheets.find(item => item.id === parseInt(id));
  let response = sheet.response;
  let limit = 10;
</script>

<style>
  #table {
    text-align: left;
    position: relative;
  }
  th {
    position: sticky;
    top: 0;
  }
</style>

<h1>Historical data for the {sheet.title}`</h1>
<!-- <h2>{sheet.machine_name}</h2> -->
<a href="/checksheets" use:link class="btn btn-primary">back to checksheets</a>

<Table
  style="position:relative;text-align: left;"
  bordered
  responsive
  striped
  class="table-sm">
  <thead>
    <tr>
      <th />
      <th>Supervisor:</th>
      {#each sheet.response as response, i}
        {#if i < limit - 1}
          <td>{response.supervisor}</td>
        {/if}
      {/each}
    </tr>
    <tr>
      <th />
      <th>Technician Name:</th>
      {#each sheet.response as response, i}
        {#if i < limit - 1}
          <td>{response.technician_name}</td>
        {/if}
      {/each}
    </tr>
    <tr>
      <th />
      <th>Start Time:</th>
      {#each sheet.response as response, i}
        {#if i < limit - 1}
          <td>{response.date.toLocaleTimeString()}</td>
        {/if}
      {/each}
    </tr>
    <tr>
      <th />
      <th>Completion Time:</th>
      {#each sheet.response as response, i}
        {#if i < limit - 1}
          <td>1 hour</td>
        {/if}
      {/each}
    </tr>
    <tr>
      <th />
      <th>WO Number:</th>
      {#each sheet.response as response, i}
        {#if i < limit - 1}
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
        {#if i < limit - 1}
          <th>{response.date.toDateString()}</th>
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
            <td>{date.responses[check.id - 1].status}</td>
          {:else}
            <td>{date.responses[check.id - 1].value}</td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</Table>
