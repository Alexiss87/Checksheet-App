<script>
  import { fly } from "svelte/transition";
  import { beforeUpdate, afterUpdate, onMount } from "svelte";

  export let checks = [];
</script>

<style>
  /***********TODO LIST ***********/
  li:hover {
    color: #666;
  }
  .list {
    padding: 0px;
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
  .list li {
    display: grid;
    grid-template-columns: 1fr;
    /* grid-template-rows: 2fr 1fr 1fr; */
    grid-auto-rows: minmax(1.5rem, auto);
    color: var(--primary-color);
    text-decoration: none;
    border: solid 1px #204f6e;
    border-radius: 10px;
    margin-bottom: 1.25rem;
    padding: 1rem;
    text-align: center;
    justify-content: center;
  }
  .list li p {
    align-self: center;
    justify-self: center;
    text-align: left;
  }

  .list li select {
    background: var(--primary-color);
    color: #fff;
    /* width: 60%; */
    text-align: center;
    border-radius: 10px;
    outline: none;
    justify-self: center;
  }
  .recordedVal {
    background: none;
    justify-self: center;
    border: none;
    border-bottom: 1px solid #34495e;
    outline: none;
    color: #34495e;
    width: 40%;
    text-align: center;
    line-height: 0.8rem;
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

  @media only screen and (min-width: 760px) {
    .list {
      justify-content: center;
      align-content: center;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
    }
    .list li {
      grid-template-columns: 2fr 1fr 1fr;
      align-items: flex-end;
    }

    .list li select,
    .recordedVal {
      height: 50px;
    }
    .recordedVal {
      width: 60%;
      padding-bottom: 5px;
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
      .list {
        width: 800px;
      }
    }
  }
</style>

<ul class="list">
  {#each checks as check}
    <li in:fly={{ y: 200, duration: 2000 }}>
      <p>{check.description}</p>
      <select>
        <option value="unchecked">unchecked</option>
        <option value="OK">OK</option>
        <option value="Not OK">Not Ok</option>
      </select>
      {#if check.value === true || check.value != ''}
        <input
          type="text"
          placeholder="Value"
          class="recordedVal"
          value={check.value} />
      {/if}
    </li>
  {/each}
  <button class="btn-primary">Save</button>
</ul>
