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

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevIndex = usePrevious(curCardIndex);

  const handleSave = async (instance) => {
    const savedData = await instance.save();
    setData(savedData);
    console.log(savedData);
    setEnableReinitialize(false);
  };

  //   useEffect(() => {
  //     //save data to curCardIndex of wholedata
  //     var temp = wholeData;
  //     temp.splice(curCardIndex, 1, data);
  //     setWholeData(temp);
  //     console.log(wholeData);
  //   }, [prevIndex]);

  useEffect(() => {
    //save data to curCardIndex of wholedata
    var temp = wholeData;
    temp.splice(prevIndex, 1, data);
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
        <Preview setCurCardIndex={setCurCardIndex} />
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
