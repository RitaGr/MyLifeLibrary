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
            background: '##E09F3E', // background color of the book container
            wireframes: false
        }
    });

    // Add the walls to the world
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

    // Position the ceiling at 90% of the window height
    const ceilingHeight = window.innerHeight * 0.9;
    const ceiling = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, {
        ...wallOptions,
        render: {
            fillStyle: '66462C'
        }
    });
    const shelf = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, {
        ...wallOptions,
        render: {
            fillStyle: '66462C'
        }
    });


    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Custom rendering function to draw text
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
            context.rotate(-Math.PI / 2); // Rotate the text to vertical
            context.fillText(book.label, 0, 0);
            context.restore();
        });

        return book;
    }

    // Create individual books with names
    const book1 = createBook(550, 20, 60, 540, "The Perks of Being a Wallflower - Stephen Chbosky", '#9B2226', '#000000');
    const book2 = createBook(650, 0, 48, 480, "No Longer Human - Osamu Dazai", '#D74D8E', '#ffffff');
    const book3 = createBook(400, 0, 84, 480, "Norwegian Wood - Haruki Murakami", '#AE2012', '#ffffff');
    const book4 = createBook(400, 0, 84, 480, "My Year of Rest and Relaxation - Ottessa Moshfegh", '#D74D8E', '#000000');
    const book5 = createBook(500, 0, 60, 420, "The Bell Jar - Sylvia Plath", '#C9DFD2', '#D74D8E');
    const book6 = createBook(600, 0, 108, 540, "A Little Life - Hanya Yanagihara", '#D3D3D3', '#ffffff');
    const book7 = createBook(700, 0, 60, 540, "Before the Coffee Gets Cold - Toshikazu Kawaguchi", '#ffffff', '#81B29A');
    const book8 = createBook(800, 0, 48, 540, "The Stranger - Albert Camus", '#000000', '#ffffff');
    const book9 = createBook(900, 0, 72, 540, "Bunny - Mona Awad", '#FF6700', '#ffffff');
    const book15 = createBook(1000, 0, 84, 480, "Eileen - Ottessa Moshfegh", '#FF006E', '#ffffff');

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

;( function( window ) {

	'use strict';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function DotNav( el, options ) {
		this.nav = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}

	DotNav.prototype.options = {};

	DotNav.prototype._init = function() {
		// special case "dotstyle-hop"
		var hop = this.nav.parentNode.className.indexOf( 'dotstyle-hop' ) !== -1;

		var dots = [].slice.call( this.nav.querySelectorAll( 'li' ) ), current = 0, self = this;

		dots.forEach( function( dot, idx ) {
			dot.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				if( idx !== current ) {
					dots[ current ].className = '';

					// special case
					if( hop && idx < current ) {
						dot.className += ' current-from-right';
					}

					setTimeout( function() {
						dot.className += ' current';
						current = idx;
						if( typeof self.options.callback === 'function' ) {
							self.options.callback( current );
						}
					}, 25 );						
				}
			} );
		} );
	}

	// add to global namespace
	window.DotNav = DotNav;

})( window );
