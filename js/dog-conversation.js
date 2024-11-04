const style = document.createElement('style');
style.textContent = `
    .container[data-my-dog] {
        width: 210px;
        height: 310px;
        padding: 40px 0;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100000;
        display: flex;
        align-items: flex-end;
        flex-direction: column; 
        justify-content: flex-start;
        cursor: pointer;
    }

    .speech-bubble[data-my-dog] {
        background: #fffbd7;
        border-radius: 8px;
        padding: 10px 15px;
        max-width: 250px;
        font-size: 14px;
        color: #525252;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: relative;
        z-index: 1;
        transition: transform 0.5s ease, opacity 0.5s ease;
    }

    .bubble-container[data-my-dog] {
        position: relative;
        top: 16px;
        right: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        transition: transform 0.5s ease, opacity 0.5s ease;
    }

    .floating-bubble[data-my-dog] {
        background: linear-gradient(145deg, #fff7dd, #fff0e1);
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        animation: float 1s ease-in-out infinite alternate;
    }

    .floating-bubble:nth-child(1)[data-my-dog] {
        width: 30px;
        height: 30px;
        animation: float 1s ease-in-out infinite alternate;
    }

    .floating-bubble:nth-child(2)[data-my-dog] {
        width: 25px;
        height: 25px;
        animation: float 1.2s ease-in-out infinite alternate;
    }

    .floating-bubble:nth-child(3)[data-my-dog] {
        width: 20px;
        height: 20px;
        margin-right: 20px;
        animation: float 1.5s ease-in-out infinite alternate;
    }

    @keyframes float {
        0% { transform: translateX(0) scale(1); }
        100% { transform: translateX(5px) scale(1.2); }
    }

    .fade-out {
        opacity: 0;
        transform: translateX(-20px);
    }

    .fade-in {
        opacity: 1;
        transform: translateX(10px);
    }

    .bubble-container.fade-out {
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

const container = document.createElement('div');
container.className = 'container';
container.id = 'bubbleContainer';
container.setAttribute('data-my-dog', '');

const speechBubble = document.createElement('div');
speechBubble.className = 'speech-bubble';
speechBubble.id = 'speechBubble';
speechBubble.textContent = '你来啦！狗好想你~🐕‍🦺';
speechBubble.setAttribute('data-my-dog', '');

const bubbleContainerEl = document.createElement('div');
bubbleContainerEl.className = 'bubble-container';
bubbleContainerEl.id = 'bubbleContainerEl';
bubbleContainerEl.setAttribute('data-my-dog', '');

for (let i = 0; i < 3; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';
    bubble.setAttribute('data-my-dog', '');
    bubbleContainerEl.appendChild(bubble);
}

container.appendChild(speechBubble);
container.appendChild(bubbleContainerEl);
document.body.appendChild(container);

const contentList = [
    "狗闻到了美味的骨头！ 🦴",
    "快来和狗玩，主人！ 🐾",
    "你能再给我一点零食吗？ 🍖",
    "狗不要洗澡嘛~~ 🐕",
    "新朋友吗？给狗闻闻！🐶",
    "不要抛下狗 狗很乖的 ❤️",
    "可以带狗去散步嘛！ 🌳",
    "快看狗的尾巴！ 👋"
];

let currentIndex = 0;
let timeoutId;

function updateContent() {
    speechBubble.classList.add('fade-out');

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % contentList.length;
        speechBubble.textContent = contentList[currentIndex];
        speechBubble.classList.remove('fade-out');
        bubbleContainerEl.classList.remove('fade-out');
        speechBubble.classList.add('fade-in');
        bubbleContainerEl.classList.add('fade-in');

        setTimeout(() => {
            speechBubble.classList.remove('fade-in');
            bubbleContainerEl.classList.remove('fade-in');
        }, 500);
    }, 500);
}

function clearContent() {
    speechBubble.classList.add('fade-out');
    bubbleContainerEl.classList.add('fade-out');
}

function resetTimeout() {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        clearContent();
    }, 3000);
}

container.addEventListener("click", () => {
    resetTimeout();
    updateContent();
});

const randomContentList = [
    "不要摸我嘛！ 😳",
    "人家害羞羞啦！ 🥺"
];

function updateRandomContent() {
    speechBubble.classList.add('fade-out');

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * randomContentList.length);
        speechBubble.textContent = randomContentList[randomIndex];
        speechBubble.classList.remove('fade-out');
        bubbleContainerEl.classList.remove('fade-out');
        speechBubble.classList.add('fade-in');
        bubbleContainerEl.classList.add('fade-in');

        setTimeout(() => {
            speechBubble.classList.remove('fade-in');
            bubbleContainerEl.classList.remove('fade-in');
        }, 500);
    }, 500);
}

let lastMouseX = null;
let lastMouseY = null;
let lastMoveTime = 0;

container.addEventListener("mousemove", (event) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const inCoreArea =
        event.clientX > centerX - 105 &&
        event.clientX < centerX + 105 &&
        event.clientY > centerY - 25 &&
        event.clientY < centerY + 25;

    if (inCoreArea) {
        if (lastMouseX !== null && lastMouseY !== null && 
            (event.clientX !== lastMouseX || event.clientY !== lastMouseY)) {
            const currentTime = Date.now();
            if (currentTime - lastMoveTime > 200) {
                lastMoveTime = currentTime;
                resetTimeout();
                updateRandomContent();
            }
        }
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    } else {
        lastMouseX = null;
        lastMouseY = null;
    }
});

resetTimeout();