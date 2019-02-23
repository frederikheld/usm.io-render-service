import hello from './hello.js'

export default function Foo () {

}

Foo.prototype.hello = function (name) {
    // console.log("Foo says: Hello " + name + "!")
    console.log('Foo says:')
    hello(name)
}
