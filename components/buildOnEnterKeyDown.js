const buildOnEnterKeyDown = callback => e => {
  const enterKeyWasPressed = e.keyCode == 13;
  return callback(enterKeyWasPressed);
};
export default buildOnEnterKeyDown;
