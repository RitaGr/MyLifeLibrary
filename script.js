document.addEventListener('DOMContentLoaded', () => {
    const bookContainers = [
        document.getElementById('bookContainer2025'),
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

        function createBook(x, y, bwidth, bheight, name, bcolor, tcolor, orientation = 'vertical') {
            const book = Bodies.rectangle(x, y, bwidth, bheight, {
                frictionAir: 0.03,
                restitution: 0.5,
                render: {
                    fillStyle: bcolor // book color
                },
                label: name // display name of the book on the cover
            });
        
            World.add(engine.world, book);
        
            // Add custom rendering for the book name
            Events.on(render, 'afterRender', function() {
                const context = render.context;
                context.save();
                context.translate(book.position.x, book.position.y);
                context.rotate(book.angle);
                context.fillStyle = tcolor; // text color
                context.font = '16px Arial';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                if (orientation === 'vertical') {
                    context.rotate(-Math.PI / 2); // Rotate the text to vertical
                }
                context.fillText(book.label, 0, 0);
                context.restore();
            });
        
            return book;
        }
        

        // Add books to the container
        books.forEach(book => {
            createBook(book.x, book.y, book.width, book.height, book.name, book.color, book.textColor, book.orientation);
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
    const books2025 = [
        { x: 600, y: 300, width: 84, height: 420, name: "Кровь Эльфов - Анджей Сапковский", color: '#020300', textColor: '#0CBABA', orientation: 'vertical' }
    ];
    // Books for each container
    const books2024 = [
        { x: 1100, y: 100, width: 800, height: 120, name: "To Paradise - Hanya Yanagihara", color: '#020300', textColor: '#0CBABA', orientation: 'horizontal' },
        { x: 600, y: 100, width: 84, height: 480, name: "Eileen - Ottessa Moshfegh", color: '#FF006E', textColor: '#ffffff', orientation: 'vertical' },
        { x: 600, y: 100, width: 84, height: 480, name: "Makeover - Lynda Chater", color: '#FFB703', textColor: '#C1121F', orientation: 'vertical' },
        { x: 600, y: 100, width: 84, height: 480, name: "Tender is the Flesh - Agustina Bazterrica", color: '#780000', textColor: '#FFFFFF', orientation: 'vertical' },
        { x: 1100, y: 100, width: 500, height: 60, name: "First Person Singular - Haruki Murakami", color: '#FDF8E1', textColor: '#C9A227', orientation: 'horizontal' }
        // Add more books here
    ];

        

    const books2023 = [
        { x: 950, y: 0, width: 540, height: 60, name: "The Perks of Being a Wallflower - Stephen Chbosky", color: '#9B2226', textColor: '#000000', orientation: 'horizontal' },
        { x: 350, y: 100, width: 48, height: 480, name: "No Longer Human - Osamu Dazai", color: '#D74D8E', textColor: '#ffffff', orientation: 'vertical' },
        { x: 400, y: 200, width: 84, height: 480, name: "Norwegian Wood - Haruki Murakami", color: '#AE2012', textColor: '#ffffff', orientation: 'vertical' },
        { x: 300, y: 300, width: 84, height: 480, name: "My Year of Rest and Relaxation - Ottessa Moshfegh", color: '#D74D8E', textColor: '#000000', orientation: 'vertical' },
        { x: 900, y: 300, width: 420, height: 60, name: "The Bell Jar - Sylvia Plath", color: '#C9DFD2', textColor: '#D74D8E', orientation: 'horizontal' },
        { x: 900, y: 500, width: 540, height: 108, name: "A Little Life - Hanya Yanagihara", color: '#D3D3D3', textColor: '#ffffff', orientation: 'horizontal' },
        { x: 700, y: 600, width: 540, height: 60, name: "Before the Coffee Gets Cold - Toshikazu Kawaguchi", color: '#ffffff', textColor: '#81B29A', orientation: 'horizontal' },
        { x: 800, y: 700, width: 540, height: 48, name: "The Stranger - Albert Camus", color: '#000000', textColor: '#ffffff', orientation: 'horizontal' },
        { x: 900, y: 800, width: 540, height: 72, name: "Bunny - Mona Awad", color: '#FF6700', textColor: '#ffffff', orientation: 'horizontal' }
        // Add more books here
    ];

    // Initialize Matter.js for each container with the respective books
    initializeBooks(bookContainers[0], books2025);
    initializeBooks(bookContainers[1], books2024);
    initializeBooks(bookContainers[2], books2023);
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
