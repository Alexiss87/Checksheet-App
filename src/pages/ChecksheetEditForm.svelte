<script>
  import { Button, Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import {
    Card,
    CardBody,
    ListGroup,
    ListGroupItem,
    ButtonGroup
  } from "sveltestrap";
  import { postChecksheet } from "../services/services";
  import { getChecks } from "../services/services";
  import { navigate } from "svelte-routing";
  import CheckListItem from "../components/CheckListItem.svelte";
  import AddCheckForm from "../components/AddCheckForm.svelte";
  import { onMount } from "svelte";
  import { beforeUpdate, afterUpdate } from "svelte";
  import checksheets from "../stores/checksheets";

  export let id;
  $: checksheet = $checksheets.find(item => item.id === parseInt(id));
  // let title = "";
  // let frequency = "";
  let frequencyOptions = [
    { id: "1", value: "ANNUALLY" },
    { id: "2", value: "BI-ANNUALLY" },
    { id: "3", value: "QUARTERLY" },
    { id: "4", value: "MONTHLY" },
    { id: "5", value: "BI-WEEKY" },
    { id: "6", value: "WEEKLY" },
    { id: "7", value: "DAILY" }
  ];
  //let equipment = "";
  let checks = [];
  $: console.log(checksheet);

  let checkTitle = "";
  let has_value = false;

  onMount(async () => {
    //does not work implement in on change method of the inputs
    //title = `${frequency} ${equipment} PM checks`;
    checks = await getChecks(`?checksheet=${id}`);
    //title = checksheets.Title;
  });
  // afterUpdate(async () => {
  //   // if (checksheet) checks = checksheets.checks;
  //   checks = await getChecks(`?checksheet=${id}`);
  // });

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
    try {
      let response = await postChecksheet(checksheet);
      console.log(response);
      if (response.status == 200) {
        // To check sheetlist
        console.log(response.status);
        navigate("/checksheets");
      } else {
        //show alert
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.json());
      }
    } catch (error) {
      console.log(error);
    }
  }

  function editCheck(index) {
    checkTitle = checks[index].title;
    has_value = checks[index].has_value;
    console.log(`checkTitle: ${checkTitle}, has_value:${has_value}`);
  }
  function addcheck(e) {
    let checkTitle = e.detail.title;
    let has_value = e.detail.has_value;
    let check = {
      title: checkTitle,
      has_value
    };
    checks = [...checks, check];
    console.log(checks);
    checkTitle = "";
    has_value = false;
  }
</script>

<h1>Build CheckSheet</h1>

{#if checksheet}
  <form on:submit|preventDefault={createChecksheet}>
    <Card class="light_shadow mb-3">
      <CardBody>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="tile"
            id="title"
            bind:value={checksheet.Title}
            placeholder="Checksheet title"
            readonly={false} />
        </FormGroup>
        <FormGroup>
          <Label for="equipment">Equipment</Label>
          <Input
            type="text"
            name="Equipment"
            id="Equipment"
            bind:value={checksheet.Equipment}
            placeholder="The name of the equipment being checked"
            readonly={false} />
        </FormGroup>

        <FormGroup>
          <Label for="frequency">Frequency</Label>
          <select
            class="custom-select"
            type="select"
            name="frequency"
            id="frequency"
            bind:value={checksheet.Frequency}
            placeholder="How often should checks be done"
            readonly={false}>
            {#each frequencyOptions as option}
              <option value={option.value} selected={option.value}>
                {option.value}
              </option>
            {/each}
          </select>
        </FormGroup>
      </CardBody>
    </Card>

    {#if checks.length !== 0}
      <h2>List of checks</h2>
    {/if}
    <CheckListItem {checks} />
    <AddCheckForm on:addCheck={addcheck} {checkTitle} {has_value} />

    <Button class="mb-5 mt-3 light_shadow" outline color="danger" type="submit">
      Edit Checksheet
    </Button>
  </form>
{:else}
  <p>checksheet is undefined</p>
{/if}
