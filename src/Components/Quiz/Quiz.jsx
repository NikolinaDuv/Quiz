
// import React, { useRef, useState,useEffect } from 'react'
// import './Quiz.css';
// import { data } from '../../assets/data';

// const Quiz = () => {
//     let [index,setIndex]=useState(0);
//     let [question,setQuestion]=useState(data[index]);
//     let [score,setScore]=useState(0);
//     let [result,setResult]=useState(false);
//     let [lock,setLock]=useState(false);
//     let [start,setStart]=useState(false);  

//     let [user, setUser] = useState(null);   // trenutno ulogovani user
// let [users, setUsers] = useState([]);   // lista registrovanih korisnika
// let [showLogin, setShowLogin] = useState(true); // true = login, false = register
// let [error, setError] = useState("");


// useEffect(() => {
//   // provjera da li postoji korisnik u storage
//   const savedUser = localStorage.getItem("user");
//   if (savedUser) {
//     setUser(JSON.parse(savedUser));
//   }

//   // provjera da li postoji lista korisnika
//   const savedUsers = localStorage.getItem("users");
//   if (savedUsers) {
//     setUsers(JSON.parse(savedUsers));
//   }
// }, []);


// // const handleLogin = (e) => {
// //   e.preventDefault();
// //   const username = e.target.username.value;
// //   const password = e.target.password.value;

// //   // traži korisnika
// //   const match = users.find(u => u.username === username && u.password === password);
// //   if (match) {
// //     setUser({ username });
// //     setError("");
// //   } else {
// //     setError("Pogrešan username ili password, ili se prvo registrujte.");
// //   }
// // };

// // const handleRegister = (e) => {
// //   e.preventDefault();
// //   const username = e.target.username.value;
// //   const password = e.target.password.value;

// //   // provjera da li korisnik već postoji
// //   const exists = users.find(u => u.username === username);
// //   if (exists) {
// //     setError("Korisnik već postoji, ulogujte se.");
// //     return;
// //   }

// //   // dodaj novog korisnika
// //   setUsers([...users, { username, password }]);
// //   setError("Registracija uspješna! Sada se ulogujte.");
// //   setShowLogin(true); // prebaci na login
// // };
// const handleLogin = (e) => {
//   e.preventDefault();
//   const username = e.target.username.value;
//   const password = e.target.password.value;

//   const match = users.find(u => u.username === username && u.password === password);
//   if (match) {
//     setUser({ username });
//     localStorage.setItem("user", JSON.stringify({ username })); // SPREMI USER
//     setError("");
//   } else {
//     setError("Pogrešan username ili password, ili se prvo registrujte.");
//   }
// };

// const handleRegister = (e) => {
//   e.preventDefault();
//   const username = e.target.username.value;
//   const password = e.target.password.value;

//   const exists = users.find(u => u.username === username);
//   if (exists) {
//     setError("Korisnik već postoji, ulogujte se.");
//     return;
//   }

//   const newUsers = [...users, { username, password }];
//   setUsers(newUsers);
//   localStorage.setItem("users", JSON.stringify(newUsers)); // SPREMI LISTU KORISNIKA
//   setError("Registracija uspješna! Sada se ulogujte.");
//   setShowLogin(true);
// };





//     let Option1=useRef(null);
//     let Option2=useRef(null);
//     let Option3=useRef(null);
//     let Option4=useRef(null);
//     let option_array=[Option1,Option2,Option3,Option4];

//     const checkAns=(e,ans)=>{
//         if(lock===false){
//             if(question.ans===ans){
//                 e.target.classList.add("correct");
//                 setLock(true);
//                 setScore(prev=>prev+1);
//             }
//             else{
//                 e.target.classList.add("wrong");
//                 setLock(true);
//                 option_array[question.ans-1].current.classList.add("correct");
//             } 
//         }
//     }

//     const next=()=>{
//         if(lock===true){
//             if(index===data.length-1){
//                 setResult(true);
//                 return 0;
//             }
//             setIndex(++index);
//             setQuestion(data[index]);
//             setLock(false);
//             option_array.map((option)=>{
//                 option.current.classList.remove("wrong");
//                 option.current.classList.remove("correct");
//                 return null;
//             });
//         }
//     }

//     const reset=()=>{
//         setIndex(0);
//         setQuestion(data[0]);
//         setScore(0);
//         setLock(false);
//         setResult(false);
//         setStart(false);   
//     };

