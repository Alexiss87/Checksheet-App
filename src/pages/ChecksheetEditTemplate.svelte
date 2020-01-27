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

  let sheet = localSheets.find(item => item.id === parseInt(id));

  let response = {};
  let responses = [];

  function calculateTimetaken() {
    return start_time - completion_time;
  }
  // id: 1,
  //       date: new Date(2019, 11, 24, 13, 31),
  //       machine_name: 'Boiler',
  //       technician_name: 'A.Brown',
  //       supervisor: 'A.Simpson',
  //       start_time: '',
  //       completion_time: '',
  function handleSubmit(e) {
    e.preventDefault();
    console.log(sheet.response.length);
    let checks = responses.map((response, index) => {
      return {
        check_id: index + 1,
        title: sheet.checks[index].title,
        status: response,
        value: null
      };
    });
    response = {
      id: sheet.response.length + 1,
      machine_name: sheet.machine_name,
      technician_name: technician,
      supervisor: supervisor,
      start_time: start_time,
      completion_time: completion_time,
      responses: [...checks]
    };
    console.log(checks);
    console.log(response);
  }
</script>

<h1>Perform checks</h1>
<a href="/checksheets" use:link class="btn btn-primary">back to checksheets</a>
<h1>{sheet.title}</h1>

<Container />
<Form>
  <Row>
    <FormGroup inline check>
      <Col xs="6">
        <Label for="supervisor">Supervisor</Label>
      </Col>
      <Col xs="6">
        <Input
          type="text"
          name="supervisor"
          id="supervisor"
          bind:value={supervisor}
          readonly={false} />
      </Col>

    </FormGroup>
  </Row>
  <Row>
    <FormGroup inline check>
      <Col xs="6">
        <Label for="technician">Technician</Label>
      </Col>
      <Col xs="6">
        <Input
          type="text"
          name="Technician"
          id="technician"
          bind:value={technician}
          readonly={false} />
      </Col>
    </FormGroup>
  </Row>

  <Row>
    <FormGroup inline check>
      <Col xs="6">
        <Label for="start_time">Start time</Label>
      </Col>
      <Col xs="6">
        <Input
          type="time"
          name="start_time"
          id="start_time"
          bind:value={start_time}
          readonly={false} />
      </Col>
    </FormGroup>
  </Row>

  <Row>
    <FormGroup inline check>
      <Col xs="6">
        <Label for="completion_time">Completion time</Label>
      </Col>
      <Col sm="10">
        <Input
          type="time"
          name="completion_time"
          id="completion_time"
          bind:value={completion_time}
          readonly={false} />
      </Col>
    </FormGroup>
  </Row>
  <Row>
    <FormGroup inline check>
      <Col xs="6">
        <Label for="time_taken">Time Taken</Label>
      </Col>
      <Col xs="6">
        <Input
          disabled
          type="time"
          name="time_taken"
          id="time_taken"
          bind:value={time_taken}
          readonly={true} />
      </Col>
    </FormGroup>
  </Row>
  <Row>
    <FormGroup inline check>
      <Col xs="6">
        <Label for="date">Date</Label>
      </Col>
      <Col xs="6">
        <Input
          type="date"
          name="date"
          id="date"
          bind:value={date}
          readonly={false} />
      </Col>
    </FormGroup>
  </Row>
  <Button type="submit" color={'primary'} on:click={handleSubmit}>
    submit
  </Button>
</Form>

<Table bordered responsive striped>
  <thead>
    <tr>
      <th>item No.</th>
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
          <Input
            type="text"
            name={check.title}
            id={check.title}
            readonly={false}
            bind:value={responses[check.id - 1]} />
        </td>
      </tr>
    {/each}
  </tbody>

</Table>
