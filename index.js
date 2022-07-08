const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');
const delay = require('delay');
const chalkRainbow = require('chalk-rainbow')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch(`http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3`, {
      headers: {
         'authorization': auth
      }
  })
      .then(res => res.text())
      .then(data => {
        resolve(data);
     })
     .catch(err => {
      reject(err);
   });

});

(async () => {
const token = rs.question(chalk.greenBright(`[+] Input you token : `));
  if (token == "1") {
    await delay(1000);
    console.clear('');
  console.log(chalk.cyanBright(`
██╗  ██╗███████╗ ██████╗████████╗ ██████╗ ██████╗ 
██║  ██║██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
███████║█████╗  ██║        ██║   ██║   ██║██████╔╝
██╔══██║██╔══╝  ██║        ██║   ██║   ██║██╔══██╗
██║  ██║███████╗╚██████╗   ██║   ╚██████╔╝██║  ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
`));

const questions = [
    {
        type: 'input',
        name: 'auth',
        message: ${chalk.blue(`Enter Auth Keys:`));
        prefix: `${chalk.blue(`[`, `redBright`))}+${chalk.blue(`]`, `redBright`))}:
        suffix: '~',
        validate: function (input) {
            const done = this.async();
            if (!input) {
                done('You need Enter a Auth keys');
                return false;
            }
        },
    },
    {
        type: "input",
        name: "delay",
        message: `${chalk.blue("Interval Delay:")),
        prefix: `${chalk.blue("[", "redBright"))}+${chalk.blue("]", "redBright"))}`:
        suffix: "~",
        default: 1000,
        validate: function (input) {
            const done = this.async();
            if (input && isNaN(input)) {
                done('You need enter a number');
                return false;
            }
            return done(null, true);
        },
    }
];

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.bgRed(`Auth Sudah Expired`));
      break;

    } else if (result.includes('User')) {
      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

      console.log(chalk.cyanBright(chalk.bold(`\r
♨  [${moment().format('HH:mm:ss')}]  ♨
~  ${(`Country : ${country}`)}
~  ${(`Username : ${username}`)}
~  ${(`Crown : ${crown}`)}  
~  ${(`Trophy : ${trophy}`)}
~  ${(`Status : ✓ Success`)}`)));
      await delay(time)

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Your Account Has Been Banned`));
      break;
    }
  }

}})();
