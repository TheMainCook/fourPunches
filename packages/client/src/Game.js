import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import './CSS/Game.css';

let socket;

const Game = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [timer, setTimer] = useState(-1);
    const [timerDisplay, setTimerDisplay] = useState('');
    const [round, setRound] = useState(0);
    const [startRound, setStartRound] = useState(false);
    const [val, setVal] = useState('');
    const ENDPOINT = 'localhost:4001';

    //sets up game
    useEffect(() => {
        const background = new Image();
        background.src = 'https://stillmed.olympic.org/media/Images/OlympicOrg/News/2020/02/20/2020-02-20-boxing-thumbnail-02.jpg';
        background.width = window.innerWidth - 15;
        background.height = window.innerHeight - 15;
        background.onload = function () {
            drawStuff();
        };

        // this is used to resize the canvas if the window size changes
        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
            drawStuff();
        }

        resizeCanvas();

        function drawStuff() {
            // draws the canvas out to the right window size and populates the background
            const canvas = document.getElementById('id');
            canvas.width = window.innerWidth - 3;
            canvas.height = window.innerHeight - 110;
            const context = canvas.getContext('2d');
            context.drawImage(background, -300, -300);

            // fill in figures for now
            context.beginPath();
            context.fillRect(500, 450, 150, 300);
            context.stroke();
        }

        socket = io(ENDPOINT);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT]);

    // starts the game
    useEffect(() => {
        socket.on('startGame', (data) => {
            setIsGameStarted(data.isGameStarted);
            setTimer(20000);
        });
        const canvas = document.getElementById('id');
        const context = canvas.getContext('2d');
        // fill in figures for now
        context.beginPath();
        context.fillRect(900, 340, 150, 300);
        context.stroke();
    }, [isGameStarted]);

    useEffect(() => {
        socket.on('roundStart', (data) => {
            console.log(data);
            setRound(data.round);
            setStartRound(true);
            setTimer(20000);
        });
        if (isGameStarted){
            if (round > 0 && startRound) {
                setStartRound(false);
                let end = new Date().getTime() + timer;
                let x = setInterval(function () {
                    setIsGameStarted(false);
                    // Get today's date and time
                    var now = new Date().getTime();

                    // Find the distance between now and the count down date
                    var distance = end - now;
                    // Time calculations for days, hours, minutes and seconds
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    setTimerDisplay(seconds);
                    // If the count down is finished, write some text
                    if (distance < 1 || val !== '') {
                        clearInterval(x);
                        setTimerDisplay('');
                        setTimer(-1);
                        socket.emit('roundEnd', {value: val, round}, () => {
                        });
                        setVal('');
                    }
                }, 500);
            } else {

                let end = new Date().getTime() + timer;
                let x = setInterval(function () {

                    // Get today's date and time
                    var now = new Date().getTime();

                    // Find the distance between now and the count down date
                    var distance = end - now;
                    // Time calculations for days, hours, minutes and seconds
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    setTimerDisplay('game will begin in: ' + seconds);
                    // If the count down is finished, write some text
                    if (distance < 1) {
                        clearInterval(x);
                        setTimerDisplay('');
                        setTimer(-1);
                        //TODO: figure out how to start and play the game
                        socket.emit('roundInit', {}, () => {
                        });
                    }
                }, 500);
            }
        }

    }, [timer, round, val]);


    return (
        <div style={{position: 'relative'}}>
            {timer !== -1 ? timerDisplay : null}
            {!isGameStarted && round <= 0 ? <div>waiting for player </div> : null}
            <canvas id={'id'}>
            </canvas>
            <div id='buttonsDiv'>
                <input type='image' alt='1' src='https://midhun9567.files.wordpress.com/2019/05/info-button.png?w=685'/>
                <input type='image' alt='2' src='https://midhun9567.files.wordpress.com/2019/05/info-button.png?w=685'/>
                <input type='image' alt='3' src='https://midhun9567.files.wordpress.com/2019/05/info-button.png?w=685'/>
                <input type='image' alt='4' src='https://midhun9567.files.wordpress.com/2019/05/info-button.png?w=685'/>
            </div>
        </div>
    )
};


export default Game;