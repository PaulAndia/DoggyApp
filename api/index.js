//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Temperaments } = require('./src/db.js');
const axios = require("axios");

const getDogsTemperaments = async () => {
  try {
      const info = await axios.get("https://api.thedogapi.com/v1/breeds");
      let temps = info.data.map(e => e.temperament)
      let res = temps.filter(el => el !== undefined)
      let tempsArr = res.map(e => e.split(", ")) // --> [["Aloof", "Alert", ...], [], ....]
      let obj = {};
      for (let i = 0; i < tempsArr.length; i++) {
        for (let j = 0; j < tempsArr[i].length; j++) {
              if(!obj[tempsArr[i][j]]){
                  obj[tempsArr[i][j]] = 1
              }else{
                  obj[tempsArr[i][j]] += 1
                }
          }
      }
      let t = Object.keys(obj);

    for (let i = 0; i < t.length; i++) {
      Temperaments.findOrCreate({
        where: {name: t[i].toLowerCase()}
      })
    }
    
  } catch (error) {
    console.log(error);
  }
}


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    getDogsTemperaments();
  });
});
