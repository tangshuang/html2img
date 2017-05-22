import {Promise} from 'es6-promise-polyfill'
import Html2img from '../src/index'

window.Promise = Promise

var options = {
    type: 'jpg',
    name: 'my-image',
}

document.querySelector('#simple1-download').addEventListener('click',e => {
    Html2img.save('#simple1', options)
})

document.querySelector('#simple1-copy').addEventListener('click',e => {
    Html2img.copy('#simple1', options)
})
