var oracledb = require('oracledb');

var run=function(username,cb) {
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
      connection.execute(
        `SELECT username, password
         FROM admin
         WHERE username = :username`,
        [username],  // bind value for :id
        {outFormat: oracledb.OBJECT},
        function(err, result) {
          if (err) {
            console.error(err.message);
            doRelease(connection);
            cb() ;
          }
          admin=result.rows[0];
          doRelease(connection);
          cb(admin);
        });
    });

  function doRelease(connection) {
    connection.close(
      function(err) {
        if (err)
          console.error(err.message);
      });
  }

}
module.exports=run;
