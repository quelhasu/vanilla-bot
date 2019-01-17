'use strict';
const request = require('request');
const api_secret = "3256f19960bc8409e6825ee8382d1389";

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
  var location= reply.match(/(w|W)hat.*\b(in|of|at)\b (\w+)/, "i");
  console.log('location:', location[3]);
  console.log();
  rl.prompt(); 
});

