import buildOnEnterKeyDown from './buildOnEnterKeyDown';

test('pass true to the callback if the received keyDown event was the enter key pressed', () => {
  const event = { keyCode: 13 };
  let enterWasPressed = false;
  const doSomethingOnEnterPressed = buildOnEnterKeyDown(enterKeyWasPressed => {
    enterWasPressed = enterKeyWasPressed;
  });
  doSomethingOnEnterPressed(event);
  expect(enterWasPressed).toBe(true);
});

test('pass true to the callback if the received keyDown event was not the enter key pressed', () => {
  const event = { keyCode: 15 };
  let enterPressed = false;
  const doSomethingOnEnterPressed = buildOnEnterKeyDown(enterKeyWasPressed => {
    enterPressed = enterKeyWasPressed;
  });
  doSomethingOnEnterPressed(event);
  expect(enterPressed).toBe(false);
});
