import React, { useState, useEffect, useRef } from "react";
import ThumbNail from "./ThumbNail";
import Preview from "./Preview";
import Editor from "./Editor";

const initializeData = {
  time: 1590967636372,
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "",
      },
    },
  ],
  version: "2.17.0",
};
export default function MainPage() {
  const [data, setData] = useState("");
  const [curCardIndex, setCurCardIndex] = useState(0);
  const [wholeData, setWholeData] = useState([]);
  const [editorContent, setEditorContent] = useState(initializeData);
  const [enableReinitialize, setEnableReinitialize] = useState(false);
  const [files, setFiles] = useState([]);

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevIndex = usePrevious(curCardIndex);

  const handleDeleteData = async (index) => {
    /***********when set wholedata using holder, value of holder just changes*******/
    var holder = [];
    console.log(wholeData);
    holder.push(...wholeData);
    console.log(holder);
    holder.splice(index, 1, initializeData);
    console.log(index);

    await setWholeData(holder);
    console.log(holder);
    /********************************************************************************/
    setEditorContent(initializeData);
    setCurCardIndex(index - 1);
    setData(initializeData);
  };
  const handleSave = async (instance) => {
    const savedData = await instance.save();
    setData(savedData);
    setEnableReinitialize(false);
  };

  useEffect(() => {
    //save data to curCardIndex of wholedata
    var temp = wholeData;
    console.log(wholeData);
    console.log(temp);
    console.log(data);
    temp.splice(prevIndex, 1, data);
    console.log(temp);
    setWholeData(temp);
    console.log(wholeData);

    if (wholeData.length > curCardIndex) {
      //fetch cur data, and pass to editor
      setEditorContent(wholeData[curCardIndex]);
      console.log("Fetch old data");
    } else {
      //set new data
      console.log("Set new data -> clear editor window");
      var emptyData = {
        time: 1590967636372,
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "",
            },
          },
        ],
        version: "2.17.0",
      };
      setWholeData([...wholeData, emptyData]);
      console.log([...wholeData, emptyData]);
      setEditorContent(emptyData);
    }
    console.log(wholeData[curCardIndex]);
    console.log(wholeData);
    console.log("curIndex is : " + curCardIndex);
  }, [curCardIndex]);

  useEffect(() => {
    var cards = document.querySelectorAll(".MuiCard-root");
    if (data) console.log(reformatinput(data.blocks));

    if (data) {
      var input = reformatinput(data.blocks);
      var curCard = cards[curCardIndex];
      curCard.children[0].children[0].innerHTML = input;
      //   console.log(text);
    }
  }, [data]);

  // re-render the input of cards when delete one cards
  useEffect(() => {
    var cards = document.querySelectorAll(".MuiCard-root");
    console.log(wholeData);
    if (wholeData[0] !== "") {
      files.forEach((data, index) => {
        var innerHTML = reformatinput(wholeData[index].blocks);
        var card = cards[index];
        console.log(card);
        card.children[0].children[0].innerHTML = innerHTML;
      });
    }
  }, [wholeData]);

  const reformatinput = (array) => {
    var string = "";
    array.forEach((el) => {
      string += el.data.text + "<br/>";
    });

    return string;
  };
  return (
    <div className="MainPage">
      <div className="MainPage__thumbNail">
        <ThumbNail />
      </div>
      <div className="MainPage__preview">
        <Preview
          setCurCardIndex={setCurCardIndex}
          handleDeleteData={handleDeleteData}
          files={files}
          setFiles={setFiles}
        />
      </div>
      <div className="MainPage__editor">
        <Editor
          handleSave={handleSave}
          curCardIndex={curCardIndex}
          editorContent={editorContent}
          wholeData={wholeData}
          usePrevious={usePrevious}
          enableReinitialize={enableReinitialize}
          setEnableReinitialize={setEnableReinitialize}
        />
      </div>
    </div>
  );
}
