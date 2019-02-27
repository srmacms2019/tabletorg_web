var oracledb = require('oracledb');

var connect=function(cb) {
  oracledb.getConnection(
    {
      user          : "nithika",
      password      : "nithikadb",
      connectString : "localhost:1521/XE"
    },
    function(err, connection) {
      if (err) {
        console.error(err.message);
        cb();
      }
      cb(connection);
    });
  };
module.exports=connect;
