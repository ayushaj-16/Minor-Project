$( document).ready(function() {
  
$.ajax({
  type: "GET",
  url: "DataExportedOldData.csv",
  dataType: "text",
  success: function (data) {
    processDataAsObj(data);
  },
});

$('#btn1').click(()=> {  
  $.ajax({
    type: "GET",
    url: "DataExportedOldData.csv",
    dataType: "text",
    success: function (data) {
      processDataAsObj(data);
    },
  });
});

$('#btn2').click(()=> {  
  $.ajax({
    type: "GET",
    url: "DataExportedNew.csv",
    dataType: "text",
    success: function (data) {
      processDataAsObj(data);
    },
  });
});


//if your csv file contains the column names as the first line
function processDataAsObj(csv) {
  var allTextLines = csv.split(/\r\n|\n/);
  var lines = [];

  //first line of csv
  var keys = allTextLines.shift().split(",");

  while (allTextLines.length) {
    var arr = allTextLines.shift().split(",");
    var obj = {};
    for (var i = 0; i < keys.length; i++) {
      obj[keys[i]] = arr[i];
    }
    lines.push(obj);
  }
  
  drawOutputAsObj(lines);
}

//draw the table, if first line contains heading
function drawOutputAsObj(lines) {
  
  //the data
  for (var i = 0; i < lines.length - 1; i++) {
    // Setting Accuracy for side bar graph
    let accuracy = parseFloat(parseFloat(lines[i]["Accuracy"]) * 100).toFixed(2);
    document.getElementById(
      `ac${i + 1}0`
    ).innerHTML = `${lines[i]["Model Name"]}<i class="val">${accuracy}%</i>`;
    document
      .getElementById(`ac${i + 1}1`)
      .setAttribute("aria-valuenow", parseInt(accuracy));
    
    // Setting precision for side bar graph
    let precision = parseFloat(
      parseFloat(lines[i]["Precision Score"]) * 100
    ).toFixed(2);
    document.getElementById(
      `pc${i + 1}0`
    ).innerHTML = `${lines[i]["Model Name"]}<i class="val">${precision}%</i>`;
    document
      .getElementById(`pc${i + 1}1`)
      .setAttribute("aria-valuenow", parseInt(precision));

    // Setting recall for side bar graph
    let recall = parseFloat(parseFloat(lines[i]["Recall Score"]) * 100).toFixed(
      2
    );
    document.getElementById(
      `rc${i + 1}0`
    ).innerHTML = `${lines[i]["Model Name"]}<i class="val">${recall}%</i>`;
    document
      .getElementById(`rc${i + 1}1`)
      .setAttribute("aria-valuenow", parseInt(recall));

    // Setting f1score for side bar graph
    let f1score = parseFloat(parseFloat(lines[i]["F1Score"]) * 100).toFixed(2);
    document.getElementById(
      `fc${i + 1}0`
    ).innerHTML = `${lines[i]["Model Name"]}<i class="val">${f1score}%</i>`;
    document
      .getElementById(`fc${i + 1}1`)
      .setAttribute("aria-valuenow", parseInt(f1score));
    
    // Setting sensitivity for side bar graph
    let senstivity = parseFloat(parseFloat(lines[i]["Sensitivity"]) * 100).toFixed(2);
    document.getElementById(
      `sc${i + 1}0`
    ).innerHTML = `${lines[i]["Model Name"]}<i class="val">${senstivity}%</i>`;
    document
      .getElementById(`sc${i + 1}1`)
      .setAttribute("aria-valuenow", parseInt(senstivity));
    
    // Setting Specificity for side bar graph
    let specificity = parseFloat(parseFloat(lines[i]["Specificity"]) * 100).toFixed(2);
    document.getElementById(
      `spc${i + 1}0`
    ).innerHTML = `${lines[i]["Model Name"]}<i class="val">${specificity}%</i>`;
    document
      .getElementById(`spc${i + 1}1`)
      .setAttribute("aria-valuenow", parseInt(specificity));
  }
  drawCharts(lines);
}

var tem;

function drawCharts(lines) {
  const labels = [];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        fill: true,
        backgroundColor: "rgba(231, 76, 60, 0.5)",
        borderColor: "rgb(231, 76, 60)",
        data: [0,0,0,0,0,0],
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      plugins: {
        tooltip: {
           callbacks: {
            label: function(context) {
              let label = '  ';
              
              if (context.parsed.y !== null) {
                  label += parseFloat(context.parsed.y).toFixed(4);
              }
              return label;
             }
           }
        }
      },
      scales: {
        y: {
          min: 0.70,
          ticks: {
              stepSize: 0.01
          },
          title: {
            display: true,
            text: 'Correctness'
          }
        }
      }
    },
  };

  for (var i = 0; i < lines.length-1; i++) {
    labels.push(lines[i]["Model Name"]);
  }
  for(let i=1; i<7; i++) {
    let chartStatus = Chart.getChart("myChart" + `${i}`);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
 }

  // for accuracy
  data['datasets'][0]['label'] = "Accuracy";
  data['datasets'][0]['backgroundColor'] = "rgba(231, 76, 60, 0.5)";
  data['datasets'][0]['borderColor'] = "rgb(231, 76, 60)";
  for (var i = 0; i < lines.length-1; i++) {
    data["datasets"][0]["data"][i] =parseFloat(lines[i]["Accuracy"]);
  }
  tem = data;
  const myChart1 = new Chart(
    document.getElementById('myChart1'),
    config
  );
  
  // for Recall Score
  data['datasets'][0]['label'] = "Recall Score";
  for (var i = 0; i < lines.length-1; i++) {
    data["datasets"][0]["data"][i] =parseFloat(lines[i]["Recall Score"]);
  }
  tem = data;
  const myChart3 = new Chart(
    document.getElementById('myChart3'),
    config
  );

  // for Precision
  data['datasets'][0]['label'] = "Precision Score";
  data['datasets'][0]['backgroundColor'] = "rgba(255, 99, 132, 0.5)";
  data['datasets'][0]['borderColor'] = "rgb(255, 99, 132)";
  for (var i = 0; i < lines.length-1; i++) {
    data["datasets"][0]["data"][i] =parseFloat(lines[i]["Precision Score"]);
  }
  tem = data;
  const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config
  );

  // for F1Score
  data['datasets'][0]['label'] = "F1Score";
  for (var i = 0; i < lines.length-1; i++) {
    data["datasets"][0]["data"][i] =parseFloat(lines[i]["F1Score"]);
  }
  tem = data;
  const myChart4 = new Chart(
    document.getElementById('myChart4'),
    config
  );
 
  // for sensitivity 
  data['datasets'][0]['label'] = "Sensitivity";
  for (var i = 0; i < lines.length-1; i++) {
    data["datasets"][0]["data"][i] =parseFloat(lines[i]["Sensitivity"]);
  }
  tem = data;
  const myChart5 = new Chart(
    document.getElementById('myChart5'),
    config
  );
  
  // for specificity 
  data['datasets'][0]['label'] = "Specificity";
  for (var i = 0; i < lines.length-1; i++) {
    data["datasets"][0]["data"][i] =parseFloat(lines[i]["Specificity"]);
  }
  tem = data;
  const myChart6 = new Chart(
    document.getElementById('myChart6'),
    config
  );
}

