/**
 * Main JS file for project.
 */

/**
 * Define globals that are added through the js.globals in
 * the config.json file, here, mostly so linting won't get triggered
 * and its a good queue of what is available:
 */
// /* global $, _ */

// Dependencies
import utils from './shared/utils.js';

// import d3 from 'd3';
import c3 from 'c3';

import rows from '../sources/names.json';
import rows20b from '../sources/top20_boys.json';
import rows20g from '../sources/top20_girls.json';
import rowstb from '../sources/trend_boys.json';
import rowstg from '../sources/trend_girls.json';

var data = rows.names;
var data20b = rows20b.tops;
var data20g = rows20g.tops;
var datatb = rowstb.change;
var datatg = rowstg.change;

// Mark page with note about development or staging
utils.environmentNoting();

/**
 * Adding dependencies
 * ---------------------------------
 * Import local ES6 or CommonJS modules like this:
 * import utilsFn from './shared/utils.js';
 *
 * Or import libraries installed with npm like this:
 * import module from 'module';
 */


/**
 * Adding Svelte templates in the client
 * ---------------------------------
 * We can bring in the same Svelte templates that we use
 * to render the HTML into the client for interactivity.  The key
 * part is that we need to have similar data.
 *
 * First, import the template.  This is the main one, and will
 * include any other templates used in the project.
 *
 *   `import Content from '../templates/_index-content.svelte.html';`
 *
 * Get the data parts that are needed.  There are two ways to do this.
 * If you are using the buildData function to get data, then add make
 * sure the config for your data has a `local: "content.json"` property
 *
 *  1. For smaller datasets, just import them like other files.
 *     `import content from '../assets/data/content.json';`
 *  2. For larger data points, utilize window.fetch.
 *     `let content = await (await window.fetch('../assets/data/content.json')).json();`
 *
 * Once you have your data, use it like a Svelte component:
 *
 * const app = new Content({
 *  target: document.querySelector('.article-lcd-body-content'),
 *  hydrate: true,
 *  data: {
 *    content
 *  }
 * });
 */



// Common code to get svelte template loaded on the client and hack-ishly
// handle sharing
//
// import Content from '../templates/_index-content.svelte.html
//
// $(document).ready(() => {
//   // Hack to get share back
//   let $share = $('.share-placeholder').size()
//     ? $('.share-placeholder')
//       .children()
//       .detach()
//     : undefined;
//   let attachShare = !$share
//     ? undefined
//     : () => {
//       $('.share-placeholder').append($share);
//     };

//   // Main component
//   const app = new Content({
//     target: document.querySelector('.article-lcd-body-content'),
//     hydrate: true,
//     data: {
//       attachShare
//     }
//   });
// });


$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    } else {
        return null;
    }
}

var selected = $.urlParam('chart');

if (selected == "all"){
    $(".slide").show();
}
else if (selected != null) {
    // $(".slide").hide();
    $("#" + selected).show();
}

var axis = [];
var dataStreamM = ['M'];
var dataStreamF = ['F'];
axis[0] = 'x';
var indexYear = 1;
var year = 0;
var year2 = 0;
var rate = 0;
var rate2 = 0;
var birthNum = 0;
var birthNum2 = 0;

for (var j=1910; j<=2018; j++){
  axis[indexYear] = j;
  dataStreamM[indexYear] = 0;
  dataStreamF[indexYear] = 0;
  indexYear++;
}

