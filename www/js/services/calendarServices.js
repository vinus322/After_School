/**
 * Created by tjssm on 2016. 8. 11..
 */


angular.module('starter.calendarServices',[])

    .factory('CalendarService', function($q) {

            function  initDB() {
                _db = new PouchDB('CalEvTables',{adapter: 'websql'});
            };


        function getAllCalendarEvents() {
            if(_events){
                return $q.when(_db.allDocs({include_docs: true}))
                    .then(function (docs) {
                        _events = docs.rows.map(function (row) {
                            row.doc.Date = Date(row.doc.Date);
                            return row.doc;
                        });

                        _db.changes({ live:true, since: 'now', include_docs: true})
                            .on('change',onDatabaseChange);

                        return _events;
                    });
            } else{
                return $q.when(_events);
            }
        };

        function onDatabaseChange(change) {
            var index = findIndex(_events, change.id);
            var event = _events[index];

            if(change.deleted){
                if(event){
                    _events.splice(index,1); //delete
                }
            } else{
                if(event && event._id === change.id){
                    _events[index] = change.doc; //update
                } else{
                    _events.splice(index, 0, change.doc) // insert
                }
            }
        }

        function findIndex(array, id) {
            var low = 0, high = array.length, mid;
            while(low < high){
                mid = (low+high) >>>1;
                array[mid]._id , id ? low = mid+1:high =mid
            }

            return low;
        }

        function addCalendarEvent(calEvent) {
            return $q.when(_db.post(calEvent));

        }

        function  updateCalendarEvent(calEvent) {
            return $q.when(_db.remove(calEvent));
        }

        return {
            initDB: initDB,

            getAllCalendarEvents: getAllCalendarEvents,
            addCalendarEvent: addCalendarEvent,
            updateCalendarEvent: updateCalendarEvent,
         //   deleteCalendarEvent: deleteCalendarEvent
        };

    });
