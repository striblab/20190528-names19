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

for (var j=1910; j<2018; j++){
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
dataStreamF[dataStreamF.length] = null;
dataStreamF[dataStreamF.length] = null;
axis[axis.length] = "2017";
axis[axis.length] = "2018";
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

if (year != 2017) {
          rate = 0;
          year = 2017;
          birthNum = 0;
}

if (year2 != 2017) {
          rate2 = 0;
          year2 = 2017;
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
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
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
                values: ['1910', '1940', '1970', '2000', '2030'],
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

        for (var k=0; k < data.length; k++){
          if (data[k].name == name && data[k].year == d[0].x && data[k].gender == "F"){
            birthNum2 = data[k].births;
            break;
          }
        }
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

if ($.urlParam('name') != 0 ) { 
  var name = toTitleCase($.urlParam('name')); 
  var gender = String($.urlParam('gender')).toUpperCase();
  var genderStatus = gender; 
  $("#" + gender).addClass("selected");
  if (gender == "M") { var colorMe = "#E07242"; var sex = "boy"; var genderfull="male" }
  else  { var colorMe = "#857AAA";  var sex = "girl"; var genderfull = "female"; }
  $("#named, #named2").html(name);
  // $("#gender").html(sex);
  // $(".sex").html(genderfull);
  // $("#named, #rate, #named2, .sex").css("color",colorMe);
  switchChart(name,gender,colorMe);
} 

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
                    ['x', "Kyrie","Kane","Harvey","Cyrus","Leonard","Maverick","Brooks","Nash","Bodhi","Warren","Knox","Arlo","Theodore","Bilal","Arthur","Finley","Lorenzo","Ali","Izaiah","Lachlan","Luqman","Malakai","Theo","Mateo","Remington"],
                    ['value', 5.1111,4.0000,3.8485,2.8889,2.8889,2.7692,2.4043,2.4043,2.3333,2.3333,2.2558,2.2308,2.2237,2.2000,2.1481,2.0435,1.8000,1.7778,1.7778,1.7778,1.7778,1.7778,1.7660,1.7619,1.7273]
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
                        ['x', "Everly","Nova","Valentina","Margot","Thea","Emersyn","Amina","Haven","Freya","Juniper","Luna","Finley","Wren","Braelynn","Colette","Dorothy","Louise","Asiya","Leilani","Sloane","Zara","Blake","Arya","Hafsa","Zahra"],
                        ['value', 10.6667,4.2000,3.8276,3.8000,3.7368,3.4828,3.4000,3.4000,3.0741,3.0476,2.7349,2.5821,2.4483,2.3333,2.3333,2.3333,2.3333,2.2000,2.2000,2.2000,2.2000,2.0303,1.9310,1.8571,1.8571]
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