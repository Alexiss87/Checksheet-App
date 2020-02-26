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
  import { navigate } from "svelte-routing";
  import SortableList from "svelte-sortable-list";
  import { onMount } from "svelte";

  let title = "";
  let frequency = "MONTHLY";
  let frequencyOptions = [
    { id: "1", value: "ANNUALLY" },
    { id: "2", value: "BI-ANNUALLY" },
    { id: "3", value: "QUARTERLY" },
    { id: "4", value: "MONTHLY" },
    { id: "5", value: "BI-WEEKY" },
    { id: "6", value: "WEEKLY" },
    { id: "7", value: "DAILY" }
  ];
  let equipment = "";
  let checks = [
    // { title: "check panel", has_value: false },
    // { title: "record running current", has_value: true },
    // { title: "inspect safety switches", has_value: false }
  ];

  $: console.log(checks);

  let checkTitle;
  let has_value = false;
  onMount(async () => {
    //does not work implement in on change method of the inputs
    //title = `${frequency} ${equipment} PM checks`;
  });
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
  const sortList = ev => {
    checks = ev.detail;
  };
  function editCheck(index) {
    checkTitle = checks[index].title;
    has_value = checks[index].has_value;
    console.log(`checkTitle: ${checkTitle}, has_value:${has_value}`);
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
  function removeCheck(cTitle) {
    console.log(` ${cTitle} to be deleted`);
    if (checks.length > 1) {
      checks = checks.filter((check, index) => {
        return check.title !== cTitle ? check : "";
      });
    } else {
      checks = [];
    }
  }
</script>

<style>
  .checkbx {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    /* align-items: baseline; */
  }
  .rounded {
    border-radius: 80px !important;
    width: 50px;
  }

  /* .slideThree */
  .slideThree {
    width: 80px;
    height: 26px;
    background: #333;
    position: relative;
    margin-top: 15px;
    margin-bottom: 25px;
    border-radius: 50px;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5),
      0px 1px 0px rgba(255, 255, 255, 0.2);
  }

  .slideThree:after {
    content: "NO";
    color: #000;
    color: #dc3545;
    position: absolute;
    right: 10px;
    z-index: 0;
    font: 12px/26px Arial, sans-serif;
    font-weight: bold;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.15);
  }

  .slideThree:before {
    content: "YES";
    color: #28a745;
    position: absolute;
    left: 10px;
    z-index: 0;
    font: 12px/26px Arial, sans-serif;
    font-weight: bold;
  }

  .slideThree label {
    display: block;
    width: 34px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 3px;
    left: 3px;
    z-index: 1;
    background: #fcfff4;
    background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
    border-radius: 50px;
    transition: all 0.4s ease;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  }

  .slideThree input[type="checkbox"] {
    visibility: hidden;
  }

  .slideThree input:checked + label {
    left: 43px;
  }
</style>

<h1>Build CheckSheet</h1>

<form on:submit|preventDefault={createChecksheet}>

  <Card class="light_shadow mb-3">
    <CardBody>
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
        <Label for="equipment">Equipment</Label>
        <Input
          type="text"
          name="Equipment"
          id="Equipment"
          bind:value={equipment}
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
          bind:value={frequency}
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

  {#if checks.length != 0}
    <h2>List of checks</h2>
  {/if}

  <SortableList list={checks} key="title" let:item let:index on:sort={sortList}>
    <ListGroup>
      <ListGroupItem
        class="d-flex justify-content-between align-items-center light_shadow
        mb-2">
        <div>
          <!-- <p>{index}</p> -->
          <h4>{item.title}</h4>
          <p>Possible responses:</p>
          {#if item.has_value}
            <span class="badge badge-success">Text/Number to be filled in</span>
          {:else}
            <span class="badge badge-success ">OK</span>
            <span class="badge badge-danger ">NOT_OK</span>
            <span class="badge badge-info ">JOB_RAISED</span>
          {/if}

        </div>
        <ButtonGroup>
          <Button
            type="button"
            size="sm"
            outline
            color="danger"
            on:click={() => {
              removeCheck(item.title);
            }}>
            remove
          </Button>
          <Button
            type="button"
            size="sm"
            outline
            color="success"
            on:click={() => {
              editCheck(index);
            }}>
            edit
          </Button>
        </ButtonGroup>

      </ListGroupItem>
    </ListGroup>
  </SortableList>

  <!-- <Label for="equipment">Add Check to Sheet</Label> -->
  <Card class="light_shadow mb-3">
    <CardBody>
      <Form>
        <h5 class="card-title">Add Check to Sheet</h5>
        <FormGroup>
          <div>
            <Input
              class="mb-3"
              type="text"
              name="check"
              id="check"
              bind:value={checkTitle}
              placeholder="Title of check"
              readonly={false} />
            <!-- <div class="checkbox"> -->
            <!-- <label>
                <input type="checkbox" bind:checked={has_value} />
                Does this check has a value to be recorded
              </label> -->
            <!-- <label class="checkbox_container">
              Does this check has a value to be recorded
              <input type="checkbox" bind:checked={has_value} />
              <span class="checkmark" />
            </label> -->

            <!-- .slideThree -->
            <label class="checkbox_container">
              Does this check has a value to be recorded?
              <div class="slideThree">
                <input
                  type="checkbox"
                  bind:checked={has_value}
                  id="slideThree" />
                <label for="slideThree" />
              </div>
            </label>

            <!-- end .slideThree -->

          </div>
          <Button outline color="primary" class="mt-1 mb-1" on:click={Addcheck}>
            Add check
          </Button>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
  <Button class="mb-5 mt-3 light_shadow" outline color="primary" type="submit">
    Create Checksheet
  </Button>
</form>

<!-- {#each checks as check, i}
{/each} -->
