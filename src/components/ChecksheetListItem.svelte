<script>
  import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle
  } from "sveltestrap";
  import { link } from "svelte-routing";
  import { Button, ButtonGroup } from "sveltestrap";
  export let id = "default id";
  export let title = "defualt title";
  export let auditDate = "";
  export let lastChecked = "";
  let user = true;
  $: console.log({ auditDate });
</script>

<Card
  class="mx-auto text-center light_shadow p-0 mb-2 rounded"
  style="margin-top:10px; ">
  <CardHeader class="m-0">
    <CardTitle>
      <h4>{title}</h4>
    </CardTitle>
  </CardHeader>
  <CardBody class="justify-content-center">
    <ButtonGroup>
      <a
        href={`/checksheets/${id}/inspect`}
        class="btn btn-outline-success"
        use:link>
        Start Inspection
      </a>
      <a href={`/checksheets/${id}/history`} class="btn btn-outline-primary" use:link>
        View History
      </a>
      {#if user}
        <a href={`/checksheets/${id}`} class="btn btn-outline-info" use:link>
          Edit
        </a>
      {/if}
    </ButtonGroup>

    <CardText class="mt-3">
      <p>Next Inspection date: {auditDate}</p>
      <p>Last Inspection date: {lastChecked}</p>
    </CardText>
  </CardBody>
</Card>