//     return (
//         <div className='container'>
//             <h1>Quiz App</h1>
//             <hr/>
//         {!user ? (
//   <div className="auth-container">
//     {showLogin ? (
//       <form onSubmit={handleLogin}>
//         <h2>Login</h2>
//         <input name="username" placeholder="Username" required />
//         <input name="password" type="password" placeholder="Password" required />
//         <button type="submit">Login</button>
//         {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
//         <p onClick={() => setShowLogin(false)}>Register here.</p>
//       </form>
//     ) : (
//       <form onSubmit={handleRegister}>
//         <h2>Register</h2>
//         <input name="username" placeholder="Username" required />
//         <input name="password" type="password" placeholder="Password" required />
//         <button type="submit">Register</button>
//         {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
//         <p onClick={() => setShowLogin(true)}>Login</p>
//       </form>
//     )}
//   </div>
// ) : (
  
//   <>
//    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
//   <span>Welcome, {user.username}!</span>

// </div>
//     {!start ? (
//   <>
//     <button onClick={() => setStart(true)} className="start-btn">
//       Start
//     </button>
//     <button
//       className="logout-btn"
//       onClick={() => {
//         setUser(null);
//         localStorage.removeItem("user");
//       }}
//     >
//       Logout
//     </button>
//   </>
// ) : (
//   <>
//     {!result ? (
//       <>
//         <h2>{index+1}. {question.question}</h2>
//         <ul>
//           <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
//           <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
//           <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
//           <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
//         </ul>
//         <button onClick={next} className="next-btn">Next</button>
//         <div className="index">{index+1} od {data.length} pitanja</div>
//         <button
//           className="logout-btn"
//           onClick={() => {
//             setUser(null);
//             localStorage.removeItem("user");
//           }}
//         >
//           Logout
//         </button>
//       </>
//     ) : (
//       <>
//         <h2>You scored {score} of {data.length}</h2>
//         <button onClick={reset} className="reset-btn">Reset</button>
//         <button
//           className="logout-btn"
//           onClick={() => {
//             setUser(null);
//             localStorage.removeItem("user");
//           }}
//         >
//           Logout
//         </button>
//       </>
//     )}
//   </>
// )}

    
//         </div>
//     )
// }

// export default Quiz;
import React, { useRef, useState, useEffect } from 'react'
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    let [lock, setLock] = useState(false);
    let [start, setStart] = useState(false);

    let [user, setUser] = useState(null);
    let [users, setUsers] = useState([]);
    let [showLogin, setShowLogin] = useState(true);
    let [error, setError] = useState("");

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        const match = users.find(u => u.username === username && u.password === password);
        if (match) {
            setUser({ username });
            localStorage.setItem("user", JSON.stringify({ username }));
            setError("");
        } else {
            setError("Pogrešan username ili password, ili se prvo registrujte.");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        const exists = users.find(u => u.username === username);
        if (exists) {
            setError("Korisnik već postoji, ulogujte se.");
            return;
        }

        const newUsers = [...users, { username, password }];
        setUsers(newUsers);
        localStorage.setItem("users", JSON.stringify(newUsers));
        setError("Registracija uspješna! Sada se ulogujte.");
        setShowLogin(true);
    };

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    let option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            }
            else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
    }

    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            });
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        setStart(false);
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {!user ? (
                <div className="auth-container">
                    {showLogin ? (
                        <form onSubmit={handleLogin}>
                            <h2>Login</h2>
                            <input name="username" placeholder="Username" required />
                            <input name="password" type="password" placeholder="Password" required />
                            <button type="submit">Login</button>
                            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
                            <p onClick={() => setShowLogin(false)}>Register here.</p>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <h2>Register</h2>
                            <input name="username" placeholder="Username" required />
                            <input name="password" type="password" placeholder="Password" required />
                            <button type="submit">Register</button>
                            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
                            <p onClick={() => setShowLogin(true)}>Login</p>
                        </form>
                    )}
                </div>
            ) : (
                <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <span>Welcome, {user.username}!</span>
                    </div>
                    {!start ? (
                        <>
                            <button onClick={() => setStart(true)} className="start-btn">
                                Start
                            </button>
                            <button
                                className="logout-btn"
                                onClick={() => {
                                    setUser(null);
                                    localStorage.removeItem("user");
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {!result ? (
                                <>
                                    <h2>{index + 1}. {question.question}</h2>
                                    <ul>
                                        <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                                        <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                                        <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                                        <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                                    </ul>
                                    <button onClick={next} className="next-btn">Next</button>
                                    <div className="index">{index + 1} od {data.length} pitanja</div>
                                    <button
                                        className="logout-btn"
                                        onClick={() => {
                                            setUser(null);
                                            localStorage.removeItem("user");
                                        }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2>You scored {score} of {data.length}</h2>
                                    <button onClick={reset} className="reset-btn">Reset</button>
                                    <button
                                        className="logout-btn"
                                        onClick={() => {
                                            setUser(null);
                                            localStorage.removeItem("user");
                                        }}
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Quiz;