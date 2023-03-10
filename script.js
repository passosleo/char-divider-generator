//Onload
function loadListeners() {
  const { charInput, generateButton, clearButton } = usePageElements();
  charInput.addEventListener("input", (e) => handleCharInput(e));
  generateButton.addEventListener("click", handleGenerateButton);
  clearButton.addEventListener("click", handleClearButton);
  return;
}

//Elements
function usePageElements() {
  const charSelect = document.getElementById("char-select");
  const charInput = document.getElementById("char-input");
  const lengthInput = document.getElementById("length-input");
  const output = document.getElementById("output");
  const generateButton = document.getElementById("generate-button");
  const clearButton = document.getElementById("clear-button");

  return {
    charSelect,
    charInput,
    lengthInput,
    output,
    generateButton,
    clearButton,
  };
}

//Utils
function generateDivider({ length = 100, char = "-" }) {
  let divider = "";
  for (let i = 0; i < length; i++) {
    divider = divider + char;
  }
  return divider;
}

function selectAndCopy(element) {
  element.select();
  document.execCommand("copy");
  clearAllSelection();
  return;
}

function clearAllSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

//Handles
function handleCharInput(e) {
  const { charSelect } = usePageElements();
  if (e.target.value) {
    charSelect.disabled = true;
  } else {
    charSelect.disabled = false;
  }
  return;
}

function handleGenerateButton() {
  const { charSelect, charInput, lengthInput, output } = usePageElements();
  const { value: char } = charInput.value
    ? charInput
    : charSelect.selectedOptions[0];
  const { value: length } = lengthInput;
  output.value = generateDivider({ length, char });
  selectAndCopy(output);
  return;
}

function handleClearButton() {
  const { output } = usePageElements();
  output.value = "";
  return;
}
