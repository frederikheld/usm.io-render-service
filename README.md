# usm.io

## What is this?

usm.io can render a User Story Map described in XML into a SVG graphic.

## How do I use it?

You need to have `Node.js` and `npm` installed globally.

### Build it

To build the library, run

`$ npm run build`

from the root of this repository.

This will create a bundled version of the library in `dist/`.

This will also copy the bundle to the folder `web/3rdparty/usm.io` of the example app. So you can re-build the library while running the example app in the browser as explained in the next section. Just re-load the page after the build has finished.

### Run the example app

This library comes with an example app. To start it, run

`$ npm start`

from the root of this repository.

The app will be available at `localhost:8080` via your webbrowser. Open the page and you will see a rendered User Story Map.

The example app is served by a webserver that also serves the example data located at `data/`. You can edit the User Story Map by editing the file `data/usm.xml` in your favorite text editor while the app is running. Just re-load the web page after saving the changes to `usm.xml`.

### Use the library in your own app

After building you can copy the bundled version from `dist/` to your own app.

You have to include it in your browser via a script tag. Then you can create the User Story Map as shown in `index.html` of the example app.

If you don't want to build the library yourself, you can use the pre-built library instead. Just link to https://apis.frederikheld.de/usmio/usmio.min.js in the script tag.

Beware: This is the latest build, so it might behave unexpected!

## But why?

I was looking for a way to maintain an User Story Map directly in my repository. To achieve this I needed a easy way to create a map that is diffable and does not focus on the graphical representation but on the inforation in the map. There was no such tool so I wrote this one.

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

### To Do

- [ ] Add display of card details when clicking on a card
- [ ] Make Activities optional
- [ ] Implement tagging to visually emphasize groups of cards
- [ ] Get rid of bodies do make xml and implementation less complicated?
- [ ] Implement a way to store the SVG as PNG or JPG
- [ ] Implement interactive editing

### Done

- [x] Bundle library for use in browsers
- [x] Add a command line interface so that usm.io can be used in a build pipeline
- [x] Implement word wrap for card titles
- [x] Implement activities above steps
- [x] Modularized JS
- [x] Fix scaling of SVG

The overall challenge is to structure the code in a more readable and maintainable way by applying common design patterns.
