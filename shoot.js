AFRAME.registerComponent("bullets", {
    init: function () {
      this.shootBullet();
    },
    shootBullet: function () {
        window.addEventListener("keydown", (e) => {
            if (e.key === "z") {
                var bullet = document.createElement("a-entity");
                bullet.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.1,
                });
                colour = ["black", "pink", "blue", "green", "yellow", "red", ]
                bullet.setAttribute("material", "color", "black");
                var cam = document.querySelector("#camera");
                pos = cam.getAttribute("position");
                bullet.setAttribute("position", {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z,
                });
                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                bullet.setAttribute("velocity", direction.multiplyScalar(-10));
                var scene = document.querySelector("#scene");
                bullet.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0",
                });
                bullet.addEventListener("collide", this.stopBullet);
                scene.appendChild(bullet);
                this.shootSound();
            }
        });
    },
    stopBullet: function (e) {
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;
        if (elementHit.id.includes("box")) {
            elementHit.setAttribute("velocity", "0 0 0");
        }
    },
    shootSound: function () {
      var entity = document.querySelector("#sound1");
      entity.components.sound.playSound();
    },
});  