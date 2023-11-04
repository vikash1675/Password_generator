import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "013456789";
    if (charAllow) str += "!@#$%^&*(){}~'";
    for (let i = 0; i < length; i++) {  
      let char = Math.floor(Math.random() * str.length);
      console.log("dsdsd",char);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllow, charAllow, setpassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, setcharAllow, setnumberAllow, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center"> Password Generator</h1>
      <div className="flex shodow rounded-lg overflow-hidden mb-4'">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassword}
          className="outline-none bg-blue-70 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label>length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllow}
            id="numberInput"
            onChange={(e) => {
              setnumberAllow((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllow}
            id="characterInput"
            onChange={(e) => {
              setcharAllow((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
