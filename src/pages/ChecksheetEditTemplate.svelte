<script>
  import { link } from "svelte-routing";
  import localSheets from "../localSheets.js";
  export let id;
  //import { Table } from "sveltestrap";
  import { Button, Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import { Col, Container, Row, Table } from "sveltestrap";

  let supervisor = "Alexis";
  let technician = "james";
  let start_time = "";
  let completion_time = "";
  let time_taken = calculateTimetaken();
  let date = "";

  let statusOptions = [
    { id: "1", value: "Unchecked" },
    { id: "2", value: "Ok" },
    { id: "3", value: "Not Ok" }
  ];

  let sheet = localSheets.find(item => item.id === parseInt(id));

  let response = {};
  let responses = sheet.checks.map((check, index) => {
    return {
      check_id: index + 1,
      title: sheet.checks[index].title,
      status: "Unchecked",
      value: null
    };
  });
  console.log(responses);

  function calculateTimetaken() {
    return start_time - completion_time;
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(sheet.response.length);
    // let checks = responses.map((response, index) => {
    //   return {
    //     check_id: index + 1,
    //     title: sheet.checks[index].title,
    //     status: response,
    //     value: null
    //   };
    // });
    response = {
      id: sheet.response.length + 1,
      machine_name: sheet.machine_name,
      technician_name: technician,
      supervisor: supervisor,
      start_time: start_time,
      completion_time: completion_time,
      responses: [...responses]
    };
    console.log(responses);
    console.log(response);
  }
</script>

<style>

</style>

<p />
<a href="/checksheets" use:link class="btn btn-primary">back to checksheets</a>
<h1>{sheet.title}</h1>

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
    {#each sheet.checks as check (check.id)}
      <tr>
        <th scope="row">{check.id}</th>
        <td>{check.title}</td>
        <td>
          <!-- <Input
            type="text"
            name={check.title}
            id={check.title}
            readonly={false}
            bind:value={responses[check.id - 1]} /> -->
          <select
            type="select"
            name={check.title}
            id={check.title}
            bind:value={responses[check.id - 1].status}
            readonly={false}
            class="custom-select">
            {#each statusOptions as option}
              <option value={option.value} selected={option.value}>
                {option.value}
              </option>
            {/each}
          </select>
        </td>
      </tr>
    {/each}
  </tbody>

</Table>
<Button type="submit" color={'primary'} block on:click={handleSubmit}>
  submit
</Button>
