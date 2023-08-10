import React from 'react'
import Layout from '../../components/layout/Layout'
import { forgotPassword } from '../../service/API';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
const Forgotpassword = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setanswer] = useState("");


    const submitHandle = (e) => {
        e.preventDefault()

    }
    const submitted = async () => {
        try {
            const resetData = await forgotPassword(email, newPassword, answer)

            if (resetData.data.success) {
                toast.success(resetData.data.message)

                setTimeout(() => {
                    navigate("/login")
                }, 2000)

            } else {
                toast.error(resetData.data.message)
            }
        } catch (er) {
            toast.error("Something went Wrong")
        }

    }
    return (
        <Layout title={"Forgot password - E commerce app "}> <div className='register' >

            <form onSubmit={submitHandle} className='form-container'>
                <p className='form-container-title'>RESET PASSWORD</p>

                <div className="mb-3">

                    <input type="text" className="form-control" id="exampleInputname"
                        placeholder='Enter Your Email'
                        onChange={(e) => setEmail(e.target.value)} value={email}
                        required
                    />

                </div>
                <div className="mb-3">

                    <input type="text" className="form-control" id="exampleInputname"
                        placeholder='Enter Your Favorite Sports Name'
                        onChange={(e) => setanswer(e.target.value)} value={answer}
                        required
                    />

                </div>
                <div className="mb-3">

                    <input type="password" className="form-control" id="exampleInputPassword1"
                        placeholder='Enter your New password'
                        onChange={(e) => setNewPassword(e.target.value)} value={newPassword}
                        required
                    />
                </div>



                <button type="submit" className="submit-button btn btn-dark" style={{ fontSize: "14px" }} onClick={submitted}>RESET</button>
            </form>
        </div></Layout>
    )
}

export default Forgotpassword