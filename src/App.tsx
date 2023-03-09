import React, {FormEvent, useEffect, useState} from 'react';
import {
    BrowserRouter as Router, Navigate,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";

import './App.css';
const url = "http://localhost:3001";

function Register() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function Submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const data = {
                nickname: login,
                password: password,
            };
            const response = await fetch(url+"/user", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = (await response.json());
            navigate("/login");
        }
        catch (exc) {
            if (exc instanceof Error) {
                console.log(exc.message);
            }
        }
    }
    return (<div>
        Register:
        <form onSubmit={Submit}>
            <label>
                Login:
                <input value={login} onChange={(e) => setLogin(e.target.value)}/>
            </label> <br/>
            <label>
                Password:
                <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label> <br/>
            <button type={"submit"}>
                Sign up
            </button>
        </form>
    </div>)
}

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function Submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const data = {
                nickname: login,
                password: password,
            };
            const response = await fetch(url+"/user", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = (await response.json());
            navigate("/home");
        }
        catch (exc) {
            if (exc instanceof Error) {
                console.log(exc.message);
            }
        }
    }

    return (<div>
        LOGIN
    <form onSubmit={Submit}>
        <label>
            Login:
            <input onChange={(e) => setLogin(e.target.value)} value={login}/>
        </label> <br/>
        <label>
            Password:
            <input onChange={(e) => setPassword(e.target.value)} value={password} type={"password"}/>
        </label> <br/>
        <button type={"submit"}>
            Login
        </button>
    </form>
    </div>)
}

function Home() {
    const [result, setResult] = useState<JSON>();
    async function GetUserData ()
    {
            try {
                const response = await fetch(url+"/user", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                });
                setResult(await response.json());
            }
            catch (e) {
                if (e instanceof  Error) {
                    console.log(e.message);
                }
            }
    }
    useEffect(() => {GetUserData()}, []);
    return (<div>{JSON.stringify(result)}</div>)
}

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path={"/register"} element={<Register />}/>
                <Route path={"/login"} element={<Login />}/>
                <Route path={"/home"} element={<Home />}/>
                <Route path={"*"} element={<Navigate to={"/register"} replace/>}/>
            </Routes>
        </Router>

    </div>
  );
}

export default App;
