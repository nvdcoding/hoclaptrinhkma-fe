// @monaco-editor/react is Monaco editor wrapper for easy/one-line integration with React
// applications without need of webpack (or other module bundler)
// configuration files.

import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useHistory, useParams } from "react-router-dom";
import { ClockLoader as Loader } from "react-spinners";
import "./Exercise.scss";
import { Tabs } from "antd";
import { sendGet, sendPost } from "../../../../utils/api";
import { Collapse, Skeleton, message } from "antd";

const { Panel } = Collapse;
const { TabPane } = Tabs;
export default function Exercise(props) {
  const editorRef = useRef(null);
  const params = useParams();
  let history = useHistory();
  const [excercise, setExcercise] = useState({});
  const [language, setLanguage] = useState("");
  const [temp, setTemp] = useState("");
  const [result, setResult] = useState([]);
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  async function showValue() {
    const data = { answer: editorRef.current?.getValue() };
    const res = await sendPost(`/api/complie/${params.id}/${language}`, data);
    if (res.status === 400) {
      message.error(res.message);
      return;
    }
    if (res.status === 200) {
      setResult(res.data.test.map((e) => e.result));
      if (res.data.isComplete) {
        message.success("Chúc mừng bạn đã giải đúng");
        history.goBack();
      } else {
      }
    }
  }
  async function getExcercise() {
    const res = await sendGet(`/api/excercise/${params.id}`);

    if (res.status === 200) {
      setExcercise(res.data);
      const language = await sendGet(`/api/lesson/getOne/${res.data.lesson}`);
      if (language.status === 200) {
        setLanguage(language.data);
        if (language.data === "nodejs") {
          setTemp("function resolve(){\n//Viet code o day nhe\n\n}");
        } else {
          setTemp("");
        }
      }
    }
  }
  // async function getOneExercise() {
  //   const res = await sendGet(`/api/excercise/${exercise.id}`);
  //   if (res.status === 200) {
  //     setCase(res.data);
  //   }
  // }

  useEffect(() => {
    getExcercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!Object.keys(excercise).length)
    return (
      <div className="example">
        <Skeleton />
      </div>
    );
  return (
    <>
      <div className="Exercise-wrapper">
        <header>
          <span className="pre" onClick={() => history.goBack()}>
            <i class="fas fa-chevron-left"></i>Quay lại
          </span>
          <div className="button">
            <button className="btn-run" onClick={showValue}>
              Lưu
            </button>
          </div>
          <p>
            Học lập trình để đi làm cùng <span>Learn IT</span>
          </p>
        </header>
        <div className="Exercise-main">
          <Editor
            width="70%" // By default, it fully fits with its parent
            defaultLanguage="javascript"
            loading={<Loader />}
            value={`//viết code ở đây nhé! KMA with love\n//Đề bài: ${excercise.question}\n//Mô tả: ${excercise.description}\n${temp}`}
            onMount={handleEditorDidMount}
          />
          <div className="result">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Test Case" key="1">
                <Collapse bordered={false}>
                  <Panel header="TestCase 1" key="1">
                    <p>Input: {excercise.cases[0].input}</p>
                    <p>Expect: {excercise.cases[0].output}</p>
                    <p>
                      Output:
                      {result[0]}
                    </p>
                  </Panel>
                  <Panel header="TestCase 2" key="2">
                    <p>Input: {excercise.cases[1].input}</p>
                    <p>Expect: {excercise.cases[1].output}</p>
                    <p>
                      Output:
                      {result[1]}
                    </p>
                  </Panel>
                  <Panel header="TestCase 3" key="3">
                    {" "}
                    <p>Input: {excercise.cases[2].input}</p>
                    <p>Expect: {excercise.cases[2].output}</p>
                    <p>
                      Output:
                      {result[2]}
                    </p>
                  </Panel>
                </Collapse>
              </TabPane>
              <TabPane tab="Hỏi đáp" key="2">
                Chúng mình đang cố gắng hoàn thiện tính năng nhanh nhất có thể!
              </TabPane>
              <TabPane tab="Feedback" key="3">
                Chúng mình đang cố gắng hoàn thiện tính năng nhanh nhất có thể!
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
