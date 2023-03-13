//Onload
function loadListeners() {
  const { charInput, generateButton, clearButton, titleInput, resetButton } =
    usePageElements();

  charInput.addEventListener("input", ({ target }) =>
    handleCharInput({ target })
  );
  titleInput.addEventListener("input", ({ target }) =>
    handleTitleInput({ target })
  );

  generateButton.addEventListener("click", handleGenerateButton);
  clearButton.addEventListener("click", handleClearButton);
  resetButton.addEventListener("click", handleResetButton);
}

//Elements
function usePageElements() {
  const charSelect = document.getElementById("char-select");
  const charInput = document.getElementById("char-input");
  const lengthInput = document.getElementById("length-input");
  const output = document.getElementById("output");
  const generateButton = document.getElementById("generate-button");
  const clearButton = document.getElementById("clear-button");
  const titleInput = document.getElementById("title-input");
  const titleAlignSelect = document.getElementById("title-align-select");
  const resetButton = document.getElementById("reset-button");
  const commentCheckbox = document.getElementById("comment-checkbox");

  if (
    !charSelect ||
    !charInput ||
    !lengthInput ||
    !output ||
    !generateButton ||
    !clearButton ||
    !titleInput ||
    !titleAlignSelect ||
    !resetButton ||
    !commentCheckbox
  ) {
    throw new Error("Page elements not found!");
  }

  return {
    charSelect,
    charInput,
    lengthInput,
    output,
    generateButton,
    clearButton,
    titleInput,
    titleAlignSelect,
    resetButton,
    commentCheckbox,
  };
}

//Utils
function generateDivider({
  length = 100,
  char = "-",
  title,
  titleAlign = "center",
  commentFormat = false,
}) {
  const hasTitle = title ? true : false;
  let divider = "";

  for (let i = 0; i < length; i++) {
    divider = divider + char;
  }

  if (!hasTitle) {
    if (commentFormat) {
      return "/* " + divider + " */";
    }

    return divider;
  }

  switch (titleAlign) {
    case "center":
      const middle = Math.floor(length / 2);
      const titledDivider =
        divider.substring(0, middle) +
        " " +
        title +
        " " +
        divider.substring(middle);

      if (commentFormat) {
        return "/* " + titledDivider + " */";
      }

      return titledDivider;
    case "left":
      if (commentFormat) {
        return "/* " + title + " " + divider + " */";
      }
      return title + " " + divider;
    case "right":
      if (commentFormat) {
        return "/* " + divider + " " + title + " */";
      }
      return divider + " " + title;
  }
}

function selectAndCopy(element) {
  element.select();
  document.execCommand("copy");
  clearAllSelection();
}

function clearAllSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

//Handles
function handleCharInput({ target }) {
  const { charSelect } = usePageElements();

  if (target.value) {
    charSelect.disabled = true;
  } else {
    charSelect.disabled = false;
  }
}

function handleTitleInput({ target }) {
  const { titleAlignSelect } = usePageElements();

  if (target.value) {
    titleAlignSelect.disabled = false;
  } else {
    titleAlignSelect.disabled = true;
  }
}

function handleGenerateButton() {
  const {
    charSelect,
    charInput,
    lengthInput,
    output,
    titleInput,
    titleAlignSelect,
    commentCheckbox,
  } = usePageElements();

  try {
    const { value: char } = charInput.value
      ? charInput
      : charSelect.selectedOptions[0];

    const { value: length } = lengthInput;

    const { value: title } = titleInput;

    const { value: titleAlign } = titleAlignSelect;

    const { checked: commentFormat } = commentCheckbox;

    output.value = generateDivider({
      length,
      char,
      title,
      titleAlign,
      commentFormat,
    });

    selectAndCopy(output);
  } catch (err) {
    console.log(err);
  }
}

function handleClearButton() {
  const { output } = usePageElements();
  output.value = "";
}

function handleResetButton() {
  const {
    charSelect,
    charInput,
    lengthInput,
    titleInput,
    titleAlignSelect,
    commentCheckbox,
  } = usePageElements();

  charSelect.selectedIndex = 0;
  charSelect.disabled = false;
  charInput.value = "";
  lengthInput.value = 100;
  titleInput.value = "";
  titleAlignSelect.selectedIndex = 0;
  titleAlignSelect.disabled = true;
  commentCheckbox.checked = true;
}
