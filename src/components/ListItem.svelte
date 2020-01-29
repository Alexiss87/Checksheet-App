<script>
  import { Card, CardBody, CardTitle, CardText } from "sveltestrap";
  import { link } from "svelte-routing";
  import { Button } from "sveltestrap";
  export let id = "default id";
  export let title = "defualt title";
  export let classname = "";
</script>

<Card class="mx-auto text-center" style="margin-top:10px;">
  <CardBody class="justify-content-center">
    <CardTitle>{title}</CardTitle>
    <a
      href={`/checksheets/${id}/edit`}
      class="btn btn-outline-success"
      use:link>
      Fill out
    </a>
    <a href={`/checksheets/${id}`} class="btn btn-outline-primary" use:link>
      History
    </a>
  </CardBody>
</Card>
