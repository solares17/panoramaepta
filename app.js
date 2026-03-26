window.onload = function () {

    // Описание сцен
    var sceneData = {
        room2: {
            title: "Комната 2",
            desc: "Здесь описание комнаты: мебель, состояние, особенности и т.д."
        }
    };

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
                "panorama": "pictures/part1.jpg",

                "hotSpots": [
                    {
                        "pitch": 0,
                        "yaw": 0,
                        "type": "scene",
                        "text": "К окну",
                        "sceneId": "room2"
                    },
                    {
                        "pitch": 0,
                        "yaw": 180,
                        "type": "scene",
                        "text": "Конец комнаты",
                        "sceneId": "room3"
                    }
                ]
            },

            "room2": {
                "title": "Окно",
                "type": "equirectangular",
                "panorama": "pictures/part2.jpg",

                "hotSpots": [
                    {
                        "pitch": 0,
                        "yaw": -10,
                        "type": "scene",
                        "text": "К двери",
                        "sceneId": "room1"
                    },
                     {
                        "pitch": 0,
                        "yaw": 180,
                        "type": "scene",
                        "text": "Конец комнаты",
                        "sceneId": "room3"
                    }
                ]
            },
            
            "room3": {
                "title": "Конец комнаты",
                "type": "equirectangular",
                "panorama": "pictures/part3.jpg",

                "hotSpots": [
                    {
                        "pitch": 0,
                        "yaw": 0,
                        "type": "scene",
                        "text": "К окну",
                        "sceneId": "room2"
                    },
                    {
                        "pitch": 0,
                        "yaw": 180,
                        "type": "scene",
                        "text": "К двери",
                        "sceneId": "room1"
                    }
                ]
            }

        }

    });

    // Обработка смены сцены (показ описания)
    viewer.on('scenechange', function(sceneId) {

        var box = document.getElementById('sceneInfo');

        if (sceneId === "room2") {
            document.getElementById('sceneTitle').innerText = sceneData.room2.title;
            document.getElementById('sceneDesc').innerText = sceneData.room2.desc;
            box.classList.remove('hidden');
        } else {
            box.classList.add('hidden');
        }

    });

    // Функция для карты / кнопок
    window.loadScene = function(scene){
        viewer.loadScene(scene);
    };

};
