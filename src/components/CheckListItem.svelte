<script>
  import SortableList from "svelte-sortable-list";
  import {
    Card,
    CardBody,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    Button
  } from "sveltestrap";
  export let checks = [];
  //let checkTitle = "";
  let has_value = false;

  function handleSort(e) {
    checks = e.detail;
  }
  function handleAddCheck(e) {}
  function handleEditCheck(index) {
    console.log("unimplented method");
  }
  function handleRemoveCheck(checkTitle) {
    console.log(` ${checkTitle} to be deleted`);
    if (checks.length > 1) {
      checks = checks.filter((check, index) => {
        return check.title !== checkTitle ? check : "";
      });
    } else {
      checks = [];
    }
  }
</script>

<style>

</style>

<SortableList list={checks} key="title" let:item let:index on:sort={handleSort}>
  <ListGroup>
    <ListGroupItem
      class="d-flex justify-content-between align-items-center light_shadow mb-2">
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
            handleRemoveCheck(item.title);
          }}>
          remove
        </Button>
        <Button
          type="button"
          size="sm"
          outline
          color="success"
          on:click={() => {
            handleEditCheck(index);
          }}>
          edit
        </Button>
      </ButtonGroup>

    </ListGroupItem>
  </ListGroup>
</SortableList>
