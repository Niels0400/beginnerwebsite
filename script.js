const canvas = document.getElementById('matrix');
const ctx = canvas && canvas.getContext('2d');

if (canvas && ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px arial";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33);
}

// De sleutel is gecodeerd in Base64. Decodeer het om de login-cookie te vinden.
const geheim = 'SGFjazEyMw==';
document.cookie = 'Sessie_Sleutel=' + atob(geheim) + '; path=/; max-age=3600';

const hints = [
    'Hint 1: Klik rechtermuis knop en dan Inspect.',
    'Hint 2: Kijk in het script voor een Base64-code.',
    'Hint 3: Decodeer het in crackstation.net',
    'Hint 4: De cookies staat hij ook in ;).'
];

let hintIndex = 0;

function showHint() {
    const container = document.getElementById('hintContainer');
    const button = document.getElementById('hintKnop');
    if (!container || hintIndex >= hints.length) return;

    const p = document.createElement('p');
    p.className = 'hint-text';
    p.innerText = hints[hintIndex];
    container.appendChild(p);
    hintIndex++;

    if (hintIndex === hints.length) {
        button.style.display = 'none';
    } else {
        button.innerText = 'NOG EEN HINT?';
    }
}

function checkPassword() {
    const entered = document.getElementById('passwordInput').value;
    const cookies = document.cookie.split('; ');
    const cookieData = cookies.find(row => row.startsWith('Sessie_Sleutel='));
    const secret = cookieData ? cookieData.split('=')[1] : null;

    if (entered === secret) {
        window.location.href = 'bericht.html';
    } else {
        alert('Foute code. Probeer de developer tools.');
    }
}
