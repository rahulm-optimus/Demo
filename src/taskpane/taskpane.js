/* global Word console */


//office insertion function
export async function insertText(text) {
  // Write text to the document.
  try {
    await Word.run(async (context) => {
      let body = context.document.body;
      body.insertParagraph(text, Word.InsertLocation.end);
      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}


//office extraction document context function
export async function extractParagraphText() {
  try {
    return await Word.run(async (context) => {
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load("text"); // Load the text content of all paragraphs
      await context.sync(); // Synchronize changes

      const extractedText = paragraphs.items.reduce((acc, paragraph) => {
        acc += paragraph.text + "\n"; // Accumulate text with newlines
        return acc;
      }, ""); // Start with an empty string

      console.log("Extracted Text:\n", extractedText); // For debugging
      return extractedText; // Return the extracted text
    });
  } catch (error) {
    console.error("Error extracting text:", error);
    return "Error extracting text"; // Return an error message in case of failure
  }
}


//office formatted extraction document context function
export async function extractFormattedText() {
  try {
    return await Word.run(async (context) => {
      // Load paragraphs from the document body
      const paragraphs = context.document.body.paragraphs;
      paragraphs.load(["text", "style"]);

      // Synchronize to retrieve the loaded data
      await context.sync();

      // Extract text and formatting information
      const extractedData = paragraphs.items.map((paragraph) => {
        return {
          text: paragraph.text,
          style: paragraph.style,
        };
      });
      // Return the extracted data
      return extractedData;
    });
  } catch (error) {
    console.error("Error extracting text and formatting:", error);
    throw error;
  }
}


//office text replacement function 
async function replaceText() {
  await Word.run(async (context) => {

    const doc = context.document;
    const originalRange = doc.getSelection();
    originalRange.insertText("many", Word.InsertLocation.replace);

      await context.sync();
  });
}
