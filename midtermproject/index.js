// Jason Bakke && Josh Scheitler
// 3/4/2024

fetch("theodddata.json")
  .then((response) => response.json())
  .then((MyEvents) => displayevents(MyEvents));

function displayevents(MyEvents) {
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");
  const numOfBooks = 5;
  const rowStart = document.createElement("tr");
  rowStart.style.textAlign = "center";


  //INSERT IMAGES INTO TABLE
  fetch('images.json')
  .then(response => response.json())
  .then(data => {
    const images = data.images;
    images.forEach(image => {

      const cell = document.createElement("td");
      cell.style.width = "50px";

      const img = document.createElement("img");

      img.src = image.src;
      img.alt = image.alt;

      img.style.width = "75px"; 
      img.style.height = "auto"; 

      cell.appendChild(img);
      rowStart.appendChild(cell);
      tblBody.appendChild(rowStart);
    });
  })
  





  //POPULATE THE TABLE WITH ODDS
  for (let k = 0; k < MyEvents.events.length / 5; k++) {
    for (let i = 0; i < 2; i++) {
      const row = document.createElement("tr");
      row.style.textAlign = "center";
      for (let j = 0; j < 5; j++) {
        let exibition = MyEvents.events[numOfBooks * k + j].event_name;
        let bookMaker = MyEvents.events[numOfBooks * k + j].bookmaker;
        let odd1 = MyEvents.events[numOfBooks * k + j].odd_1;
        let odd2 = MyEvents.events[numOfBooks * k + j].odd_2;
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        const cell = document.createElement("td");
        cell.style.width = "50px";

        let cellText;
        if (i == 0) {
          cellText = document.createTextNode(`${odd1}`);
        } else {
          cellText = document.createTextNode(`${odd2}`);
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      // Add the row to the end of the table body
      tblBody.appendChild(row);

      // Add an empty row after every 2 rows
      if ((k * 2 + i + 1) % 2 === 0 && k + 1 <= MyEvents.events.length / 5) {
        const emptyRow = document.createElement("tr");
        const emptyCell = document.createElement("td");
        emptyCell.colSpan = 6; 
        emptyCell.style.height = "10px";
        emptyCell.style.border = 0;
        emptyCell.style.backgroundColor= "#25272a";
        emptyRow.appendChild(emptyCell);
        tblBody.appendChild(emptyRow);
      }
    }
  }
  
  //APPEND TO BE ALLOW STYLING WITH CSS
  tbl.appendChild(tblBody);
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");
  tableContainer.appendChild(tbl);
  document.body.appendChild(tableContainer);
}
