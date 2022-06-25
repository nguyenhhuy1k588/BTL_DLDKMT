const { ref, onValue, set, get } = require("firebase/database");
const db = require("./db");

const dbRef = ref(db);
var val = {};

onValue(dbRef, (snapshot) => {
  const data = snapshot.val();
  val = data;
});

const getAll = async (req, res, next) => {
  return res.status(200).json(val);
};

const setLed = async (req, res, next) => {
  const status = req.body.status;
  let curState = {};
  await get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        curState = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  await set(dbRef, {
    ...curState,
    Light: status,
  })
    .then(() => {
      return res.status(200).send("Change the light status successfully!");
    })
    .catch((err) => {
      return res.status(401).send(err);
    });
};

module.exports = {
  getAll,
  setLed,
  val,
};
