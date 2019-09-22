<script>
  import { beforeUpdate, afterUpdate, onMount } from "svelte";
  import apiCall from "./services/api";
  import Checkform from "./Checkform.svelte";
  import Checklist from "./Checklist.svelte";
  let checks = [];
  let url = "http://localhost:3000/api/v1/checksheets";
  ///let url = "https://academy.valentinog.com/api/link/";
  let checksheets = [];

  async function createCheck(check) {
    let { description, state, value } = check;
    checks = [...checks, { description, state, value }];
    const response = await apiCall("GET", url);
    console.log(response);
    console.log(url);

    //console.log(checks);
  }

  onMount(async () => {
    checks = [
      {
        description:
          "Check power Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ipsa excepturi praesentium ex ",
        state: "unchecked",
        value: ""
      },
      {
        description: "Check voltage",
        state: "checked",
        value: "413v"
      },
      {
        description: "check panel",
        state: "unchecked",
        value: ""
      }
    ];
  });
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Roboto");
  /* Global Styles */
  :root {
    --primary-color: #204f6e;
    --dark-color: #333333;
    --light-color: #f4f4f4;
    --danger-color: #dc3545;
    --success-color: #28a745;
  }

  /*****************************HEADER STYLES*****************************/
  header {
    text-align: center;
  }
  header h1 {
    font-size: 64px;
    font-weight: 300;
    margin: 80px 0 25px;
    color: #2c3e50;
  }
  header h1 span {
    font-weight: 700;
  }
  /* header h2 {
    color: #bdc3c7;
    font-weight: 300;
  } */
  /*****************************FORM STYLES*****************************/
</style>

<header>
  <h1>
    Check
    <span>list</span>
    creator
  </h1>
  <h3>Create checklist here</h3>
</header>

<Checkform {checks} {createCheck} />

<Checklist {checks} />
