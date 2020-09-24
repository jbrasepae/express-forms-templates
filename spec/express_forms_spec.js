const{app} = require('../src/express_forms');
const supertest = require('supertest');
const {JSDOM} = require('jsdom');

describe('index.html', function(){
    var browser;

    beforeEach (function(done){
        JSDOM.fromFile('./src/index.html',{

        }).then(function(res){
            browser = res;
            done();
        })
        
    })
    afterEach(function(){
        browser.window.close();
    })
    it('should have a <h1> element', function(){
        var h1 = browser.window.document.querySelector('h1');
        expect(h1).not.toBeNull();
    })
    it ('should have form elements', function(){
        var form = browser.window.document.querySelector('form');
        expect(form).not.toBe(null);
    })
    it('should have inputs', function() {
        var input = browser.window.document.querySelector('input');
        expect(input).toBe(input);
    })
})
// describe('routes connection to server', () =>{
//     let server;

    // beforeEach(() => {
    //     app = require('../src/express_forms')
    // });

    // afterEach((done) =>{
    //     server.close(done);
    // })
//     it('', function(done) {
//         const app = supertest(server);
//         app.get('./').expect(404).end(finishTestcase(done));
// });
// })
