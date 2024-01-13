import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import emailjs from '@emailjs/browser';
import Loader from "../Loader/Loader";
import Fox from "../../Models/Fox";
import useAlert from "../../hooks/useAlert";
import Alert from "../Alert/Alert";

const Contact = () => {
    const formRef = useRef(null);
    const [form, setform] = useState({name: '', email: '', message: ''})
    const [isLoading, setloading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState('idle'); 
    const { alert, showAlert, hideAlert } = useAlert();
    const handlechange = (e) => {
        setform({...form, [e.target.name]: e.target.value})
    }
    const handlefocus = (e) => {
        e.target.classList.add('focus')
    }
    const handleblur = (e) => {
        e.target.classList.remove('focus')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setloading(true);
        setCurrentAnimation('hit')
        emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
                from_name: form.name,
                to_name: "Jerry",
                from_email: form.email,
                to_email: "yc139@rice.edu",
                message: form.message
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_ID
        ).then(() => {
            setloading(false);
            showAlert(true, 'Message Sent Successfully', 'success');
            setTimeout(() => {
                hideAlert()
                setCurrentAnimation('idle');
                setform({name: '', email: '', message: ''});
            }, 3000);
        }).catch((error) => {
            console.log(error);
            showAlert(true, 'Internal server error', 'Failure')
            setCurrentAnimation('idle')
            setloading(false);
        })
    }
    return (
        <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
            {alert.show && <Alert {...alert} />}
            <div className="flex-1 min-w-[50%] flex flex-col">
                <h1 className="head-text">Get in Touch</h1>
                <form className="w-full flex flex-col gap-7 mt-14" ref={formRef} onSubmit={handleSubmit}>
                    <label className="text-black-500 font-semibold">
                        Name
                        <input 
                        type="text" 
                        name="name"
                        className="input" 
                        placeholder="John Doe"
                        required
                        value={form.name}
                        onChange={handlechange}
                        onFocus={handlefocus}
                        onBlur={handleblur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        Your Email
                        <input 
                        type="email" 
                        name="email"
                        className="input" 
                        placeholder="John Doe"
                        required
                        value={form.email}
                        onChange={handlechange}
                        onFocus={handlefocus}
                        onBlur={handleblur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        Your Message
                        <input 
                        type="text" 
                        rows='4'
                        name="message"
                        className="textarea" 
                        placeholder="John Doe"
                        required
                        value={form.message}
                        onChange={handlechange}
                        onFocus={handlefocus}
                        onBlur={handleblur}
                        />
                    </label>
                    <button 
                    className="btn" 
                    type="submit"
                    disabled={isLoading}
                    onFocus={handlefocus}
                    onBlur={handleblur}>
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>

            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                camera = {{
                    position: [0, 0, 5],
                    fov: 75,
                    near: 0.1,
                    far: 1000
                }}>
                    <directionalLight intensity={2.5} position={[0, 0, 1]}/>
                    <ambientLight intensity={0.5}/>
                    <pointLight position={[5, 10, 0]} intensity={2} />
                    <spotLight 
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                    />
                    <Suspense fallback={<Loader />}>
                        <Fox 
                        currentAnimation = {currentAnimation}
                        position={[0.5, 0.35, 0]}
                        rotation={[12.6, -0.6, 0]}
                        scale={[0.5, 0.5, 0.5]}
                        />
                    </Suspense>
                </Canvas>
            </div>

        </section>
    )
}

export default Contact;