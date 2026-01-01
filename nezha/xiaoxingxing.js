/* 鼠标特效 - 小星星拖尾 */
(function fairyDustCursor() {

    var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = { x: width / 2, y: width / 2 };
    var particles = [];

    function init() {
        bindEvents();
        环形（）;
    }

    // 绑定所需的事件
    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize(e) {
        宽度 = window.innerWidth;
        高度 = window.innerHeight;
    }

    function onMouseMove(e) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;

        addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
    }

    function addParticle(x, y, color) {
        var particle = new Particle();
        particle.init(x, y, color);
        particles.push(particle);
    }

    function updateParticles() {

        // 已更新
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        // 去除死粒子
        for (var i = particles.length - 1; i >= 0; i--) {
            如果 (particles[i].lifeSpan < 0) {
                particles[i].die();
                particles.splice(i, 1);
            }
        }

    }

    函数 loop() {
        请求动画帧（循环）；
        updateParticles();
    }

    /**
     * 粒子
     */

    函数 Particle() {

        this.character = "*";
        this.lifeSpan = 120; //毫秒
        this.initialStyles = {
            "位置": "固定"
            "display": "inline-block",
            顶部： 0px，
            "左": "0px",
            "pointerEvents": "无",
            "touch-action": "无",
            "z-index": "10000000",
            "fontSize": "25px",
            “将改变”： “转变”
        };

        // 初始化并设置属性
        this.init = function (x, y, color) {

            this.速度 = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y：1
            };

            this.position = { x: x + 10, y: y + 10 };
            this.initialStyles.color = color;

            this.element = document.createElement('span');
            this.element.innerHTML = this.character;
            applyProperties(this.element, this.initialStyles);
            this.update();

            document.querySelector('.js-cursor-container').appendChild(this.element);
        };

        this.update = function () {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;

            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
        }

        this.die = function () {
            this.element.parentNode.removeChild(this.element);
        }

    }

    /**
     * 工具
     */

    // 将 CSS `properties` 应用于元素。
    function applyProperties(target, properties) {
        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    如果 (!('ontouchstart' 在窗口中 || navigator.msMaxTouchPoints)) 初始化();
})();
