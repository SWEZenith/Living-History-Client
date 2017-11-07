import { isStringWebLink, replaceBetween } from './utils';

export default ({ getState, item, setState }) => {
  const { selection, text } = getState();
  let newText;
  let newSelection;
  const selectedText = text.substring(selection.start, selection.end);
  let writeUrlTextHere = 'Write Url Text Here';
  let prefix = '<img src="';

  if (selection.start !== selection.end) {

      newText = replaceBetween(text, selection, `${prefix}${writeUrlTextHere}"/>`);
      newSelection = {
        start: selection.end + prefix.length,
        end: selection.end + prefix.length + writeUrlTextHere.length,
      };
    
  } else {
    newText = replaceBetween(text, selection, `${prefix}${writeUrlTextHere}"/>`);
    newSelection = {
      start: text.length + prefix.length,
      end: text.length + prefix.length + writeUrlTextHere.length,
    };
  }
  setState({ text: newText }, () => {
    setTimeout(() => {
      setState({ selection: newSelection });
    }, 25);
  });
};