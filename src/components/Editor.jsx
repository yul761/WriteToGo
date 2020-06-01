import React, { useEffect, useState } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./subComponents/editorJSTool";

export default function Editor({
  handleSave,
  curCardIndex,
  editorContent,
  wholeData,
  usePrevious,
  data,
  setEnableReinitialize,
  enableReinitialize,
}) {
  var editorInstance = null;
  const [editorData, setEditorData] = useState({});
  // const [data, setData] = useState("");
  // const handleSave = async () => {
  //   const savedData = await editorInstance.save();
  //   setData(savedData);
  // };

  // useEffect(() => {
  //   if (data) console.log(reformatinput(data.blocks));
  // }, [data]);

  // const reformatinput = (array) => {
  //   var string = "";
  //   array.forEach((el) => {
  //     string += el.data.text + "\n";
  //   });

  //   return string;
  // };

  useEffect(() => {
    console.log(editorContent);
    setEditorData(editorContent);
  }, [editorContent]);

  useEffect(() => {
    console.log(editorData);
    setEnableReinitialize(true);
  }, [editorData]);

  return (
    <>
      <EditorJs
        instanceRef={(instance) => (editorInstance = instance)}
        onChange={() => {
          handleSave(editorInstance);
        }}
        data={editorData}
        enableReInitialize={enableReinitialize}
        tools={EDITOR_JS_TOOLS}
      />
    </>
  );
}
