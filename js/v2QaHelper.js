(function ( $ ) {
/**
 * [qaHelper description] = Allows QA funnctions to be accessed via a toolbar links and or by keyboard short cuts
 * dependant on https://cdnjs.cloudflare.com/ajax/libs/tinysort/2.2.2/tinysort.js
 * @param  {[type]} options [the id's where to add the QA functions to ie. link in a toolbar box]
 * @return {[type]}         [fun]
 */
  $.fn.qaHelper = function(options) {

        // basic IE console error prevention
        if(typeof(console) === 'undefined') {
          console = function(){};
          console.log = function(){
            consoleMsg();
          };
        }
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.

            'antiRandomize': '#antiRandomize',
            'checker':'#checker',
            'sel2d' : '#2d',
            'shareState': '#shareState',
            'autoSubTb' : '#autoSubTb',
            'fillText':'#fillText',
            'downloadData': '#downloadData',
            'goToQuestionPlease': '#goToQuestionPlease',
            'skipQuestion': '#skipQuestion',
            'make100Percent': '#make100Percent'
          },
          options );


        var init = function(){
          antiRandomize(settings.antiRandomize);
          checker(settings.checker);
          sel2d(settings.sel2d);
          shareState(settings.shareState);
          autoSubTb(settings.autoSubTb);
          insertValue(settings.fillText);
          downloadData(settings.downloadData);
          goToQuestionPlease(settings.goToQuestionPlease);
          skipQuestion(settings.skipQuestion);
          make100Percent(settings.make100Percent);
          returnKeyMap();
        };



        var returnKeyMap= function(){
          var shift = false, q = false;
          var addKeys = [
              83,  //s
              67,  //c
              76,  //l
              65,  //a
              13,  // enter
              73,  // i
              68,  // d
              71,  // g
              13, // enter
              49  // 1
              ];

              $(document).keyup(function(e) {
                if(e.which == 16) {
                  shift = false;
                }
              });

              $(document).keyup(function(e) {
                if(e.which == 81) {
                  q = false;
                }
              });

              $(document).keydown(function(e) {
                if(e.which == 16) {
                  shift = true;
                }
              });

              $(document).keydown(function(e) {
                if(e.which == 81) {
                  q = true;
                }
                if(shift && q && addKeys.indexOf(e.which) > -1) {
                 mapKeyFunction(addKeys.indexOf(e.which));
               }

             });

            };



            var mapKeyFunction = function(index){
              var funcArray = [
              fantiRandomize,
              fchecker,
              fsel2d,
              fshareState,
              fautoSubTb,
              finsertValue,
              fdownloadData,
              fgoToQuestionPlease,
              fautoSubTb,
              fmake100Percent
              ];
              return funcArray[index]();
            };



            var generateData = function(){
              var choice,name,item,items,el,seenRadio=[],x;
              function randomChoice(range){return Math.floor(Math.random()*range);}
              function fillOE(name){
                var oeInput=$("input[name='"+name+"']:checked").parent().siblings().find("input[name^='oe']");
                if(oeInput.length){oeInput.val(randomString(10));
                }
              }
              function randomFormItem(form,name){
                var choice,item,items=form[name];
                if(items.length){
                  choice=randomChoice(items.length);
                  item=items[choice];
                }else{
                  item=items;
                }
                return item;
              }
              var form=document.forms[0];
              var fun=function(){
                return 1;
              };
              for(x=0;x<form.length;x=x+1){
                el=form[x];
                if(el.name.match(/^oe/)||el.name.match(/^extraOE/)){
                  el.value="";
                }
              }
              for(x=0;x<form.length;x=x+1){
                el=form[x];
                var prefix;
                var tag=el.tagName.toLowerCase();
                if(tag!=="input"&&tag!=="textarea"&&tag!=="select"){
                  continue;
                }
                if(el.name.match(/^ev-/)){
                  if(seenRadio[el.name]){
                    continue;
                  }
                  seenRadio[el.name]=true;
                  item=randomFormItem(form,el.name);item.checked=true;
                  continue;
                }
                if(el.name.match(/^(ans(\d+))\.(\d+)\.(\d+)/)){
                  prefix=el.name.match(/^(ans(\d+))\.(\d+)\.(\d+)/);
                }else{
                  continue;
                }
                var qn=prefix[2];
                var row=prefix[4];
                prefix=prefix[1];
                var type=el.type;


                if(el.type==="radio"&&type==="radio"){
                  if(seenRadio[el.name]){
                    continue;
                  }
                  seenRadio[el.name]=true;
                  item=randomFormItem(form,el.name);
                  name=item.name;
                  item.checked=true;
                  if($ && $.prototype.trigger){
                    $("input[name='"+name+"']").trigger("change");
                  }
                  fillOE(item.name);
                }
                else
                {
                  if(el.type==="checkbox"){
                    if(randomChoice(5)===0){
                      el.checked=true;
                      fillOE(el.name);
                    }else{
                      el.checked=false;
                    }if($ && $.prototype.trigger){
                      $(el).trigger("change");
                    }
                  }else{
                    if(el.type==="textarea"||type==="text"){
                      el.value=randomString(20);
                    }
                    else{
                      if(tag==="select"){
                        el.selectedIndex=1+randomChoice(el.options.length-1);
                        if($ && $.prototype.trigger){
                          $(el).trigger("change");}
                        }else{if(type==="number"){
                          el.value=fun();
                          if($ && $.prototype.trigger){
                            $(el).trigger("change");
                          }
                        }
                      }
                    }
                  }
                }
              }
            };


/**
 * All functions so they can be mapped to keys and click events
 * 
 */

 function fantiRandomize(){
  $('div[id^="question_"]').each(function(){
    currentType =$('#'+$(this).attr('id')+' tr.row.row-elements').find('input').type;
    if(currentType ==='checkbox'){
      tinysort('#'+$(this).attr('id')+' tr.row.row-elements',{selector:'input',attr:'name'});
    }
    if(currentType ==='radio'){
      tinysort('#'+$(this).attr('id')+' tr.row.row-elements',{selector:'input',attr:'value'});
    }
  });
}

function fchecker(){
  $('.survey-q-grid input[type=checkbox]:not(.exclusive)').click();
}

function fsel2d(){
  var questionID = prompt('Question label?');
  var index=prompt("Index?");
  index--;
  $('#question_'+questionID+' tr.even,tr.odd').each(function()
  {
    $('iput:radio:eq('+index+')').each(function(){
      $(this).click();
    }); 
    $(this).find('td span.fir-icon').removeClass('selected');
    $(this).find('td:eq('+(parseInt(index,10)+1)+') span.fir-icon').addClass('selected');
  });
}


function fshareState(){
 var st = $("input[name='state']").attr("value");
 window.open(window.location +'?state=' + st);
}

function fautoSubTb(){
  generateData();
  document.forms[0].submit();
}

function finsertValue(){
  var value = prompt('Value:', '0');
  $('input[ type=\'text\' ]').val(value);
}

function fdownloadData(){
  var p = confirm('For qualifieds only, click OK. For all respondents, click Cancel.');
  var c = (p) ? 'qualified' : 'all';
  var gvpath=gv.survey.path;
  var s = gv.survey.path || prompt('Project number (e.g. abc/abc12345):');
  var f = prompt('Please enter the dataset column labels/headers for each column you would like to download, separated only by a comma. (e.g.record,date,status)');
  var ff = (null == f || f.length < 1) ? '' : f;fx = (null == f || f.length < 1) ? '' : '&fields=';n = '/rep/' + s + ':excel?format=xlsx&config=' + c + fx + ff; 
  window.location = n;
}

function fgoToQuestionPlease(){
 try{
   var gvpath=gv.survey.path;
   var whatQ=prompt('What question(e.g. Q1)?');
   var gvQ= (whatQ == null || !whatQ.length) ? '' : whatQ;

   if(gvQ.length){
     n='https://v2.decipherinc.com/survey/'+gvpath+'?debug=flow,respview&start-at='+gvQ+'&stop-at='+gvQ;window.open(n);void(0);
   } else 
   {
     void(0);
   }
 }catch(e){
   var whatP  = prompt('What path(e.g. abc/abc11001)?');
   var whatQ  = prompt('What question(e.g. Q1)?');
   var gvpath = (whatP == null || !whatP.length) ? '' : whatP;
   var gvQ    = (whatQ == null || !whatQ.length) ? '' : whatQ;
   if(gvpath.length&&gvQ.length){
     var n='https://v2.decipherinc.com/survey/'+gvpath+'?debug=flow,respview&start-at='+gvQ+'&stop-at='+gvQ;
     window.open(n);void(0);
   } else {
     void(0);
   }
 }
}

function fmake100Percent(){
  $(".number").each(
    function() {
      var all_inputs = $(this).find(".element input[type=text]"),
      count = all_inputs.length,
      random_numbers = [],
      diff = 0; 
      for (var i = 0; i < count; i++) {
        random_numbers.push(Math.abs(Math.floor(Math.random() * 10)));
      }
      var total = random_numbers.reduce(function(a, b) {
        return a + b;
      });
      if (total != 100){
        var toShortAbout = 100 - total;
        var addThis = random_numbers[random_numbers.length-1] + toShortAbout;
        random_numbers[random_numbers.length-1]  = addThis;
      }

      for (var i = 0; i  < count; i++){
        $(all_inputs[i]).val(random_numbers[i]).trigger('change');
      }
    });
  //$(".continue, .finish").click();
}

var antiRandomize = function(item){
  $(item).click(function(){
    fantiRandomize();}
    );
};

var checker= function(item){
  $(item).click(function(){
    fchecker();}
    );
};

var sel2d = function(item){
  $(item).click(
    function(){
      fsel2d();
    });
};

var shareState= function(item){
  $(item).click(
    function(){
     fshareState();
   });
};

var autoSubTb = function(item){
  $(item).click(
    function(){
      fautoSubTb();
    });
};


var insertValue = function(item) {
  $(item).click(
    function(){
      finsertValue();
    }
    );
};

var downloadData = function(item){
  $(item).click(function(){
    fdownloadData();
  });
};


var goToQuestionPlease = function(item){
 $(item).click(function(){
  fgoToQuestionPlease();
});

};

var skipQuestion = function(item){
  $(item).click(function(){
    fautoSubTb();
  });
};


var make100Percent = function(item){
  $(item).click(function(){
    fmake100Percent();
  });
};




init();

};
}(jQuery));
