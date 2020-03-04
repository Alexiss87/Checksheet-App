<script>
  import { getResult, getChecksheet } from "../services/services";
  import { onMount, onDestroy } from "svelte";
  import { Card, CardBody, ListGroup, ListGroupItem } from "sveltestrap";
  import moment from "moment";
  export let id = "";

  let result = {};
  $: answers = result.answers;
  let checksheet = {};
  $: checksheetTitle = checksheet.Title;
  let checks = [];
  let failedChecks = [];

  let failedCount;

  onMount(async () => {
    try {
      result = await getResult(id);
      //sort the answers in result object by check (check id)
      result.answers = await result.answers.sort((a, b) => {
        return a.check - b.check;
      });

      checksheet = await getChecksheet(result.checksheet.id);
      
      checks = checksheet.checks.map((check, i) => {
        let { status, value } =
          answers[i].check === check.id ? { ...answers[i] } : "";
        return (check = { ...check, status, value });
      });
      failedChecks = checks.filter(check => {
        return check.status === "NOT_OK" || check.status === "UNCHECKED";
      });

      //   failedCount = answers.reduce((count, answer) => {
      //     if (answer.status == "NOT_OK") {
      //       count += 1;
      //       //console.log(count);
      //     }
      //     return count;
      //   }, 0);
      console.log({ checks });
    } catch (error) {
      console.log(error);
    }
  });
</script>

{#if failedChecks && checks}
  <h2>{moment(result.date).format('L')}/{result.technician_name}</h2>
  <h3>{checksheetTitle}</h3>
  <h3>faild items: {failedChecks.length}</h3>
  <h4>
    inspection score : {((checks.length - failedChecks.length) / checks.length) * 100}%
  </h4>
  <p>Conducted on {moment(result.date).format('LLLL')}</p>
  <p>Prepared by {result.technician_name}</p>

  <h4>Failed Items</h4>
  <ListGroup>
    {#each checks.filter(check => {
      return check.status === 'NOT_OK' || check.status === 'UNCHECKED';
    }) as check, i}
      <ListGroupItem
        class="d-flex justify-content-between align-items-center light_shadow
        mb-2">
        <div>
          <h5>{check.title}</h5>
          {#if check.status === 'NOT_OK'}
            <span class="badge badge-danger">{check.status}</span>
          {:else if check.status === 'UNCHECKED'}
            <span class="badge badge-warning">{check.status}</span>
          {/if}
        </div>
      </ListGroupItem>
    {/each}
  </ListGroup>
  <h4>Full Inspection</h4>

  <ListGroup>
    {#each checks as check, i}
      <ListGroupItem
        class="d-flex justify-content-between align-items-center light_shadow
        mb-2">
        <div>
          <!-- <p>{index}</p> -->
          <h5>{check.title}</h5>
          {#if check.status === 'OK' && !check.value}
            <span class="badge badge-success">{check.status}</span>
          {:else if check.status === 'NOT_OK'}
            <span class="badge badge-danger">{check.status}</span>
          {:else if check.status === 'UNCHECKED'}
            <span class="badge badge-warning">{check.status}</span>
          {/if}
          {#if check.value}
            <span class="badge badge-info">Recorded value: {check.value}</span>
          {/if}
        </div>
      </ListGroupItem>
    {/each}
  </ListGroup>
{:else}
  <!-- else content here -->
{/if}
