function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5y9pJJoZLDQ":
        Script1();
        break;
      case "5Y5pkQznCVO":
        Script2();
        break;
      case "5YZ4O40nHXz":
        Script3();
        break;
      case "6gWYz3HaJe8":
        Script4();
        break;
      case "6PEvZc5z2bb":
        Script5();
        break;
      case "5vtEyIE5XU1":
        Script6();
        break;
      case "5wA2IZBYkGg":
        Script7();
        break;
      case "6aEjlXvCx0u":
        Script8();
        break;
      case "5bajveiQ2cz":
        Script9();
        break;
      case "6oJvB2kCvSm":
        Script10();
        break;
      case "6kHgJrv6kMA":
        Script11();
        break;
      case "62s0ubDfSO1":
        Script12();
        break;
      case "5YNbjOdNFUg":
        Script13();
        break;
      case "5kozHPkFGd7":
        Script14();
        break;
      case "6o0yTZ6gmdD":
        Script15();
        break;
      case "5WvzhfFqjE7":
        Script16();
        break;
      case "6IDeJ1GahJp":
        Script17();
        break;
      case "6p1UdAN13yI":
        Script18();
        break;
      case "6LdmNkq9VoO":
        Script19();
        break;
      case "5rTF3rpoesg":
        Script20();
        break;
      case "5mnxaA9OOzo":
        Script21();
        break;
      case "5ijHAEsYOCK":
        Script22();
        break;
      case "5kIJa767SkZ":
        Script23();
        break;
      case "6gWkItyy4fr":
        Script24();
        break;
      case "6JfXbY3MeUR":
        Script25();
        break;
      case "6qQakMDSK2D":
        Script26();
        break;
      case "6L7LFd4l8F4":
        Script27();
        break;
      case "5saLSipg8AQ":
        Script28();
        break;
      case "5wDF6ZaLAy1":
        Script29();
        break;
      case "6SIYadprZLt":
        Script30();
        break;
      case "6pMbdU4BWSY":
        Script31();
        break;
      case "6o5ydqCNSaE":
        Script32();
        break;
      case "6S4D6lkT9fg":
        Script33();
        break;
      case "6OXZIywx32w":
        Script34();
        break;
      case "5tM80WanTCv":
        Script35();
        break;
      case "624cE5aOrFp":
        Script36();
        break;
      case "6cjTQUPpxLJ":
        Script37();
        break;
      case "6nkcpenmQ5g":
        Script38();
        break;
      case "6jCQJaCfzNX":
        Script39();
        break;
  }
}

window.InitExecuteScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  player.once(() => {
const target = object('5uHIMSE4xxo');
const duration = 5000;
const easing = 'linear';
const id = '6bcRH8Qdk6n';
const growAmount = 0.1;
const delay = 0;
addToTimeline(
target.animate([
{ scale: `${1 + growAmount}` }
],
  { fill: 'forwards', delay, duration, easing }
), id
);
});
}

};
