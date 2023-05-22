using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ExamineCheating_CSharp
{
    public class ExamineResponse
    {
        public string success;
        public string result;
        public string msg;
        public string data;
    }

    public class ExamineAnswer
    {
        /// <summary>
        /// 题序
        /// </summary>
        public string name;
        /// <summary>
        /// 答案选项 1/2/3/4
        /// </summary>
        public List<int> answer = new List<int>();
    }


    class Program
    {
        static string projectPath;
        /// <summary>
        /// 【欺骗请求】的 json 回调文本
        /// </summary>
        static string examineResponseTxt;
        /// <summary>
        /// 答案数据字段
        /// </summary>
        static List<ExamineAnswer> examineAnswers = new List<ExamineAnswer>();

        static void Main(string[] args)
        {
            projectPath = System.IO.Directory.GetCurrentDirectory();
            LoadExamineResponse();
            GetExamineAnswers();
            CreateCheatingJSCode();
        }

        //读取【欺骗请求】的 json 回调
        public static void LoadExamineResponse()
        {
            projectPath = projectPath.Substring(0, projectPath.IndexOf("\\bin")) + "\\";
            //Console.WriteLine(projectPath);
            string jsonPath = projectPath + "res\\AnswerResponse.json";
            examineResponseTxt = File.ReadAllText(jsonPath);
            //Console.Write(examineResponseTxt);
            //解析文件
        }

        /// <summary>
        /// 获取答案字段
        /// </summary>
        public static void GetExamineAnswers()
        {
            ExamineResponse examineRes = JsonConvert.DeserializeObject<ExamineResponse>(examineResponseTxt);
            //Console.Write(examineRes.data);
            string[] answerTxt = examineRes.data.Split("标准答案:</td><td>");
            //实例答案数据
            for (int i = 0; i < answerTxt.Length; i++)
            {
                ExamineAnswer examineAnswer = new ExamineAnswer();
                string answers = answerTxt[i].Split("<")[0];
                if (answers.Contains("A"))
                {
                    examineAnswer.answer.Add(0);
                }
                if (answers.Contains("B"))
                {
                    examineAnswer.answer.Add(1);
                }
                if (answers.Contains("C"))
                {
                    examineAnswer.answer.Add(2);
                }
                if (answers.Contains("D"))
                {
                    examineAnswer.answer.Add(3);
                }
                if (examineAnswer.answer.Count > 0)
                {
                    examineAnswers.Add(examineAnswer);
                }
            }
            //for (int i = 0; i < answerTxt.Length; i++)
            //{
            //    Console.WriteLine("------>" + answerTxt[i]);
            //}
        }

        /// <summary>
        /// 生成欺骗JS代码
        /// </summary>
        public static void CreateCheatingJSCode()
        {
            //生成js代码粘贴到控制台 确认 上自动提交
            string generatingCodeJs = projectPath + "Code\\js\\GeneratingCode.js";
            if (!File.Exists(generatingCodeJs))
            {
                File.Create(generatingCodeJs);
            }
            //文本如下
            StringBuilder answerStr = new StringBuilder();
            answerStr.Append("[");
            foreach (ExamineAnswer examineAnswer in examineAnswers)
            {
                foreach (var answer in examineAnswer.answer)
                {
                    answerStr.Append(answer);
                    answerStr.Append(",");
                }
                answerStr.Remove(answerStr.Length - 1, 1);
                answerStr.Append("]");
                answerStr.Append(",[");
            }
            answerStr.Remove(answerStr.Length - 1, 1);
            answerStr.Remove(answerStr.Length - 1, 1);
            string template = File.ReadAllText(projectPath + "res\\GeneratingCodeTemplate.js");
            template = template.Replace("#answerStr#", answerStr.ToString());
            File.WriteAllText(generatingCodeJs, template);
            Console.WriteLine("代码生成完毕,路径->" + generatingCodeJs);
        }
    }
}
