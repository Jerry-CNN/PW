import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Island from '../../Models/Island';
import Sky from '../../Models/Sky';
import Bird from '../../Models/Bird';
import Plane from '../../Models/Plane';
import Homeinfo from '../HomeInfo/Homeinfo';
import sakura from '../../assets/sakura.mp3'
import { soundoff, soundon } from '../../assets/icons';
const Home = () => {
    const audioRef = useRef(new Audio(sakura));
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isPlayingMusic, setIsPlayingMusic] = useState(false)
    useEffect(() => {
        if(isPlayingMusic){
            audioRef.current.play()
        }
        return () => {
            audioRef.current.pause()
        }
    },[isPlayingMusic])

    const islandPosition = [0, -6.5, -43];
    let isLandScale = [1, 1, 1];
    if (window.innerWidth < 768) {
        isLandScale = [0.7, 0.7, 0.7];
    }
    let islandRotation = [0.1, 4.7, 0];
    let planeScreenScale, planeScreenPosition;

    if (window.innerWidth<768) {
        planeScreenScale = [1.5, 1.5, 1.5]
        planeScreenPosition = [0, -1.5, 0]
    } else {
        planeScreenScale = [3, 3, 3]
        planeScreenPosition = [0, -4, -4]
    }

    return (
        <section className='w-full h-screen relative'>
            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <Homeinfo currentStage={currentStage} />}
            </div>
            
            <Canvas className={`w-full h-screen bg-transparent' 
            ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
            camera={{near:0.1, far:1000}}>
                <Suspense fallback={<loader />}>
                    <directionalLight position={[1,1,1]} intensity={2}/>
                    <ambientLight intensity={0.5}/>
                    <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={1}/>
                    <Sky 
                        isRotating={isRotating}
                    />
                    <Bird />
                    <Island
                        position={islandPosition}
                        scale={isLandScale}
                        rotation={islandRotation}
                        isRotating = {isRotating}
                        setIsRotating = {setIsRotating}
                        setCurrentStage = {setCurrentStage}
                    />
                    <Plane 
                        isRotating={isRotating}
                        scale = {planeScreenScale}
                        position = {planeScreenPosition}
                        rotation={[0,20,0]}
                    />
                </Suspense>
            </Canvas>
            <div className=' absolute bottom-2 left-2'>
                <img src={!isPlayingMusic ? soundoff : soundon}
                alt='sound'
                className='w-10 h-10 cursor-pointer object-contain'
                onClick={() => setIsPlayingMusic(!isPlayingMusic)}/>
            </div>
        </section>
    )
}

export default Home;