// Get the modal
var modal1 = document.getElementById("myModal1");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var modal4 = document.getElementById("myModal4");
var modal5 = document.getElementById("myModal5");
var modal6 = document.getElementById("myModal6");
var modal7 = document.getElementById("myModal7");
var modal8 = document.getElementById("myModal8");
var modal9 = document.getElementById("myModal9");

// Get the button that opens the modal
var btn1 = document.getElementById("myBtn1");
var btn2 = document.getElementById("myBtn2");
var btn3 = document.getElementById("myBtn3");
var btn4 = document.getElementById("myBtn4");
var btn5 = document.getElementById("myBtn5");
var btn6 = document.getElementById("myBtn6");
var btn7 = document.getElementById("myBtn7");
var btn8 = document.getElementById("myBtn8");
var btn9 = document.getElementById("myBtn9");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];
var span2 = document.getElementsByClassName("close2")[0];
var span3 = document.getElementsByClassName("close3")[0];
var span4 = document.getElementsByClassName("close4")[0];
var span5 = document.getElementsByClassName("close5")[0];
var span6 = document.getElementsByClassName("close6")[0];
var span7 = document.getElementsByClassName("close7")[0];
var span8 = document.getElementsByClassName("close8")[0];
var span9 = document.getElementsByClassName("close9")[0];


// When the user clicks on the button, open the modal
btn1.onclick = function() {
  modal1.style.display = "block";
}
btn2.onclick = function() {
  modal2.style.display = "block";
}
btn3.onclick = function() {
  modal3.style.display = "block";
}
btn4.onclick = function() {
  modal4.style.display = "block";
}
btn5.onclick = function() {
  modal5.style.display = "block";
}
btn6.onclick = function() {
  modal6.style.display = "block";
}
btn7.onclick = function() {
  modal7.style.display = "block";
}
btn8.onclick = function() {
  modal8.style.display = "block";
}
btn9.onclick = function() {
  modal9.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal1.style.display = "none";
}
span2.onclick = function() {
  modal2.style.display = "none";
}
span3.onclick = function() {
  modal3.style.display = "none";
}
span4.onclick = function() {
  modal4.style.display = "none";
}
span5.onclick = function() {
  modal5.style.display = "none";
}
span6.onclick = function() {
  modal6.style.display = "none";
}
span7.onclick = function() {
  modal7.style.display = "none";
}
span8.onclick = function() {
  modal8.style.display = "none";
}
span9.onclick = function() {
  modal9.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
  if (event.target == modal4) {
    modal4.style.display = "none";
  }
  if (event.target == modal5) {
    modal5.style.display = "none";
  }
  if (event.target == modal6) {
    modal6.style.display = "none";
  }
  if (event.target == modal7) {
    modal7.style.display = "none";
  }
  if (event.target == modal8) {
    modal8.style.display = "none";
  }
  if (event.target == modal8) {
    modal9.style.display = "none";
  }
}
});