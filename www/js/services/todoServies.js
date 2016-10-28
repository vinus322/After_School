/**
 * Created by tjssm on 2016. 8. 7..
 */


angular.module('starter.todoServies',[])

  .factory('TodoDBA', function($q, $cordovaSQLite) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var Events=[];

    var getEvents = function() {
         var deferred = $q.defer();
         deferred.resolve(fakeEvents);
         return deferred.promise;
    }

    var getAllEvents = function () {
      Events=[];
      var query = "SELECT * FROM todo WHERE user_id='1' order by start asc;";
      $cordovaSQLite.execute(db, query).then(function(res) {
        if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            console.log("SELECTED -> " + res.rows.item(i).title);
            Events.push(res.rows.item(i));
            Events[i].start = new Date(Events[i].start).toISOString().slice(0,10);
            Events[i].end = new Date(Events[i].end).toISOString().slice(0,10);
          }
        } else {
          console.log("No results found");
        }
      }, function (err) {
        window.alert(err);
        console.error(err);
      });
      return Events;
    }

    var saveEvents = function (data) {
      var query = "INSERT INTO todo (user_id,title,start,end,content, alert) VALUES (?,?,?,?,?,?)";
      $cordovaSQLite.execute(db, query, ['1',data.title,data.start,data.end,data.content, false]).then(function(res) {
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
      var query = "DELETE FROM todo WHERE td_id="+data.td_id+";";
      $cordovaSQLite.execute(db, query).then(function(res) {
        window.alert("삭제되었습니다!");
      }, function (err) {
        console.error(err);
      });
    }

    return {
      saveEvents: saveEvents,
      getAllEvents: getAllEvents,
      get:getEvents,
      deleteEvent:deleteEvent
    };

  });
