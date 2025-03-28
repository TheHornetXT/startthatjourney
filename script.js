// .-.. .-.. -- / - .... .. -. -.- ... / - .... . .-. . / .- .-. . / -....- -....- -....- / -....- .----. ... / .. -. / ... - .-. .- .-- -... . .-. .-. -.-- | https://thehornetxt.github.io/almostthere/

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const container = document.getElementById('container');
    
    startButton.addEventListener('click', startMorseCode);
    
    function startMorseCode() {
        // Hide the start button and title
        startButton.classList.add('hidden');
        document.querySelector('h1').classList.add('hidden');
        
        // Morse code for "SOURCE CODE"
        const morseCode = {
            'S': '...',
            'O': '---',
            'U': '..-',
            'R': '.-.',
            'C': '-.-.',
            'E': '.',
            'D': '-..',
            ' ': '/'
        };
        
        const text = "SOURCE CODE";
        let index = 0;
        
        function playNextCharacter() {
            if (index >= text.length) {
                // Show the original content after completion
                startButton.classList.remove('hidden');
                document.querySelector('h1').classList.remove('hidden');
                return;
            }
            
            const char = text[index].toUpperCase();
            if (morseCode[char]) {
                const code = morseCode[char];
                playMorseCode(code, () => {
                    index++;
                    setTimeout(playNextCharacter, 1000);
                });
            } else {
                index++;
                setTimeout(playNextCharacter, 1000);
            }
        }
        
        playNextCharacter();
    }
    
    function playMorseCode(code, callback) {
        let codeIndex = 0;
        const dotDuration = 200; // ms
        const dashDuration = 600; // ms
        const spaceBetween = 200; // ms
        
        function playNextSymbol() {
            if (codeIndex >= code.length) {
                setTimeout(callback, spaceBetween);
                return;
            }
            
            const symbol = code[codeIndex];
            let duration;
            
            if (symbol === '.') {
                duration = dotDuration;
            } else if (symbol === '-') {
                duration = dashDuration;
            } else if (symbol === '/') {
                // Word space
                setTimeout(() => {
                    codeIndex++;
                    playNextSymbol();
                }, dashDuration * 2);
                return;
            }
            
            // Flash the screen
            document.body.style.backgroundColor = '#000';
            setTimeout(() => {
                document.body.style.backgroundColor = '#fff';
                setTimeout(() => {
                    document.body.style.backgroundColor = '#000';
                    codeIndex++;
                    setTimeout(playNextSymbol, spaceBetween);
                }, duration);
            }, 50);
        }
        
        playNextSymbol();
    }
});
