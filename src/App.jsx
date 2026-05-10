import { useState  , useCallback , useEffect , useRef  } from 'react'
import './App.css'

function App() {
  const [len, setlen] = useState(8)
  const [numallow , setnumallow ] = useState(false)
  const [charallow , setcharallow ] = useState(false)
  const [Password , setpassword  ] = useState("")
  const [viewMode, setViewMode] = useState('revamped')
  const [showNotice, setShowNotice] = useState(true)


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
} , [Passwordgenerator ])
//  you can use normall function as well as useeffect to make fully fuction without callback also but this way it optemize it . 

useEffect(() => {
  const t = window.setTimeout(() => setShowNotice(false), 6500)
  return () => window.clearTimeout(t)
}, [])

  return (
    <>
      <div className={`appShell ${viewMode === 'revamped' ? 'revampedBg' : 'originalBg'}`}>
        <div className={`noticeBanner ${showNotice ? '' : 'noticeBannerHidden'}`} role="status" aria-live="polite">
          <span>This UI was revamped using agentic coding. Switch anytime to view the original version.</span>
        </div>

        <button
          type="button"
          className="viewToggle"
          onClick={() => setViewMode((prev) => (prev === 'revamped' ? 'original' : 'revamped'))}
        >
          {viewMode === 'revamped' ? 'View Original Version' : 'View Revamped Version'}
        </button>

        {viewMode === 'original' ? (
          <div className="pageEnter">
            <div>
              <div className="w-full max-w-md mx-auto shadow-lg  rounded-lg px-4 my-8 text-black-500 bg-gray-500   p-10 ">
                <h3 className="text-2xl text-center mt-5   text-white p-3" > Password Generator 🔒 </h3>
                <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-5 ">

                  <input type="text"
                    value={Password}
                    className='outline-none w-full py-2 px-4 '
                    placeholder='password'
                    onChange={(e) => setpassword(e.target.value)}
                    ref={passreff}
                  />
                  <button onClick={copypasstoclipboard} className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 '>Copy</button>

                </div>
                <div className="flex text-sm gap-x-2 ">

                  <div className="flex items-center  gap-x-1  ">

                    <input type="range" min={6} max={100} value={len} className='cursor-pointer' onChange={(e) => { setlen(e.target.value) }} />
                    <label> Length : {len}</label>


                  </div>

                  <div className="flex items-center  gap-x-1  ">

                    <input type='checkbox' checked={numallow} id='numberInput' onChange={() => { setnumallow((prev) => !prev) }} />
                    <label htmlFor='numberInput'> NumAllowed</label>


                  </div>

                  <div className="flex items-center  gap-x-1  ">

                    <input type='checkbox' checked={charallow} id='charterInput' onChange={() => { setcharallow((prev) => !prev) }} />
                    <label htmlFor='charterInput'> CharAllowed </label>


                  </div>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <main className="pageEnter w-full">
            <div className="mx-auto w-full max-w-5xl px-5 py-14 md:py-20">
              <div className="mb-10 flex flex-col gap-3 md:mb-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="revampPill">Premium UI</span>
                  <span className="revampPill revampPillSoft">No logic changes</span>
                </div>
                <h1 className="revampTitle">Password Generator</h1>
                <p className="revampSubtitle">
                  Generate a strong password in one click. Copy instantly. Fine-tune length, numbers, and symbols.
                </p>
              </div>

              <section className="glassCard">
                <div className="flex flex-col gap-4">
                  <label className="revampLabel" htmlFor="generatedPassword">Generated password</label>
                  <div className="inputShell">
                    <input
                      id="generatedPassword"
                      type="text"
                      value={Password}
                      className="revampInput"
                      placeholder="Your password will appear here"
                      readOnly
                      ref={passreff}
                    />
                    <button type="button" onClick={copypasstoclipboard} className="primaryBtn">Copy</button>
                  </div>

                  <div className="revampDivider" />

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="controlBlock md:col-span-1">
                      <div className="flex items-center justify-between">
                        <span className="controlLabel">Length</span>
                        <span className="controlValue">{len}</span>
                      </div>
                      <input
                        type="range"
                        min={6}
                        max={100}
                        value={len}
                        className="revampRange"
                        onChange={(e) => { setlen(e.target.value) }}
                      />
                    </div>

                    <div className="controlBlock md:col-span-1">
                      <div className="flex items-center gap-3">
                        <input
                          id="revampNumbers"
                          type="checkbox"
                          checked={numallow}
                          onChange={() => { setnumallow((prev) => !prev) }}
                          className="revampCheck"
                        />
                        <label htmlFor="revampNumbers" className="controlLabel">Include numbers</label>
                      </div>
                      <p className="controlHelp">Adds 0–9 to the pool.</p>
                    </div>

                    <div className="controlBlock md:col-span-1">
                      <div className="flex items-center gap-3">
                        <input
                          id="revampSymbols"
                          type="checkbox"
                          checked={charallow}
                          onChange={() => { setcharallow((prev) => !prev) }}
                          className="revampCheck"
                        />
                        <label htmlFor="revampSymbols" className="controlLabel">Include symbols</label>
                      </div>
                      <p className="controlHelp">Adds special characters.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        )}
      </div>
    </>
  )
}

export default App
