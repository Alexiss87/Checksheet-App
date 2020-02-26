<script>
  //import localSheets from "../localSheets.js";
  import checksheets from "../stores/checksheets";
  import { link } from "svelte-routing";
  import { Table, Spinner } from "sveltestrap";
  import { getResults } from "../services/services";
  import { onMount, onDestroy } from "svelte";

  export let id;
  let limit = 100;
  $: sheet = $checksheets.find(item => item.id === parseInt(id));

  let results = [];
  onMount(async () => {
    results = await getResults(`?checksheet=${id}`);
    //console.log("**********");
    console.log(results);
    console.log(sheet);
  });

  onDestroy(() => {
    results = [];
  });

  function getStatusColor(status) {
    switch (status) {
      case "OK":
        //return "text-success";
        return "text-success ";
        break;
      case "NOT_OK":
        return "text-danger";
        break;
      case "UNCHECKED":
        return "text-warning";
        break;
      case "JOB_RAISED":
        return "text-info";
        break;

      default:
        return "text-success";
        break;
    }
  }
</script>

<style>
  th {
    position: sticky;
    top: 0;
  }
  .flex-center {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  /* .stripeHeader {
    box-shadow: var(--lightShadow);
  } */
  .stripeHeader tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .l_shadow {
    box-shadow: 2px 5px 3px 0px rgba(0, 0, 0, 0.5);
  }
</style>

{#if sheet || sheet != undefined}
  <!-- {#if 1 === 0} -->
  <h1>Historical data for the {sheet.Title}</h1>
  <!-- <h2>{sheet.machine_name}</h2> -->
  <a href="/checksheets" use:link class="btn btn-primary light_shadow">
    back to checksheets
  </a>
  <br />
  <br />
  <div class="table-sm light_shadow p-0 mb-3 rounded">
    <Table
      style="position:relative;text-align:left;background-color:#fff"
      bordered
      responsive
      striped
      class="table-sm rounded">
      <thead class=" shadow mb-5 stripeHeader">
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
              <td>{response.technician_name}</td>
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
      </thead>
      <br />
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
              {#if result.answers}
                {#if result.answers[idx].value === undefined || result.answers[idx].value === '' || result.answers[idx].value === null}
                  <td class={getStatusColor(result.answers[idx].status)}>
                    {result.answers[idx].status}
                  </td>
                {:else}
                  <td class={'text-info'}>{result.answers[idx].value}</td>
                {/if}
              {:else}
                <td>No ans</td>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </Table>
  </div>
{:else}
  <div
    class="d-flex flex-row justify-content-center text-center m-5 flex-center">
    <Spinner
      color={'primary'}
      style="width: 10rem; height: 10rem; text-center" />
  </div>
{/if}
