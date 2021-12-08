const bondage = require('bondage');
const runner = new bondage.Runner();

runner.load(
  [
    {
      "title": "Start",
      "tags": "Tag",
      "body": "What are you?\n-> A troll\n    <<set $troll to true >>\n-> A nice person\n    <<set $troll to false >>\n[[Objective]]",
      "position": {
        "x": 449,
        "y": 252
      },
      "colorID": 0
    },
    {
      "title": "Objective",
      "tags": "Tag",
      "body": "<<if $repeat >= 3>>\nBye…\n<<else>>\nIs your objective clear?\n[[Yes|Objective.Yes]]\n[[No|Objective.No]]\n<<if $troll == true>>\n[[Maybe|Objective.Maybe]]\n<<endif>>\n<<endif>>\n",
      "position": {
        "x": 449,
        "y": 252
      },
      "colorID": 0
    },
    {
      "title": "Objective.No",
      "tags": "Tag",
      "body": "Blah blah blah blah\n[[Objective]]",
      "position": {
        "x": 449,
        "y": 252
      },
      "colorID": 0
    },
    {
      "title": "Objective.Yes",
      "tags": "Tag",
      "body": "Good let's start the mission.",
      "position": {
        "x": 449,
        "y": 252
      },
      "colorID": 0
    },
    {
      "title": "Objective.Maybe",
      "tags": "Tag",
      "body": "Are you trolling me?\n[[Objective]]",
      "position": {
        "x": 449,
        "y": 252
      },
      "colorID": 0
    },

    {
      "title": "BasicIf",
      "tags": "Tag",
      "body": "<<set $testvar = 321>>\nText before\n<<if $testvar == 321>>Inside if<<endif>>Text after",
      "position": {
        "x": 449,
        "y": 252
      },
      "colorID": 0
    },
    {
      "title": "BasicIfElse",
      "tags": "Tag",
      "body": "<<set $testvar = 321>>\nText before\n<<if $testvar == 123>>Inside if<<else>>Inside else<<endif>>Text after",
      "position": {
        "x": 449,
        "y": 252
      },
      "colorID": 0
    },
    {
      "title": "BasicIfElseIf",
      "tags": "Tag",
      "body": "<<set $testvar = 321>>\nText before\n<<if $testvar == 123>>Inside if<<elseif $testvar == 321>>Inside elseif<<endif>>Text after",
      "position": {
        "x": 449,
        "y": 252
      },
      "colorID": 0
    },
    {
      "title": "BasicIfElseIfElse",
      "tags": "Tag",
      "body": "<<set $testvar = 321>>\nText before\n<<if $testvar == 123>>Inside if<<elseif $testvar == 1>>Inside elseif<<else>>Inside else<<endif>>Text after",
      "position": {
        "x": 449,
        "y": 252
      },
      "colorID": 0
    }
  ]
);

// Advance the dialogue manually from the node titled 'Start'
const d = runner.run('Start')
console.log('d', d)
let result = d.next().value;
console.log('result', result)
let nextResult = d.next().value;
console.log('nextResult', nextResult)
// And so on






// // Loop over the dialogue from the node titled 'Start'
// for (const result of runner.run('Start')) {
//   console.log('1', 1)
//   // Do something else with the result
//   if (result instanceof bondage.TextResult) {
//     console.log(result.text);
//   } else if (result instanceof bondage.OptionsResult) {
//     // This works for both links between nodes and shortcut options
//     console.log(result.options);
// 
//     // Select based on the option's index in the array (if you don't select an option, the dialog will continue past them)
//     result.select(1);
//   } else if (result instanceof bondage.CommandResult) {
//     // If the text was inside <<here>>, it will get returned as a CommandResult string, which you can use in any way you want
//     console.log(result.text);
//   }
// }

