document.addEventListener('DOMContentLoaded', () => {
    const bookContainers = [
        document.getElementById('bookContainer2024'),
        document.getElementById('bookContainer2023'),
        document.getElementById('bookContainer2022'),
        document.getElementById('bookContainer2021'),
        document.getElementById('bookContainer2020')
    ];

    // Function to initialize Matter.js for a specific container
    function initializeBooks(container, books) {
        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Events = Matter.Events;
        const MouseConstraint = Matter.MouseConstraint;
        const Mouse = Matter.Mouse;

        const engine = Engine.create();
        const render = Render.create({
            element: container,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: '#F7F5FB',
                wireframes: false
            }
        });

        const wallOptions = { isStatic: true };
        const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight * 0.9 - 5, window.innerWidth, 90, {
            ...wallOptions,
            render: {
                  fillStyle: '#66462C'
            }
        });
        const leftWall = Bodies.rectangle(-10, window.innerHeight / 2, 10, window.innerHeight, {
            ...wallOptions,
            render: {
                fillStyle: 'rgba(0, 0, 0, 0)'
            }
        });
        const rightWall = Bodies.rectangle(window.innerWidth - 10, window.innerHeight / 2, 10, window.innerHeight, {
            ...wallOptions,
            render: {
                fillStyle: 'rgba(0, 0, 0, 0)'
            }
        });

        const ceiling = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, {
            ...wallOptions,
            render: {
                fillStyle: 'rgba(0, 0, 0, 0)'
            }
        });

        World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: window.innerWidth, y: window.innerHeight }
        });

        render.options.hasBounds = true;

        function createBook(x, y, bwidth, bheight, name, bcolor, tcolor) {
            const book = Bodies.rectangle(x, y, bwidth, bheight, {
                frictionAir: 0.03,
                restitution: 0.5,
                render: {
                    fillStyle: bcolor
                },
                label: name
            });

            World.add(engine.world, book);

            Events.on(render, 'afterRender', function() {
                const context = render.context;
                context.save();
                context.translate(book.position.x, book.position.y);
                context.rotate(book.angle);
                context.fillStyle = tcolor;
                context.font = '16px Arial';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.rotate(-Math.PI / 2);
                context.fillText(book.label, 0, 0);
                context.restore();
            });

            return book;
        }

        // Add books to the container
        books.forEach(book => {
            createBook(book.x, book.y, book.width, book.height, book.name, book.color, book.textColor);
        });

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        World.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        Engine.run(engine);
        Render.run(render);
    }

    // Books for each container
    const books2024 = [
        { x: 550, y: 20, width: 60, height: 540, name: "The Perks of Being a Wallflower - Stephen Chbosky", color: '#9B2226', textColor: '#000000' },
        { x: 650, y: 0, width: 48, height: 480, name: "No Longer Human - Osamu Dazai", color: '#D74D8E', textColor: '#ffffff' },
        { x: 400, y: 0, width: 84, height: 480, name: "Norwegian Wood - Haruki Murakami", color: '#AE2012', textColor: '#ffffff' },
        { x: 400, y: 0, width: 84, height: 480, name: "My Year of Rest and Relaxation - Ottessa Moshfegh", color: '#D74D8E', textColor: '#000000' },
        { x: 500, y: 0, width: 60, height: 420, name: "The Bell Jar - Sylvia Plath", color: '#C9DFD2', textColor: '#D74D8E' },
        { x: 600, y: 0, width: 108, height: 540, name: "A Little Life - Hanya Yanagihara", color: '#D3D3D3', textColor: '#ffffff' },
        { x: 700, y: 0, width: 60, height: 540, name: "Before the Coffee Gets Cold - Toshikazu Kawaguchi", color: '#ffffff', textColor: '#81B29A' },
        { x: 800, y: 0, width: 48, height: 540, name: "The Stranger - Albert Camus", color: '#000000', textColor: '#ffffff' },
        { x: 900, y: 0, width: 72, height: 540, name: "Bunny - Mona Awad", color: '#FF6700', textColor: '#ffffff' },
        { x: 1000, y: 0, width: 84, height: 480, name: "Eileen - Ottessa Moshfegh", color: '#FF006E', textColor: '#ffffff' }
        // Add more books here
    ];

    const books2023 = [
        { x: 550, y: 20, width: 60, height: 540, name: "New Book 1", color: '#FF5733', textColor: '#000000' },
        { x: 650, y: 0, width: 48, height: 480, name: "New Book 2", color: '#C70039', textColor: '#ffffff' },
        // Add more books here
    ];

    // Initialize Matter.js for each container with the respective books
    initializeBooks(bookContainers[0], books2024);
    initializeBooks(bookContainers[1], books2023);
    // Repeat for other containers and book sets

    // DotNav initialization
    new DotNav(document.querySelector('.dotstyle > ul'), {
        callback: function(idx) {
            document.querySelector('.dotstyle .current').classList.remove('current');
            document.querySelectorAll('.dotstyle li')[idx].classList.add('current');
            document.getElementById('slider').style.transform = `translateX(-${idx * 100}vw)`;
        }
    });
});

;( function( window ) {
    'use strict';

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function DotNav(el, options) {
        this.nav = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    DotNav.prototype.options = {};

    DotNav.prototype._init = function() {
        var dots = [].slice.call(this.nav.querySelectorAll('li')), current = 0, self = this;

        dots.forEach(function(dot, idx) {
            dot.addEventListener('click', function(ev) {
                ev.preventDefault();
                if (idx !== current) {
                    dots[current].className = '';
                    setTimeout(function() {
                        dot.className += ' current';
                        current = idx;
                        if (typeof self.options.callback === 'function') {
                            self.options.callback(current);
                        }
                    }, 25);
                }
            });
        });
    }

    window.DotNav = DotNav;
})(window);
