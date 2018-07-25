import * as lib from 'com/Lib/lib'
import * as sub from 'com/Lib/sub'

export default function(el: Element) {
    lib.run();
    sub.run();
    console.log('run app index');
}