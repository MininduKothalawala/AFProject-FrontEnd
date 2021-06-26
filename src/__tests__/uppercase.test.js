const uppercase = require('../uppercase')

//50% branch
test('Uperacse finding',()=>{
    uppercase('Heading',(str) =>{
        expect(str).toBe("HEADING")

    } )
})

//100% branch
test(`uppercase 'test' to equal 'TEST'`, () => {
    return uppercase('').catch(e => {
        expect(e).toMatch('Empty string')
    })
})

