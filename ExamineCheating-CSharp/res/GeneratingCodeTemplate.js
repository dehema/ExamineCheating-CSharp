var rightAnswers = [#answerStr#];
var ques = [];
var inputs = document.getElementsByTagName("Input");
var que = [];
for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i]
    if (input.type == "radio") {
        if (input.value == 1) {
            que = new Array()
            ques.push(que);
        }
        que.push(input);
    }
}
var queIndex = 0;
var optionIndex = 0;
for (var que of ques) {
    var optionIndex = 0;
    for (var input of que) {
        //console.log(queIndex + "-" + optionIndex + "name:" + input.name)
        for (var rightAnswer of rightAnswers[queIndex]) {

            if (rightAnswer == optionIndex) {
                input.click();
            }
        }
        optionIndex++;
    }
    queIndex++;
}
document.getElementById("submitAnswer").click();
