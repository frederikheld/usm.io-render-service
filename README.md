# usm.io

## What is this?

usm.io can render a User Story Map described in XML into a SVG graphic.

## But why?

I was looking for a way to maintain an User Story Map directly in my repository. To achieve this I needed a easy way to create a map that is diffable and does not focus on the graphical representation but on the inforation in the map. There was no such tool so I wrote this one.

## How do I use it?

You need to have `Node.js` and `npm` installed. Go to the root of the repository and run

`$ npm start`

Then navigate to `localhost:8080` with your webbrowser. You see a rendered User Story Map.

You can edit this User Story Map by editing the file `data/usm.xml` in your favorite text editor.

## What is an User Story Map?

User Story Mapping is a method to represent your Agile Product Backlog in multiple dimensions. It's a very visual approach to maintaining a Backlog because it gives you a better overview of your product and your roadmap. Thanks to these qualities it is an excellent base for discussions with your stakeholders.

For more information on User Story Mapping [see Jeff Pattons website](https://jpattonassociates.com/user-story-mapping/) or [read his book about User Story Mapping](https://jpattonassociates.com/jeff-pattons-book-released-user-story-mapping/).

## How does it work?

The implementation is in JavaScript using the `D3` library to create the SVG.

To display the user interface it runs a little webserver written in `Node.js` using the `express` library.

Right now the code is still a bit messed up, so it might be a bit difficult for you to catch on. I'm trying to fix this as fast as I'm learning JS and D3.

Basically I tried to represent each element of the USM as an object. The objects are nested as the elements in the USM are. Each object renders it's graphical representation as a SVG group which is transformed to it's position in relation to the parent group.

## How can I contribute?

So if you would like to take the challenge, feel free to send me pull requests with your contribution! I'm especially happy about hints how to apply common design patterns in JS.

## What's next?

Next steps are:

- [x] Implement word wrap for card titles
- [x] Implement activities above steps
- [ ] Fix scaling of SVG
- [ ] Add display of card details when clicking on a card
- [ ] Make Activities optional
- [ ] Implement tagging to visually emphasize groups of cards
- [ ] Get rid of bodies do make xml and implementation less complicated?
- [ ] Implement a way to store the SVG as PNG or JPG
- [ ] Add a command line interface so that usm.io can be used in a build pipeline
- [ ] Implement interactive editing

The overall challenge is to structure the code in a more readable and maintainable way by applying common design patterns.
