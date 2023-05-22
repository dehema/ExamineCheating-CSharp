var date = new Date();
var min = date.getMinutes();
date.setMinutes(min - (Math.random() * 30 + 30));
timeStamp = date.getTime() - 1000;

var options = {};
var answer = {};
var elems = document.getElementById("testPaper").elements;
for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];
    var answerId = elem.getAttribute("name");
    var num = elem.getAttribute("num");
    var qId = elem.getAttribute("qid");
    var answerValue = "";
    var classname = jQuery(elem).attr('class');

    if (classname == "objText") {
        var checkboxs = document.getElementsByName(answerId);
        for (var j = 0; j < checkboxs.length; j++) {
            if (checkboxs[j].checked == true) {
                answerValue = answerValue + jQuery.trim(checkboxs[j].value) + ";";
            }
        }
        if (options[qId] == null) {
            options[qId] = [];
        }
        //阅读理解小题
        if (options[qId][num] == null) {
            options[qId][num] = 1;
        }
        else {
            options[qId][num]++;
        }
        answerValue = Math.ceil(Math.random() * options[qId][num]);
        if (answer[qId] == null) {
            answer[qId] = {};
            answer[qId]["id"] = qId;
            answer[qId]["studentAnswer"] = [];
        }
        answer[qId]["studentAnswer"][num] = answerValue + ";";
    } else if (classname == "subText") {
        answerValue = elem.value;
        if (answer[qId] == null || answer[qId] == "") {
            answer[qId] = {};
            answer[qId]["id"] = qId;
            answer[qId]["studentAnswer"] = [];
            answer[qId]["studentAnswer"][num] = answerValue;
        } else {
            answer[qId]["studentAnswer"][num] = answerValue;
        }
    }
}

console.log(
    "function sendAnswer() " + "{" + "\njQuery.post('studyPaper_writeTestSave.do', " + '{\n'
    + "answerString: '" + JSON.stringify(answer) + "',\n" +
    "courseId: '" + courseId + "',\n" +
    "testId: '" + testId + "',\n" +
    "paperId: '" + paperId + "',\n" +
    "testrecordId: '" + testrecordId + "',\n" +
    "samepaper: '" + samepaper + "',\n" +
    "startTime: '" + timeStamp + "',\n" +
    "passScore: '" + passScore + "',\n" +
    "paperType: '" + paperType + "',\n" +
    "studyrecordId: '" + studyrecordId + "'"
    + '}' + ", \nfunction (data, textStatus, xhr)" + '{\n' +
    "console.log(data)" + ';\n}\n);}\nsendAnswer();'
);