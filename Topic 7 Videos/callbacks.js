
let animals = ['Giraffe', 'Elephant', 'Yak']

//  function can have one or two arguments
animals.forEach( function(animal, index) {
    console.log(animal, index)
} )

// using arrow notation:
animals.forEach( (animal, index) => {
    console.log(index, animal)
})

//   if only 1 line can omit {}
animals.forEach( (animal, index) =>
    console.log(index, animal))

// if only 1 argument and only 1 line of code:
// can leave out parentheses and curly braces
animals.forEach( animal => console.log(animal))