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

    // Custom rendering function to draw text
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
    });

    render.options.hasBounds = true;

    function createBook(x, y, bwidth, bheight, name) {
        const book = Bodies.rectangle(x, y, bwidth, bheight, {
            frictionAir: 0.02,
            restitution: 0.6,
            render: {
                fillStyle: '#ffffff'
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
            context.fillStyle = '#000000';
            context.font = '14px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.rotate(-Math.PI / 2); // Rotate the text to vertical
            context.fillText(book.label, 0, 0);
            context.restore();
        });

        return book;
    }

    // Create individual books with names
    const book1 = createBook(100, 0, 50, 450, "The Perks of Being a Wallflower - Stephen Chbosky");
    const book2 = createBook(800, 0, 60, 500, "No Longer Human - Osamu Dazai");
    const book3 = createBook(500, 0, 70, 400, "Norwegian Wood - Haruki Murakami");
    const book4 = createBook(500, 0, 70, 400, "Eileen - Ottessa Moshfegh");

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
