<script>
  import { link, navigate } from "svelte-routing";
  //import localSheets from "../localSheets.js";
  import checksheets from "../stores/checksheets";
  import {
    Button,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Spinner
  } from "sveltestrap";
  import { Col, Container, Row, Table } from "sveltestrap";
  import { getChecks } from "../services/services";
  import { onMount, onDestroy } from "svelte";
  import { postResults } from "../services/services";

  export let id;
  let supervisor = "Alexis";
  let technician = "james";
  let start_time = "13:59:00";
  let completion_time = "13:59:00";
  let time_taken = calculateTimetaken();
  let date = "2020-02-14";

  let statusOptions = [
    { id: "1", value: "OK" },
    { id: "2", value: "NOT_OK" },
    { id: "3", value: "JOB_RAISED" },
    { id: "4", value: "UNCHECKED" }
  ];

  $: sheet = $checksheets.find(item => item.id === parseInt(id));
  let result = {};
  let answers = [];

  ///TODO a store is needed for checks and results and answers
  //to access data (checks) before hand.

  let checks = [];
  onMount(async () => {
    //fix...query back end for checks with the current checksheet id
    checks = await getChecks(`?checksheet=${id}`);
    //console.log(checks);
    answers = checks.map((check, index) => {
      return {
        check: check.id,
        title: check.title,
        status: "Unchecked",
        value: "",
        has_value: check.has_value
      };
    });
    console.log(answers);
  });
  onDestroy(() => {
    result = {};
    answers = [];
  });

  function calculateTimetaken() {
    return start_time - completion_time;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    answers.forEach(answer => {
      console.log(`answer value ${answer.value}`);
      if (answer.value) {
        answer.status = "Ok";
      }
      delete answer["title"];
      delete answer["has_value"];
    });
    //check: 4, title: "Inspect Panel for loose connection", status: "Unchecked", value: null, has_value: false
    //answers = []
    console.log(answers);
    console.log(start_time);
    result = {
      // id: responses.length + 1,
      //id: sheet.results.slice(-1)[0].id + 1,
      date: date,
      machine_name: sheet.Equipment,
      //technician_name: technician,
      technician_name: technician,
      supervisor: supervisor,
      start_time: `${start_time}:00`,
      end_time: `${completion_time}:00`,
      checksheet: sheet.id,
      answers: [...answers]
    };
    //console.log(answers);
    console.log(result);
    try {
      let res = await postResults(result);
      if (res.status == 200) {
        //redirect to checksheet history page
        console.log(res.status);
        //console.log(res.json())
        navigate(`/checksheets/${id}`);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>

<style>

</style>

{#if sheet || sheet != undefined}
  <p />
  <a href="/checksheets" use:link class="btn btn-primary">
    back to checksheets
  </a>
  <h1>{sheet.Title}</h1>
  <Form>
    <FormGroup inline>
      <Col sm="4">
        <Label for="supervisor">Supervisor</Label>
      </Col>
      <Col sm="12">
        <Input
          type="text"
          name="supervisor"
          id="supervisor"
          bind:value={supervisor}
          readonly={false} />
      </Col>
    </FormGroup>

    <FormGroup inline>
      <Col sm="4">
        <Label for="technician">Technician</Label>
      </Col>
      <Col sm="12">
        <Input
          type="text"
          name="Technician"
          id="technician"
          bind:value={technician}
          readonly={false} />
      </Col>
    </FormGroup>

    <FormGroup inline>
      <Col sm="4">
        <Label for="start_time" class="text-nowrap">Start time</Label>
      </Col>
      <Col sm="12">
        <Input
          type="time"
          name="start_time"
          id="start_time"
          bind:value={start_time}
          readonly={false} />
      </Col>
    </FormGroup>

    <FormGroup inline>
      <Col sm="4">
        <Label for="completion_time" class="text-nowrap">Completion time</Label>
      </Col>
      <Col sm="12">
        <Input
          type="time"
          name="completion_time"
          id="completion_time"
          bind:value={completion_time}
          readonly={false} />
      </Col>
    </FormGroup>

    <!-- <FormGroup inline>
    <Col sm="3">
      <Label for="time_taken" class="text-nowrap">Time Taken</Label>
    </Col>
    <Col sm="12">
      <Input
        disabled
        type="time"
        name="time_taken"
        id="time_taken"
        bind:value={time_taken}
        readonly={true} />
    </Col>
  </FormGroup> -->

    <FormGroup inline>
      <Col sm="4">
        <Label for="date">Date</Label>
      </Col>
      <Col sm="12">
        <Input
          type="date"
          name="date"
          id="date"
          bind:value={date}
          readonly={false} />
      </Col>
    </FormGroup>

  </Form>

  <Table bordered responsive striped class="table-sm">
    <thead>
      <tr>
        <th />
        <th>Checks</th>
        <th>status</th>
      </tr>
    </thead>

    <tbody>
      {#each sheet.checks as check, i}
        <tr>
          <th scope="row">{i + 1}</th>
          <td>{check.title}</td>
          <td>
            {#if answers.length != 0}
              {#if answers.length != 0 && !answers[i].has_value}
                <select
                  type="select"
                  name={check.title}
                  id={check.title}
                  bind:value={answers[i].status}
                  readonly={false}
                  class="custom-select">
                  {#each statusOptions as option}
                    <option value={option.value} selected={option.value}>
                      {option.value}
                    </option>
                  {/each}
                </select>
              {:else}
                <!-- if check has value  -->
                <Input
                  type="text"
                  name={check.title}
                  bind:value={answers[i].value}
                  id={check.title}
                  readonly={false} />
              {/if}
            {/if}

          </td>
        </tr>
      {/each}
    </tbody>

  </Table>
  <Button type="submit" color={'primary'} block on:click={handleSubmit}>
    submit
  </Button>
{:else}
  <!-- else content here -->
  <div class="d-flex justify-content-center text-center align-items-center m-5">
    <Spinner color={'primary'} style="width: 10rem; height: 10rem;" />
  </div>
{/if}
