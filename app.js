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


(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="4UaLU3TK5JaIxuILKdelv";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();

