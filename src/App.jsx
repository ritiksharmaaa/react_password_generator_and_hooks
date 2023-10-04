import { useState  , useCallback , useEffect , useRef  } from 'react'
import './App.css'

function App() {
  const [len, setlen] = useState(8)
  const [numallow , setnumallow ] = useState(false)
  const [charallow , setcharallow ] = useState(false)
  const [Password , setpassword  ] = useState("")


  // use reff 

  const passreff = useRef(null) /* you can passsome default val  and giv this var in input fieldad as ref={}passreff*/
  const Passwordgenerator = useCallback( ()=>{




   let pass = ""
   let str = "QAZXSWEDCVFRBGTYHNMJUKILOPqazwsxedcrfvtgbyhnujmikolp"
   if (numallow) str += "1234567890"
   if (charallow) str += "!@#$%^&*_+-{}[]~`"
  //   how many time loop it depend on len 
  for(let i = 1  ; i<= len ; i++){
    let char = Math.floor(Math.random() * str.length + 1)/* here only char came we have to save it by loop */
    pass += str.charAt(char)
    
  }
  setpassword(pass)

  }, [len , numallow , charallow , setpassword ])

//  copy to clipbord we use core of js in next js you dont have window method because it render in server side . 

  const copypasstoclipboard = useCallback(() => {

    // here we check what is actul work of usereff so we can check so many thing using passreff  we can give copy effect using this reff 
    passreff.current?.select() /*select it */ 
    // passreff.current?.setSelectionRange(0 , 12 );
window.navigator.clipboard.writeText(Password)


  } ,[Password])

  // Passwordgenerator() you cant call callback function manually it only call by paticular element like button or use another hook cakk useEffect() 
useEffect(() => {
  Passwordgenerator()
} , [len , numallow , setpassword ,charallow ])
//  you can use normall function as well as useeffect to make fully fuction without callback also but this way it optemize it . 

  return (
    <>
      <div>
{/* 
      <p class="font-sans ... text-center mt-5 ">The quick brown fox ...</p>
<p class="font-serif ...   text-center mt-5  ">The quick brown fox ...</p>
<p class="font-mono ...   text-center mt-5 ">The quick brown fox ...</p> */}


<div className="w-full max-w-md mx-auto shadow-lg  rounded-lg px-4 my-8 text-black-500 bg-gray-500   p-10 "> 
<h3 className="text-2xl text-center mt-5   text-white p-3" > Password Generator 🔒 </h3>
<div className="flex shadow rounded-lg overflow-hidden mb-4 mt-5 ">

<input type="text"
value={Password}
className='outline-none w-full py-2 px-4 '
placeholder='password'
readOnly
ref={passreff}
/>
{/* here is no relation between input and button so this button copy value from input may be this button presentin last of page here we use usereff hooks  */}
<button onClick={copypasstoclipboard} className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 '>Copy</button>

</div>
<div className="flex text-sm gap-x-2 ">

<div className="flex items-center  gap-x-1  ">

  <input type="range" min={6} max={100} className='cursor-pointer'  onChange={(e)=>{setlen(e.target.value)}}/>
  <label> Length : {len}</label>

  
</div>

<div className="flex items-center  gap-x-1  ">

  <input type='checkbox' defaultChecked={numallow} id='numberInput' onChange={() =>{setnumallow((prev) => !prev)}}/>
  <label htmlFor='numberInput'> NumAllowed</label>

  
</div>

<div className="flex items-center  gap-x-1  ">

  <input type='checkbox' defaultChecked={charallow} id='charterInput' onChange={() =>{setcharallow((prev) => !prev)}}/>
  <label htmlFor='charterInput '> CharAllowed </label>

  
</div>

</div>
</div>



        
        
      </div>
      
    </>
  )
}

export default App
