window.onload = function () {

    // Инициализация viewer
    window.viewer = pannellum.viewer('panorama', {

        "default": {
            "firstScene": "room1",
            "sceneFadeDuration": 1000,
            "autoLoad": true
        },

        "scenes": {

            "room1": {
                "title": "У двери",
                "type": "equirectangular",
                "panorama": "images/part1.jpg",

                "hotSpots": [
                    {
                        "pitch": 0,
                        "yaw": -70,
                        "type": "scene",
                        "text": "К окну",
                        "sceneId": "room2"
                    },
                    {
                        "pitch": 0,
                        "yaw": 0,
                        "type": "scene",
                        "text": "Конец комнаты",
                        "sceneId": "room3"
                    }
                ]
            },

            "room2": {
                "title": "Окно",
                "type": "equirectangular",
                "panorama": "images/part2.jpg",

                "hotSpots": [
                    {
                        "pitch": 0,
                        "yaw": 30,
                        "type": "scene",
                        "text": "К двери",
                        "sceneId": "room1"
                    },
                     {
                        "pitch": 0,
                        "yaw": -60,
                        "type": "scene",
                        "text": "Конец комнаты",
                        "sceneId": "room3"
                    }
                ]
            },
            
            "room3": {
                "title": "Конец комнаты",
                "type": "equirectangular",
                "panorama": "images/part3.jpg",

                "hotSpots": [
                    {
                        "pitch": 0,
                        "yaw": 30,
                        "type": "scene",
                        "text": "К окну",
                        "sceneId": "room2"
                    },
                    {
                        "pitch": 0,
                        "yaw": -30,
                        "type": "scene",
                        "text": "К двери",
                        "sceneId": "room1"
                    }
                ]
            }

        }

    });

    // Функция для карты / кнопок
    window.loadScene = function(scene){
        viewer.loadScene(scene);
    };

};
function toggleChat() {
    const chat = document.getElementById("chat-window");
    chat.classList.toggle("open");
}

async function sendMessage() {
    const input = document.getElementById("chat-input");
    const text = input.value;

    if (!text) return;

    const box = document.getElementById("chat-messages");

    box.innerHTML += `<p><b>Ты:</b> ${text}</p>`;

    const res = await fetch("https://your-api.onrender.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    box.innerHTML += `<p><b>ИИ:</b> ${data.reply}</p>`;

    input.value = "";
    box.scrollTop = box.scrollHeight;
}