function switchChart(name,gender,colors){

  var found = false;
  dataStreamM[0] = name;
  var index = 0;

  for (var i=0; i < data.length; i++){
    if (name == data[i].name && data[i].gender == "M"){
      found = true;
      index = i;
      for (var k=1; k < dataStreamM.length; k++){
        if (data[index].name != name){ break; }
        if (axis[k] == data[index].year) { 
          dataStreamM[k] = data[index].rate; 
          rate = data[index].rate;
          year = data[index].year;
          birthNum = data[index].births;
          index++; 
        }
      }
      // break;
  }
}

index = 0;

  for (var i=0; i < data.length; i++){
    if (name == data[i].name && data[i].gender == "F"){
      found = true;
      index = i;
      for (var k=1; k < dataStreamF.length; k++){
        if (data[index].name != name){ break; }
        if (axis[k] == data[index].year) { 
          dataStreamF[k] = data[index].rate; 
          rate2 = data[index].rate;
          year2 = data[index].year;
          birthNum2 = data[index].births;
          index++; 
        }
      }
      // break;
  }
}




dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamM[dataStreamM.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
axis[axis.length] = "2019";
axis[axis.length] = "2020";
axis[axis.length] = "2021";
axis[axis.length] = "2022";
axis[axis.length] = "2023";
axis[axis.length] = "2024";
axis[axis.length] = "2025";
axis[axis.length] = "2026";
axis[axis.length] = "2027";
axis[axis.length] = "2028";
axis[axis.length] = "2029";
axis[axis.length] = "2030";

if (year != 2018) {
          rate = 0;
          year = 2018;
          birthNum = 0;
}

if (year2 != 2018) {
          rate2 = 0;
          year2 = 2018;
          birthNum2 = 0;
}

$("#infobox").html('<div class="chart-tooltip">' +
  '<div class="tooltip-label">' + year + '</div></div>' +
  '<div class="chart-tooltip"><div class="tooltip-label">Rate</div>' + 
  '<div class="tooltip-value" style="color:#E07242;font-weight:900;">' + d3.format(".1f")(rate) + '</div></div>' +
  '<div class="chart-tooltip"><div class="tooltip-label">Births</div>' +
  '<div class="tooltip-value">' + d3.format(",")(birthNum) + '</div>' +
  '</div>');

$("#infobox2").html('<div class="chart-tooltip ">' +
    '<div class="tooltip-label">' + year2 + '</div></div>' +
    '<div class="chart-tooltip"><div class="tooltip-label">Rate</div>' + 
    '<div class="tooltip-value" style="color:#857AAA;font-weight:900;">' + d3.format(".1f")(rate2) + '</div></div>' +
    '<div class="chart-tooltip"><div class="tooltip-label">Births</div>' +
    '<div class="tooltip-value">' + d3.format(",")(birthNum2) + '</div>' +
    '</div>');

if (found == true){

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var share = "#B0BEC5";

var chart = c3.generate({
        bindto: '#chart',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            axis,
            dataStreamM,
            dataStreamF
        ],
        type: 'line'
    },
    color:  {  pattern: ["#E07242","#857AAA"] },
        legend: {
            show: false
        },
        line: {
            connectNull: true,
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2018) { return 4.5;} else { return 2; } }
        },
    axis: {
      y: {
            min: 0,
            padding: {bottom: 0},
            tick: {
             count: 4,
             format: d3.format('.1f')
            }
        },
        x: {
        	padding: {right: 0, left: 0},
            tick: {
                values: [1910, 1940, 1970, 2000, 2030],
                count: 4,
                multiline: false
            }
          }
        },
        grid: {
            focus:{
                show:false
              },
              x: {
                lines: [{
                    value: 2018,
                    text: '',
                    position: 'end',
                    class: 'powerline'
                }]

            }
          },
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {

        var birthNum = 0;
        var birthNum2 = 0;

        for (var k=0; k < data.length; k++){
          if (data[k].name == name && data[k].year == d[0].x && data[k].gender == "M"){
            birthNum = data[k].births;
            break;
          }
        }

        for (var w=0; w < data.length; w++){
          if (data[w].name == name && data[w].year == d[0].x && data[w].gender == "F"){
            birthNum2 = data[w].births;
            break;
          }
        }
        console.log(d[1].value);

          $("#infobox").html('<div class="chart-tooltip">' +
            '<div class="tooltip-label">' + d[0].x + '</div></div>' +
            '<div class="chart-tooltip"><div class="tooltip-label">Rate</div>' + 
            '<div class="tooltip-value" style="color:#E07242;font-weight:900;">' + defaultValueFormat(d[0].value) + '</div></div>' +
            '<div class="chart-tooltip"><div class="tooltip-label">Births</div>' +
            '<div class="tooltip-value">' + d3.format(",")(birthNum) + '</div>' +
            '</div>');

          $("#infobox2").html('<div class="chart-tooltip ">' +
            '<div class="tooltip-label">' + d[1].x + '</div></div>' +
            '<div class="chart-tooltip"><div class="tooltip-label">Rate</div>' + 
            '<div class="tooltip-value" style="color:#857AAA;font-weight:900;">' + defaultValueFormat(d[1].value) + '</div></div>' +
            '<div class="chart-tooltip"><div class="tooltip-label">Births</div>' +
            '<div class="tooltip-value">' + d3.format(",")(birthNum2) + '</div>' +
            '</div>');

        }
      }
});
}
else { $("#current").html("<div id='notfound'>Name not found</div>"); }

}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results != null) { return results[1]; }
  else { return 0; }
}

var name = "";
var gender = "";
var colorMe = "";

