<script>
  let check;
  export let checks = [];
  export let createCheck;
  let yes = false;

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Value: ${yes}`);
    let checkObj = {
      description: check,
      state: "unchecked",
      value: yes
    };
    createCheck(checkObj);
  }
</script>

<style>
  .checkForm {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    padding: 20px;
    border: #204f6e 1px solid;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }
  #todoInput {
    /* background: none;
    width: 100%; */
    border-radius: 1rem;
    border: 1px solid #34495e;
    /* border: none;*/
    outline: none;
    font: 300 20px "Ubuntu", sans-serif;
    padding: 30px 10px 10px 20px;
    text-align: center;
    color: #34495e;
  }
  #value-checkbox {
    float: left;
    margin-top: 8px;
  }
  .checkbox-wrapper {
    justify-self: center;
  }

  .lable {
    margin-left: 20px;
  }

  .btn-primary {
    background: var(--primary-color);
    color: #fff;
    width: 8rem;
    border-radius: 10px;
    justify-self: center;
    cursor: pointer;
    /* grid-column: 1 / span 3; */
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    .checkForm {
      grid-template-columns: 2fr 1fr;
    }

    .checkbox-wrapper {
      margin-top: 16px;
    }

    .lable {
      margin-left: 20px;
    }

    .btn-primary {
      /*justify-self: center;*/
      cursor: pointer;
      grid-column: 1 / span 4;
    }
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    .checkForm {
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
      padding: 20px 0px;
    }

    #todoInput {
      /* grid-column: 1 / 4; */
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
      padding: 10px 10px 10px 10px;
    }

    .checkbox-wrapper {
      margin-top: 8px;
      justify-self: center;
      /* grid-column: 1 / 4; */
    }
    /* #value-checkbox {
    } */
  }
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    .checkForm {
      width: 800px;
    }
  }
</style>

<form on:submit={handleSubmit} class="checkForm">
  <!-- <input
    bind:value={check}
    type="text"
    id="todoInput"
    placeholder="Description of the check..." /> -->
  <textarea
    bind:value={check}
    type="text"
    id="todoInput"
    placeholder="Description of the check..." />
  <!-- <label for="value-checkbox" /> -->
  <div class="checkbox-wrapper">
    <input type="checkbox" bind:checked={yes} id="value-checkbox" />
    <label for="value-checkbox" class="lable">
      This check has value to be recorded
    </label>
  </div>
  <button class="btn-primary">submit</button>
</form>
