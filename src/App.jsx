import { useState ,useCallback,useEffect,useRef} from 'react'

function App() {

    //useState hook
    const [length,setLength]=useState(8);
    const [numberAllowed,setNumber]=useState(false);
    const [charAllowed,setCharacter]=useState(false);
    const [password,setPassword]=useState("");
    const [buttonCopy,setButtonCopy]=useState("Copy!")

    //ref Hook
    const passwordRef=useRef(null)

    // useCallback Hook
    const passgen=useCallback(function(){
      let pass=""
      let characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      if(numberAllowed) characters+="0123456789";
      if(charAllowed) characters+="!@#$%^&*=-_+~";
      for(let i=1;i<=length;i++){
        let randomNum=Math.floor(Math.random()*characters.length);
        pass+=characters.charAt(randomNum);
      }
      setPassword(pass);
      setButtonCopy("Copy!")

    },[length,numberAllowed,charAllowed,setPassword,setButtonCopy]);

    // copy to clip
    const passwordCopy=useCallback(()=>{
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select()
      setButtonCopy("Copied!")
      // passwordRef.current?.setSelectionRange(0,5) //additional for selecting range specific
       
    },[password])

    useEffect(()=>{passgen()},[length,numberAllowed,charAllowed,passgen])

  return (
    <>
       
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 my-8 text-yellow-500 bg-gray-600 pb-8'>
        <h1 className="text-white text-center my-4 pt-4 ">Password generator</h1>
        <div className="flex flex-wrap sm:flex-nowrap rounded-lg overflow-hidden mb-4 space-x-1">
          <input type='text'
           value={password} 
           placeholder='Password' 
           ref={passwordRef}
           className='rounded-xl outline-none w-full py-1 px-3 mb-4' readOnly />
          <button 
          
          className='bg-orange-400 flex-grow text-white px-3 py-0.5 mb-4 shrink-0 rounded-xl hover:bg-stone-700 transition-all duration-300'
          onClick={passwordCopy}
          >{buttonCopy}</button>
          <button  
          className='bg-orange-400 flex-grow text-white px-3 py-0.5 mb-4 shrink-0 rounded-xl '
          onClick={()=>{
            passgen()
          }}
          >New!!</button>
        </div>
        <div className='flex flex-wrap text-sm gap-x-2 text-cyan-500'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={6} max={100} 
            value={length}
            className='cursor-pointer' 
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className='text-base'>Length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
              defaultChecked={numberAllowed}
              onChange={()=>setNumber((prev)=>!prev)}
            />
            <label htmlFor="numberToggle">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
              defaultChecked={charAllowed}
              onChange={()=>setCharacter((prev)=>!prev)}
            />
            <label htmlFor="forcharacter">Special</label>
          </div>


        </div>
      </div>


    </>
  )
}

export default App
