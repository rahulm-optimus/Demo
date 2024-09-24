import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { Button, makeStyles, tokens } from "@fluentui/react-components";
import {
  Menu,
  MenuButton,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Field,
  Textarea,
} from "@fluentui/react-components";
import { insertText, extractParagraphText, extractFormattedText } from "../taskpane";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem", // Added padding for space
    overflow: "auto",
    flex: "1",
    backgroundColor: tokens.colorNeutralBackground2, // Softer background color
  },
  menuContainer: {
    alignSelf: "flex-end",
    marginRight: "1rem",
  },
  menuPopover: {
    position: "absolute",
    top: "0",
    left: "100%",
    marginLeft: "10px",
  },
  iframeContainer: {
    width: "100%",
    height: "80dvh",
    alignSelf: "center",
    border: `2px solid ${tokens.colorNeutralStroke1}`, // Added border for contrast
    borderRadius: "10px",
    marginBottom: "2rem",
  },
  documentContainer: {
    width: "100%",
    height: "auto",
    padding: "2rem",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    borderRadius: "8px", // Rounded corners for a modern look
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  },
  btnGrp: {
    display: "flex",
    flexWrap: "wrap", // Allows buttons to wrap on smaller screens
    gap: "1rem",
    justifyContent: "center",
    padding: "1rem",
  },
  btn: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    height: "auto",
    minHeight: "120px",
    resize: "vertical",
  },
  // Media queries for responsiveness
  "@media (max-width: 768px)": {
    iframeContainer: {
      width: "100%",
      height: "40dvh", // Reduced height for smaller screens
    },
    documentContainer: {
      padding: "1rem",
    },
  },
  "@media (max-width: 480px)": {
    root: {
      padding: "0.5rem",
    },
    btnGrp: {
      gap: "0.5rem",
    },
    btn: {
      fontSize: "0.9rem", // Smaller font for smaller screens
    },
    iframeContainer: {
      height: "30dvh", // Adjust iframe size for small devices
    },
  },
});

const Home = (props) => {
  const [options, setOptions] = React.useState("Task Pane Tools");
  const [url, setUrl] = React.useState(null);
  const [inputTxt, setInputTxt] = React.useState(null);
  const [extractedTxt, setExtratedTxt] = React.useState(null);
  const refValue = React.useRef(null);
  const styles = useStyles();

  const urlList = [
    { Name: "Overview", url: "https://learn.microsoft.com/en-us/office/dev/add-ins/tutorials/word-tutorial" },
    { Name: "Fluent UI", url: "https://react.fluentui.dev/?path=/docs/components-menu-menulist--docs" },
  ];

  let callExtraction = async () => {
    try {
      setExtratedTxt("");
      const doc = await extractParagraphText();
      const formattedDoc = await extractFormattedText();
      console.log("formatted data", formattedDoc);
      setExtratedTxt(doc);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  let callInsertion = async () => {
    try {
      insertText(refValue.current.value);
    } catch (error) {
      console.error(error);
    }
  };

  function changeText(e) {
    setInputTxt(e.target.value);
  }

  function clearTextArea() {
    setExtratedTxt(null);
  }

  React.useEffect(() => {
    // callApi();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.menuContainer}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton appearance="outline" shape="circular">
              {options}
            </MenuButton>
          </MenuTrigger>
          <MenuPopover className={styles.menuPopover}>
            <MenuList>
              {urlList.map((item) => (
                <MenuItem
                  key={item.Name}
                  onClick={() => {
                    setOptions(item.Name);
                    setUrl(item.url); //dynamic url changes
                  }}
                >
                  {item.Name}
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      {url && <iframe className={styles.iframeContainer} src={url} title="example"></iframe>}
      <Field label="Enter document text" resize="vertical">
        <Textarea onChange={changeText} ref={refValue} className={styles.textarea} />
      </Field>
      <div className={styles.btnGrp}>
        <Button className={styles.btn} appearance="primary" shape="circular" size="medium" onClick={callInsertion}>
          ༼ つ ◕_◕ ༽つ Insert
        </Button>
        <Button className={styles.btn} appearance="primary" shape="circular" size="medium" onClick={callExtraction}>
          Extract ༼ つ ◕_◕ ༽つ
        </Button>
      </div>
      <div className={styles.documentContainer}>
        <textarea readOnly className={styles.textarea} value={extractedTxt ? extractedTxt : "Fetch document details"} />
        <Button appearance="primary" shape="circular" size="medium" onClick={clearTextArea}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Home;