if ($.urlParam('name') != 0 ) { 
  name = toTitleCase($.urlParam('name')); 
  gender = String($.urlParam('gender')).toUpperCase();
//   var genderStatus = gender; 
//   $("#" + gender).addClass("selected");
  if (gender == "M") { colorMe = "#E07242"; }
  else  { colorMe = "#857AAA"; }
  $("#named, #named2").html(name);
  // $("#gender").html(sex);
  // $(".sex").html(genderfull);
  // $("#named, #rate, #named2, .sex").css("color",colorMe);
} else {
    name = "Evelyn";
    gender = "F";
    colorMe = "#857AAA";
    $("#named, #named2").html(name);
}

    switchChart(name,gender,colorMe);

  $( document ).ready(function() {
    $(".switch").click(function()  { 
       genderStatus = $(this).attr("data");
       $(".switch").removeClass("selected");
       $(this).addClass("selected");
    });

   $('#filter_box').keyup(function(e){
        if(e.keyCode == 13)
        {
          // window.location.href = './?name=' + $('#filter_box').val() + '&gender=' + genderStatus;
          window.location.href = './?chart=lookup&name=' + $('#filter_box').val();
        }
    });
});

//top 20 boys
  for (var i=0; i < data20b.length; i++){
    $("#namesList").append('<div class="chart-tooltip"><div class="tooltip-label">' + data20b[i].NAME + '</div>' + 
            '<div class="tooltip-value" style="color:#E07242;font-weight:900;">' + d3.format(".1f")(data20b[i].RatePer10k) + '</div></div>');
  }

//top 20 girls
  for (var i=0; i < data20g.length; i++){
    $("#namesList2").append('<div class="chart-tooltip"><div class="tooltip-label">' + data20g[i].NAME + '</div>' + 
            '<div class="tooltip-value" style="color:#857AAA;font-weight:900;">' + d3.format(".1f")(data20g[i].RatePer10k) + '</div></div>');
  }

    function chartTypeM() {

        var padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 60,
        };

        var chartType = c3.generate({
            bindto: "#namesGrid",
            padding: padding,
            data: {
                x: 'x',
                columns: [
                    ['x', "Rhett","Bjorn","Case","Arlo","Atlas","Dax","Bodhi","Mahir","Finnley","Remy","Lachlan","Theo","Hendrix","Wade","Muad","Sage","Maverick","Harlan","Zain","Winston","Barrett","Finley","Bilal","Conor","Wilder"],
                    ['value', 6.188,4.222,4.222,4.087,3.833,3.667,3.389,3.333,3.24,2.952,2.778,2.696,2.655,2.556,2.48,2.333,2.259,2.167,2.167,2.139,2.043,2.033,2,1.944,1.944]
                ],
                type: 'bar',
                labels: {
                    format: {
                        'value': d3.format('+.0%')
                    }
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: false
            },
            color: {
                pattern: ['#E07242']
            },
            axis: {
                rotated: true,
                y: {
                    max: 15,
                    min: 0,
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 8,
                        values: [0, 5, 10, 15],
                        format: d3.format('+.0%')
                    }
                },
                x: {
                    type: 'category',
                    tick: {
                        multiline: false
                    }
                }
            },
            grid: {
                focus:{
                    show:false
                  },
              }
        });
    }

    chartTypeM();


    function chartTypeF() {

            var padding = {
                top: 20,
                right: 60,
                bottom: 20,
                left: 60,
            };

            var chartType = c3.generate({
                bindto: "#namesGrid2",
                padding: padding,
                data: {
                    x: 'x',
                    columns: [
                        ['x', "Thea","Adaline","Everleigh","Lennon","Everly","Zara","Remi","Leilani","Margot","Magnolia","River","Luna","Marwa","Sloane","Nova","Raelynn","Blake","Ophelia","Loretta","Rosie","Rowan","Elaine","Poppy","Veda","Harley"],
                        ['value', 5.931,5.333,4.524,4.524,4.176,3.905,3.714,3.44,3.138,3.12,3.03,2.98,2.96,2.935,2.914,2.913,2.879,2.857,2.667,2.667,2.621,2.286,2.286,2.286,1.966]
                    ],
                    type: 'bar',
                    labels: {
                        format: {
                            'value': d3.format('+.0%')
                        }
                    }
                },
                legend: {
                    show: false
                },
                tooltip: {
                    show: false
                },
                color: {
                    pattern: ['#857AAA']
                },
                axis: {
                    rotated: true,
                    y: {
                        max: 15,
                        min: 0,
                        padding: {
                            bottom: 0,
                            top: 0
                        },
                        tick: {
                            count: 8,
                            values: [0, 5, 10, 15],
                            format: d3.format('+.0%')
                        }
                    },
                    x: {
                        type: 'category',
                        tick: {
                            multiline: false
                        }
                    }
                },
                grid: {
                    focus:{
                        show:false
                      },
                  }
            });
        }

        chartTypeF();