(function($) {
    $.create_widget({
        // default options
        options: {
            version: 0.1,
            creator: 'Domogik',
            id: 'dmg_4x2_communicationCallerId',
            name: 'Caller Id',
            description: 'Specific widget for Caller Id',
            type: 'sensor.string',
            height: 2,
            width: 4,
            filters:['communication.caller_id.number'],
            displayname: true,
			displayborder: true
        },

        _init: function() {
            var self = this, o = this.options;
            this.element.addClass("icon32-usage-" + o.usage)
            this._newbg =  $("<div class='newbg size4x2'></div>");
            this._new =  $("<div class='new'></div>");
            this._newbg.append(this._new);
            this.element.append(this._newbg);
            this._newbg.hide();
            this._list =  $("<ul></ul>");
            this.element.append(this._list);

            this._initValues(10);
        },

        _statsHandler: function(stats) {
            var self = this, o = this.options;
            this.values = [];
            if (stats && stats.length > 0) {
                this.previous = null;
                $.each(stats, function(index, stat){
                    self.addCall(stat);
                });
                this.displayList();
            }
        },
        
        addCall: function(stat) {
            if (stat.value != this.previous) {
                stat.number = 1;
                this.values.unshift(stat);
                this.previous = stat.value;
            } else {
                this.values[0].number++;
                this.values[0].timestamp = stat.timestamp;                
            }
        },
        
        _eventHandler: function(timestamp, value) {
            var self = this, o = this.options;
            this._new.text(value);
            this.addCall({timestamp:timestamp, value:value});
            this._newbg.show();
            $.doTimeout('callerIdReceiveing', 30000, function() {
                self.displayList();
                self._newbg.hide();
            });
        },

        displayList: function() {
            var self = this, o = this.options;
            this.values.sort(sortDate);
            if (this.values) {
                this._list.empty();
                $.each(this.values, function(index, stat){
                    var date = new Date(stat.timestamp * 1000);
                    date = date.format('H:i j/m');
                    if (stat.number > 1) {
                        self._list.append("<li>" + stat.value + " <span class='date'>" + date + "</span> (" + stat.number + ")</li>");                        
                    } else {
                        self._list.append("<li>" + stat.value + " <span class='date'>" + date + "</span></li>");
                    }
                });
            } else { // Unknown
            }
        }
    });
})(jQuery);

function sortDate(a, b) {
    return b.timestamp - a.timestamp;
}

// Simulates PHP's date function
Date.prototype.format=function(format){var returnStr='';var replace=Date.replaceChars;for(var i=0;i<format.length;i++){var curChar=format.charAt(i);if(i-1>=0&&format.charAt(i-1)=="\\"){returnStr+=curChar;}else if(replace[curChar]){returnStr+=replace[curChar].call(this);}else if(curChar!="\\"){returnStr+=curChar;}}return returnStr;};Date.replaceChars={shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],longMonths:['January','February','March','April','May','June','July','August','September','October','November','December'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],longDays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d:function(){return(this.getDate()<10?'0':'')+this.getDate();},D:function(){return Date.replaceChars.shortDays[this.getDay()];},j:function(){return this.getDate();},l:function(){return Date.replaceChars.longDays[this.getDay()];},N:function(){return this.getDay()+1;},S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},w:function(){return this.getDay();},z:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((this-d)/86400000);},W:function(){var d=new Date(this.getFullYear(),0,1);return Math.ceil((((this-d)/86400000)+d.getDay()+1)/7);},F:function(){return Date.replaceChars.longMonths[this.getMonth()];},m:function(){return(this.getMonth()<9?'0':'')+(this.getMonth()+1);},M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},n:function(){return this.getMonth()+1;},t:function(){var d=new Date();return new Date(d.getFullYear(),d.getMonth(),0).getDate()},L:function(){var year=this.getFullYear();return(year%400==0||(year%100!=0&&year%4==0));},o:function(){var d=new Date(this.valueOf());d.setDate(d.getDate()-((this.getDay()+6)%7)+3);return d.getFullYear();},Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},a:function(){return this.getHours()<12?'am':'pm';},A:function(){return this.getHours()<12?'AM':'PM';},B:function(){return Math.floor((((this.getUTCHours()+1)%24)+this.getUTCMinutes()/60+this.getUTCSeconds()/3600)*1000/24);},g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},H:function(){return(this.getHours()<10?'0':'')+this.getHours();},i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},u:function(){var m=this.getMilliseconds();return(m<10?'00':(m<100?'0':''))+m;},e:function(){return"Not Yet Supported";},I:function(){return"Not Yet Supported";},O:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+'00';},P:function(){return(-this.getTimezoneOffset()<0?'-':'+')+(Math.abs(this.getTimezoneOffset()/60)<10?'0':'')+(Math.abs(this.getTimezoneOffset()/60))+':00';},T:function(){var m=this.getMonth();this.setMonth(0);var result=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,'$1');this.setMonth(m);return result;},Z:function(){return-this.getTimezoneOffset()*60;},c:function(){return this.format("Y-m-d\\TH:i:sP");},r:function(){return this.toString();},U:function(){return this.getTime()/1000;}};