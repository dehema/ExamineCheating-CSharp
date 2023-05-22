// 粘贴到控制到输出即可
function sendAnswer() {
    jQuery.post('studyPaper_writeTestSave.do', {
        answerString: '{"116853":{"id":"116853","studentAnswer":[""]},"116877":{"id":"116877","studentAnswer":[""]},"116878":{"id":"116878","studentAnswer":[""]},"116881":{"id":"116881","studentAnswer":[""]},"116885":{"id":"116885","studentAnswer":[""]},"116902":{"id":"116902","studentAnswer":[""]},"116933":{"id":"116933","studentAnswer":[""]},"116934":{"id":"116934","studentAnswer":[""]},"116937":{"id":"116937","studentAnswer":[""]},"116942":{"id":"116942","studentAnswer":[""]},"116953":{"id":"116953","studentAnswer":[""]},"116954":{"id":"116954","studentAnswer":[""]},"116955":{"id":"116955","studentAnswer":[""]},"116960":{"id":"116960","studentAnswer":[""]},"116964":{"id":"116964","studentAnswer":[""]},"116973":{"id":"116973","studentAnswer":[""]},"117012":{"id":"117012","studentAnswer":[""]}}',
        courseId: '8d36ab52-7685-4295-9fa6-7e34c7547950',
        testId: '1220608005',
        paperId: 'T202102271331110000',
        testrecordId: '1221854151',
        samepaper: '2',
        startTime: '1617181567395',
        passScore: '60',
        paperType: 'null',
        studyrecordId: '1221755333'
    },
        function (data, textStatus, xhr) {
            console.log('返回的数据为' + data);
        }
    );
}
sendAnswer();