# v2QaHelper
QA toolbar for surveys in testing mode

Tool converted from book marklets to a toolbar for the use in surveys in testing mode.

Based on this document:
https://docs.google.com/document/d/123PVrd6m-GcxhM6NQAr6K82mZPc1U80HRG2wue9NncA/edit

js folder contains the necessary files to be added to the static folder
css folder the qaTool.css needed
nstyles folder the nstyles file which can be added to any existing nstyles file or as a stand alone.

set this alias to run in any survey folder:
```
alias addQAtools="git clone 'https://github.com/krasserp/v2QaHelper.git'; cp v2QaHelper/js/*.js ./static; cat v2QaHelper/nstyles/nstyles >> nstyles; cat v2QaHelper/css/qaTool.css >> static/qaTool.css; reload ."
```

recommended 
compat="128"
needs font-awesome


Demo here:
https://v2.decipherinc.com/survey/selfserve/1705/meshTemplates/qaTool?_dj
