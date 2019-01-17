'use strict';

const Readline = require('readline'); //for reading inputs 
const rl = Readline.createInterface({ //for reading inputs
  input : process.stdin, 
  output : process.stdout, 
  terminal : false
})

rl.setPrompt('>');
rl.prompt(); 
rl.on('line', reply =>{
  console.log(`you said ${reply}`);
  var location= reply.match(/(\bin|of|at\b) (\w+)/);
  console.log(location[2]);
  console.log();
  rl.prompt(); 
});