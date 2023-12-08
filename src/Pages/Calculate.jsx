import '../css/basic.css';
import '../css/calculate.css';

import Graphic from '../Components/Triangle/Graphic.jsx';
import InputField from '../Components/Triangle/InputField.jsx';
import Config from '../Components/Triangle/Config.jsx';

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

// Pythagorean side length calculator
// Solve the triangle

let deferredPrompt;

function Calculate() {
    const navigate = useNavigate();

    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputHypotenuse, setInputHypotenuse] = useState('');
    const [inputAngle1, setInputAngle1] = useState('');
    const [inputAngle2, setInputAngle2] = useState('');

    const [triangle, setTriangle] = useState('');

    const handleInputChange = (inputId, event) => {
        const inputValue = event.target.value;

        switch (inputId) {
            case "value1":
                setInputValue1(inputValue);
                break;
            case "value2":
                setInputValue2(inputValue);
                break;
            case "hypotenuse":
                setInputHypotenuse(inputValue);
                break;
            case "angle1":
                setInputAngle1(inputValue);
                break;
            case "angle2":
                setInputAngle2(inputValue);
                break;
        }
    };

    const [installable, setInstallable] = useState(false);


    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
          // Prevent the mini-infobar from appearing on mobile
          e.preventDefault();
          // Stash the event so it can be triggered later.
          deferredPrompt = e;
          // Update UI notify the user they can install the PWA
          setInstallable(true);
        });

        window.addEventListener('appinstalled', () => {
            // Log install to analytics
            console.log('INSTALL: Success');
          });
    }, []);

    const handleInstallClick = (e) => {
        // Hide the app provided install promotion
        setInstallable(false);
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
        });
    };


    return (
        <div className="Calculate">

            <button 
                className="backButton"
                onClick={() => 
                    navigate("/")
            }>
            <svg className="backArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            Back
            </button>

            {installable &&
                <button
                className="install-button"
                onClick={handleInstallClick}
                >
                Install
                </button>
            }


            <div className="content-container">
                <section className="content">

                    <div className="main-panel">
                        <div className="graphic-container component">
                            <Graphic 
                                onUpdate={(value) => setTriangle(value)}
                                width='500'
                                height='500'

                                side1={inputValue1}
                                side2={inputValue2}
                                hypotenuse={inputHypotenuse}

                                angle1={inputAngle1}
                                angle2={inputAngle2}
                            />
                        </div>
                    

                        <div className="input-container component">
                            <InputField 
                                valueType="value1"
                                handleInputChange={handleInputChange}
                                placeholderText="Side 1"
                            />
                            <InputField 
                                valueType="value2"
                                handleInputChange={handleInputChange}
                                placeholderText="Side 2"
                            />
                            <InputField 
                                valueType="hypotenuse"
                                handleInputChange={handleInputChange}
                                placeholderText="Hypotenuse"
                            />
                            <InputField 
                                valueType="angle1"
                                handleInputChange={handleInputChange}
                                placeholderText="Angle 1 (Degrees)"
                            />
                            <InputField 
                                valueType="angle2"
                                handleInputChange={handleInputChange}
                                placeholderText="Angle 2 (Degrees)"
                            />
                        </div>
                    </div>

                    <Config 
                        values = {triangle}
                    />

                </section>
            </div>



        </div>
    );
}

export default Calculate;