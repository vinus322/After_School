// /**
//  * Created by kimmin-young on 2016. 10. 10..
//  */
angular.module('starter.ClassServices', [])
  .service('Class', function ($cordovaSQLite) {

    var School, query;

    var GetAllmyShool = function (user_id, Callback) {
      var shcool=[];


      query = "SELECT DISTINCT sc.school_id, sc.school_name , sc.school_phone_number " +
        "FROM school AS sc, chatt AS ch " +
        "WHERE ch.chatt_host_id="+user_id+" AND ch.school_id=sc.school_id;";


      $cordovaSQLite.execute(db, query).then(function(res) {
        if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            console.log("SELECTED -> " + res.rows.item(i).school_name);
            shcool.push(res.rows.item(i));
          }
          Callback(shcool);
        }
      }, function (err) {
        window.alert(err);
        console.error(err);
      });
    }


    var getClass = function (idx, user_id,school_id, Callback) {
      var Class=[];
      query = "SELECT * FROM chatt WHERE chatt_host_id="+user_id+" AND school_id="+school_id;

      $cordovaSQLite.execute(db, query).then(function(res) {
        console.log("LENGTH :"+res.rows.length );
        if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            console.log("SELECTED -> " + res.rows.item(i));
            Class.push(res.rows.item(i));
          }
          Callback(idx, Class);
        } else {
          console.log("No results found");
        }
      }, function (err) {
        window.alert(err);
        console.error(err);
      });
    }

    var ClassPeople = function(chatt_id, user_id, Callback){
      var People=[];
      query = "SELECT * " +
        "FROM guestList AS gl, users AS us " +
        "WHERE gl.chatt_id='"+chatt_id+"' AND gl.user_id!="+user_id+" AND gl.user_id=us.user_id";

      console.log("QUERY :"+query);

      $cordovaSQLite.execute(db, query).then(function(res) {
        if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            console.log("SELECTED -> " + res.rows.item(i).user_id+res.rows.item(i).user_name);
            People.push(res.rows.item(i));
          }
          Callback(People);
        } else {
          console.log("No results found");
        }
      }, function (err) {
        window.alert(err);
        console.error(err);
      });
    }

    var saveClass = function (data) {
      var query = "INSERT INTO Class (user_id,cl_name,user_name) VALUES (?,?,?)";
      $cordovaSQLite.execute(db, query, [data.user_id,data.cl_name,data.user_name]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
      }, function (err) {
        console.error(err);
      });
    }

    var deleteEvent = function(data){

      for(var i=0; i<Events.length; i++){
        if(Events[i].td_id!=data.td_id) continue;
        Events.splice(i,1); break;
      }
      var query = "DELETE FROM Todo WHERE td_id="+data.td_id+";";
      $cordovaSQLite.execute(db, query).then(function(res) {
        window.alert("삭제되었습니다!");
      }, function (err) {
        console.error(err);
      });
    }

    return {
      saveClass: saveClass,
      getClass: getClass,
      getClassPeople: ClassPeople,
      getSchool: GetAllmyShool
      // get:getEvents,
      // deleteEvent:deleteEvent
    };


  })
//
