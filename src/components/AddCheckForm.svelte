<script>
  import {
    Card,
    CardBody,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    Button,
    Form,
    FormGroup,
    Input
  } from "sveltestrap";
  import { createEventDispatcher } from "svelte";
  export let checkTitle = "";
  export let has_value = false;
  const dispatch = createEventDispatcher();

  function addCheck(e) {
    e.preventDefault();
    dispatch("addCheck", {
      title: checkTitle.trim(),
      has_value
    });
  }
</script>

<style>
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
          <!-- .slideThree -->
          <label class="checkbox_container">
            Does this check has a value to be recorded?
            <div class="slideThree">
              <input type="checkbox" bind:checked={has_value} id="slideThree" />
              <label for="slideThree" />
            </div>
          </label>

          <!-- end .slideThree -->

        </div>
        <Button outline color="primary" class="mt-1 mb-1" on:click={addCheck}>
          Add check
        </Button>
      </FormGroup>
    </Form>
  </CardBody>
</Card>
