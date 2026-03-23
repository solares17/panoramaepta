window.viewer = pannellum.viewer('panorama', {
"default": {
    "firstScene": "room1",
    "sceneFadeDuration": 1000,
    "autoLoad": true
},

"scenes": {

    "room1": {
        "title": "Комната 1",
        "type": "equirectangular",
        "panorama": "room1.jpg",

        "hotSpots": [
            {
                "pitch": 0,
                "yaw": 0,
                "type": "scene",
                "text": "Перейти в комнату 2",
                "sceneId": "room2"
            }
        ]
    },

    "room2": {
        "title": "Комната 2",
        "type": "equirectangular",
        "panorama": "room2.jpg",

        "hotSpots": [
            {
                "pitch": 0,
                "yaw": -10,
                "type": "scene",
                "text": "Назад в комнату 1",
                "sceneId": "room1"
            }
        ]
    }

}

});

function loadScene(scene){
    viewer.loadScene(scene);
}
