document.addEventListener('DOMContentLoaded', () => {
    const bookContainer = document.getElementById('bookContainer');

    // Matter.js initialization
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Events = Matter.Events;
    const MouseConstraint = Matter.MouseConstraint;
    const Mouse = Matter.Mouse;

    const engine = Engine.create();
    const render = Render.create({
        element: bookContainer,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: '#ecf0f1',
            wireframes: false
        }
    });

    // Add the walls to the world
    const wallOptions = { isStatic: true };
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 20, window.innerWidth, 40, wallOptions);
    const leftWall = Bodies.rectangle(-20, window.innerHeight / 2, 40, window.innerHeight, wallOptions);
    const rightWall = Bodies.rectangle(window.innerWidth + 20, window.innerHeight / 2, 40, window.innerHeight, wallOptions);

    World.add(engine.world, [ground, leftWall, rightWall]);

    // Function to create a book with individual name
    function createBook(x, y, name) {
        const book = Bodies.rectangle(x, y, 50, 70, { frictionAir: 0.02, restitution: 0.6 });
        World.add(engine.world, book);

        // // Create a div element for the book's name
        const bookNameElement = document.createElement('div');
        bookNameElement.classList.add('book');// bookNameElement.classList.add('book', 'falling-book');
        // bookNameElement.innerText = name;
        // document.body.appendChild(bookNameElement);

        // Update the position of the book's name
        function updateNamePosition() {
            const { x, y } = book.position;
            const offsetTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
            bookNameElement.style.transform = `translate(${x}px, ${y - offsetTop}px)`;
        }

        // Call updateNamePosition on every render
        Events.on(render, 'beforeRender', updateNamePosition);

        return book;
    }

    // Create individual books with names
    const book1 = createBook(100, 0, "The Perks of Being a Wallflower - Stephen Chbosky");
    const book2 = createBook(300, 0, "No Longer Human - Osamu Dasai");
    const book3 = createBook(500, 0, "Norwegian Wood - Haruki Murakami");

    // Enable mouse interaction
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

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the engine
    Engine.run(engine);
    Render.run(render);
});
