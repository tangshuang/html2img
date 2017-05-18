import {Promise} from 'es6-promise-polyfill'
import Html2Image from '../src/script/index'

window.Promise = Promise

document.querySelector('#simple1-download').addEventListener('click',e => {
    Html2Image.save('#simple1', {
        width: 200,
        height: 200,
        type: 'png',
        name: 'my-image',
    })
})

document.querySelector('#simple1-copy').addEventListener('click',e => {
    Html2Image.copy('#simple1', {
        width: 200,
        height: 200,
        type: 'png',
        name: 'my-image',
    })
})
