<script>
  import { Button, Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import { Card, CardBody } from "sveltestrap";
  //import { postResults } from "../services/services";

  let title;
  let frequency;
  let equipment;
  let checks = [];

  let checkTitle;
  let has_value = false;

  async function createChecksheet(e) {
    // e.preventDefault();
    // e.stopPropagation();
    let checksheet = {
      Title: title,
      Frequency: frequency.trim(),
      Equipment: equipment.trim(),
      checks: [...checks]
    };
    console.log(checksheet);
  }
  function Addcheck(e) {
    e.preventDefault();
    checkTitle = checkTitle.trim();
    let check = {
      title: checkTitle,
      has_value
    };
    checks = [...checks, check];
    console.log(checks);
    checkTitle = "";
    has_value = false;
  }
  function removeCheck(i) {
    checks = checks.filter((check, index) => {
      index != i ? check : "";
    });
  }
</script>

<h1>Build CheckSheet</h1>

<form on:submit|preventDefault={createChecksheet}>
  <FormGroup>
    <Label for="title">Title</Label>
    <Input
      type="text"
      name="tile"
      id="title"
      bind:value={title}
      placeholder="Checksheet title"
      readonly={false} />
  </FormGroup>
  <FormGroup>
    <Label for="frequency">Frequency</Label>
    <Input
      type="text"
      name="frequency"
      id="frequency"
      bind:value={frequency}
      placeholder="How often should checks be done"
      readonly={false} />
  </FormGroup>
  <FormGroup>
    <Label for="equipment">Equipment</Label>
    <Input
      type="text"
      name="Equipment"
      id="Equipment"
      bind:value={equipment}
      placeholder="The name of the equipment being checked"
      readonly={false} />
  </FormGroup>
  <!-- <Label for="equipment">Add Check to Sheet</Label> -->
  <Card>
    <CardBody>
      <Form>
        <h5 class="card-title">Add Check to Sheet</h5>
        <FormGroup>
          <Input
            type="text"
            name="check"
            id="check"
            bind:value={checkTitle}
            placeholder="Title of check"
            readonly={false} />
          <Input type="checkbox" bind:checked={has_value} readonly={false} />
          Does this check has a value to be recorded
          <Button on:click={Addcheck}>Add check</Button>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
  <br />
  <Button type="submit">Submit</Button>
</form>

<h2>List of checks</h2>

{#each checks as check, i}
  <p>
    {check.title}
    <Button on:click={removeCheck}>X</Button>
  </p>
{/each}
