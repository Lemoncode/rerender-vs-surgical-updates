import { createSignal } from "solid-js";

// Can you spot what's going on?
// Below solution :)
export const App = () => {
  const [message, setMessage] = createSignal("initial message");
  const [seconds, setSeconds] = createSignal(0);

  setTimeout(() => {
    console.log(seconds());
    setSeconds(1);
  }, 1000);

  setTimeout(() => {
    setMessage(`Total seconds: ${seconds()}`);
  }, 2000);

  return (
    <>
      <h3>{message()}</h3>
      <h4>{seconds()}</h4>
    </>
  );
};
