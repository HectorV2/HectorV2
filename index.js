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

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
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
const token = rs.question(chalk.red([+] Input you token : ));
  if (token == "1") {
    await delay(1000);
    console.clear('');
  console.log(chalk.blueBright(`
██╗  ██╗███████╗ ██████╗████████╗ ██████╗ ██████╗ 
██║  ██║██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
███████║█████╗  ██║        ██║   ██║   ██║██████╔╝
██╔══██║██╔══╝  ██║        ██║   ██║   ██║██╔══██╗
██║  ██║███████╗╚██████╗   ██║   ╚██████╔╝██║  ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
`));

  const auth = rs.question(chalk.blueBright('Enter Auth Keys : '));
  const time = rs.question(chalk.blueBright('Enter Delay In Milisecond : '));
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.redBright(`Auth Sudah Expired`));

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const created = data.User.Created;
      const loging = data.User.LastLogin
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

      console.log(chalk.blueBright(`\r
♨  [${moment().format('HH:mm:ss')}]  ♨
~  ${(`Country : ${country}`)}
~  ${(`Username : ${username}`)}  
~  ${(`Crown : ${crown}`)}  
~  ${(`Trophy : ${trophy}`)}
~  ${(`Status : ✓ Success`)}`));
      await delay(time)

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Your Account Has Been Banned`));
      break;
    }
  }

}})();
