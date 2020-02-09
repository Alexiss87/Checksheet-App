<script>
  //import localSheets from "../localSheets.js";
  import checksheets from "../stores/checksheets";
  import { link } from "svelte-routing";
  import { Table, Spinner } from "sveltestrap";
  import { getResults } from "../services/services";
  import { onMount } from "svelte";

  export let id;
  //let sheet = localSheets.find(item => item.id === parseInt(id));
  console.log(id);
  // $: console.log(checksheets[0].Title);
  $: sheet = $checksheets.find(item => item.id === parseInt(id));

  let results = [];
  onMount(async () => {
    results = await getResults(`?checksheet=${id}`);
    console.log("**********");
    console.log(results);
    console.log(sheet);
  });

  // $: if (sheet) {
  //   results = sheet.results;
  //   console.log(results);
  // }

  //$: console.log(results);
  //$: response = sheet.response;
  let limit = 10;
</script>

<style>
  /* #table {
    text-align: left;
    position: relative;
  } */
  th {
    position: sticky;
    top: 0;
  }
</style>

{#if sheet || sheet != undefined}
  <h1>Historical data for the {sheet.Title}</h1>
  <!-- <h2>{sheet.machine_name}</h2> -->
  <a href="/checksheets" use:link class="btn btn-primary">
    back to checksheets
  </a>

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
        {#each results as response, i}
          {#if i < limit - 1}
            <td>{response.supervisor}</td>
          {/if}
        {/each}
      </tr>
      <tr>
        <th />
        <th>Technician Name:</th>
        {#each results as response, i}
          {#if i < limit - 1}
            <td>{response.technicain_name}</td>
          {/if}
        {/each}
      </tr>
      <tr>
        <th />
        <th>Start Time:</th>
        {#each results as response, i}
          {#if i < limit - 1}
            <td>{response.date}</td>
          {/if}
        {/each}
      </tr>
      <tr>
        <th />
        <th>Completion Time:</th>
        {#each sheet.results as response, i}
          {#if i < limit - 1}
            <td>
              {Math.abs(new Date(response.start_time) - new Date(response.end_time))}
            </td>
          {/if}
        {/each}
      </tr>
      <tr>
        <th />
        <th>WO Number:</th>
        {#each sheet.results as response, i}
          {#if i < limit - 1}
            <td>{`00${response.id}`}</td>
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
        {#each results as response, i}
          {#if i < limit - 1}
            <th>{response.date}</th>
          {/if}
        {/each}
      </tr>
    </thead>

    <tbody>
      {#each sheet.checks as check, idx}
        <tr>
          <th scope="row">{idx + 1}</th>
          <td>{check.title}</td>
          <!-- each check has a list/array of results -->
          {#each results as result, i}
            {#if result.answers[idx].value == null}
              <td>{result.answers[idx].status}</td>
            {:else}
              <td>{result.answers[idx].value}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </Table>
{:else}
  <div class="d-flex justify-content-center text-center align-items-center">
    <Spinner color={'primary'} size={'xl'} />
  </div>
{/if}
