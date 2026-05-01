import React, { useRef, useState, useEffect } from 'react';
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
    let [showLogin, setShowLogin] = useState(true);
    let [error, setError] = useState("");

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // LOGIN - Putanja promijenjena na /api/login
    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const resData = await response.json();
            if (response.ok) {
                setUser({ username: resData.username });
                localStorage.setItem("user", JSON.stringify({ username: resData.username }));
                setError("");
            } else {
                setError(resData.error || "Greška pri prijavi.");
            }
        } catch (err) {
            setError("Server nije dostupan.");
        }
    };

    // REGISTER - Putanja promijenjena na /api/register
    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const resData = await response.json();
            if (response.ok) {
                setError("Registracija uspješna! Prijavi se.");
                setShowLogin(true);
            } else {
                setError(resData.error || "Greška pri registraciji.");
            }
        } catch (err) {
            setError("Server nije dostupan.");
        }
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
            const nextIndex = index + 1;
            setIndex(nextIndex);
            setQuestion(data[nextIndex]);
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

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        reset();
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
                            {error && <p style={{ color: error.includes("uspješna") ? "green" : "red", fontSize: "14px" }}>{error}</p>}
                            <p className="toggle-auth" onClick={() => {setShowLogin(false); setError("");}}>Nemate račun? Registrirajte se.</p>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <h2>Register</h2>
                            <input name="username" placeholder="Username" required />
                            <input name="password" type="password" placeholder="Password" required />
                            <button type="submit">Register</button>
                            {error && <p style={{ color: error.includes("uspješna") ? "green" : "red", fontSize: "14px" }}>{error}</p>}
                            <p className="toggle-auth" onClick={() => {setShowLogin(true); setError("");}}>Povratak na Login.</p>
                        </form>
                    )}
                </div>
            ) : (
                <>
                    <div className="welcome-box">
                        <span>Welcome, <strong>{user.username}</strong>!</span>
                    </div>
                    {!start ? (
                        <div className="result-screen">
                            <button onClick={() => setStart(true)} className="start-btn">Start Quiz</button>
                            <button className="logout-btn" onClick={logout}>Logout</button>
                        </div>
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
                                </>
                            ) : (
                                <div className="result-screen">
                                    <h2>You scored {score} of {data.length}</h2>
                                    <div className="result-actions">
                                        <button onClick={reset} className="reset-btn">Reset</button>
                                        <button className="logout-btn" onClick={logout}>Logout</button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Quiz;