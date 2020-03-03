<script>
  export let location;
  // import localSheets from "../localSheets.js";
  import checksheets from "../stores/checksheets";
  import SheetList from "../components/SheetList.svelte";
  import moment from "moment";

  function isOverdue(date, sheet = null) {
    let frequency = [
      "DAILY",
      "WEEKLY",
      "BI-WEEKLY",
      "MONTHLY",
      "QUARTERLY",
      "BI-ANNUALLY",
      "ANNUALLY"
    ];
    let lastResponseDate = moment(date);
    //console.log({ lastResponseDate });
    //console.log(sheet.Frequency);
    let dueDate = "";
    // identify frequency of the sheet then
    // calculate due date based on frequency
    // then check if due date has passed the current time/date
    // if the due date has passed the current date then the sheet is overdue
    // i.e if the if the current date is after the due date the sheet is overdue
    if (sheet.Frequency == frequency[0]) {
      //daily sheet check
      //console.log(`Sheet frequency is ${frequency[0]}`);
      dueDate = lastResponseDate.clone().add(1, "day");
      //console.log(`Is the sheet due: ${moment().isAfter(dueDate)}`);
      return moment().isAfter(dueDate);
    } else if (sheet.Frequency == frequency[1]) {
      //weekly sheet check
      //console.log(`Sheet frequency is ${frequency[1]}`);
      dueDate = lastResponseDate.clone().add(1, "week");
      //console.log(`Is the sheet due: ${moment().isAfter(dueDate)}`);
      return moment().isAfter(dueDate);
    } else if (sheet.Frequency == frequency[2]) {
      //bi- weekly sheet check
      //console.log(`Sheet frequency is ${frequency[2]}`);
      dueDate = lastResponseDate.clone().add(2, "weeks");
      //console.log(`Is the sheet due: ${moment().isAfter(dueDate)}`);
      return moment().isAfter(dueDate);
    } else if (sheet.Frequency == frequency[3]) {
      //console.log(`Sheet frequency is ${frequency[3]}`);
      //montlhy sheet check
      dueDate = lastResponseDate.clone().add(1, "month");
      //console.log(`Is the sheet due: ${moment().isAfter(dueDate)}`);
      return moment().isAfter(dueDate);
    } else if (sheet.Frequency == frequency[4]) {
      //quarterly sheet check
      //console.log(`Sheet frequency is ${frequency[4]}`);
      dueDate = lastResponseDate.clone().add(3, "months");
      //console.log(`Is the sheet due: ${moment().isAfter(dueDate)}`);
      return moment().isAfter(dueDate);
    } else if (sheet.Frequency == frequency[5]) {
      //bi-anually sheet check
      // console.log(`Sheet frequency is ${frequency[5]}`);
      dueDate = lastResponseDate.clone().add(6, "months");
      //console.log(`Is the sheet due: ${moment().isAfter(dueDate)}`);
      return moment().isAfter(dueDate);
    } else if (sheet.Frequency == frequency[6]) {
      //yearly sheet check
      //console.log(`Sheet frequency is ${frequency[6]}`);
      dueDate = lastResponseDate.clone().add(12, "months");
      //console.log(`Is the sheet due: ${moment().isAfter(dueDate)}`);
      return moment().isAfter(dueDate);
    }
  }

  $: overdueSheets = $checksheets.filter(sheet => {
    //select last response of the sheet then check if it's overdue
    // if it's overdue return it
    // The code below is the same as:
    //return isOverdue(sheet.response.slice(-1)[0].date, sheet) ? sheet : '';
    return isOverdue(sheet.results.slice(-1)[0].date, sheet) && sheet;
  });
  $: console.log({ overdueSheets });
</script>

<h1>Overdue Sheets</h1>
<SheetList checksheets={overdueSheets} />
<!-- <SheetList sheets={localSheets} /> -->
<!-- <p>{location.href}</p>
<p>{location.pathname}</p> -->
