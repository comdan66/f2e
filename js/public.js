/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){function e(){var e=a(this),o=n.settings,s=t(this).data("tag");return isNaN(e.datetime)||(0==o.cutoff||r(e.datetime)<o.cutoff)&&(""==s||void 0===s?t(this).text(i(e.datetime)):t(this).data(s,i(e.datetime))),this}function a(e){if(e=t(e),!e.data("timeago")){e.data("timeago",{datetime:n.datetime(e)});var a=t.trim(e.text());n.settings.localeTitle?e.attr("title",e.data("timeago").datetime.toLocaleString()):!(a.length>0)||n.isTime(e)&&e.attr("title")||e.attr("title",a)}return e.data("timeago")}function i(t){return n.inWords(r(t))}function r(t){return(new Date).getTime()-t.getTime()}t.timeago=function(e){return i(e instanceof Date?e:"string"==typeof e?t.timeago.parse(e):"number"==typeof e?new Date(e):t.timeago.datetime(e))};var n=t.timeago;t.extend(t.timeago,{settings:{refreshMillis:6e4,allowFuture:!1,localeTitle:!1,cutoff:0,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",wordSeparator:" ",numbers:[]}},inWords:function(e){function a(a,r){var n=t.isFunction(a)?a(r,e):a,o=i.numbers&&i.numbers[r]||r;return n.replace(/%d/i,o)}var i=this.settings.strings,r=i.prefixAgo,n=i.suffixAgo;this.settings.allowFuture&&0>e&&(r=i.prefixFromNow,n=i.suffixFromNow);var o=Math.abs(e)/1e3,s=o/60,u=s/60,m=u/24,d=m/365,l=45>o&&a(i.seconds,Math.round(o))||90>o&&a(i.minute,1)||45>s&&a(i.minutes,Math.round(s))||90>s&&a(i.hour,1)||24>u&&a(i.hours,Math.round(u))||42>u&&a(i.day,1)||30>m&&a(i.days,Math.round(m))||45>m&&a(i.month,1)||365>m&&a(i.months,Math.round(m/30))||1.5>d&&a(i.year,1)||a(i.years,Math.round(d)),f=i.wordSeparator||"";return void 0===i.wordSeparator&&(f=" "),t.trim([r,l,n].join(f))},parse:function(e){var a=t.trim(e);return a=a.replace(/\.\d+/,""),a=a.replace(/-/,"/").replace(/-/,"/"),a=a.replace(/T/," ").replace(/Z/," UTC"),a=a.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),a=a.replace(/([\+\-]\d\d)$/," $100"),new Date(a)},datetime:function(e){var a=n.isTime(e)?t(e).attr("datetime"):t(e).data("time");return n.parse(a)},isTime:function(e){return"time"===t(e).get(0).tagName.toLowerCase()}});var o={init:function(){var a=t.proxy(e,this);a();var i=n.settings;i.refreshMillis>0&&(this._timeagoInterval=setInterval(a,i.refreshMillis))},update:function(a){var i=n.parse(a);t(this).data("timeago",{datetime:i}),n.settings.localeTitle&&t(this).attr("title",i.toLocaleString()),e.apply(this)},updateFromDOM:function(){t(this).data("timeago",{datetime:n.parse(n.isTime(this)?t(this).attr("datetime"):t(this).attr("title"))}),e.apply(this)},dispose:function(){this._timeagoInterval&&(window.clearInterval(this._timeagoInterval),this._timeagoInterval=null)}};t.fn.timeago=function(t,e){var a=t?o[t]:o.init;if(!a)throw new Error("Unknown function name '"+t+"' for timeago");return this.each(function(){a.call(this,e)}),this},document.createElement("abbr"),document.createElement("time")});
jQuery.timeago.settings.strings={prefixAgo:null,prefixFromNow:"從現在開始",suffixAgo:"之前",suffixFromNow:null,seconds:"不到 1 分鐘",minute:"約 1 分鐘",minutes:"%d 分鐘",hour:"約 1 小時",hours:"%d 小時",day:"約 1 天",days:"%d 天",month:"約 1 個月",months:"%d 個月",year:"約 1 年",years:"%d 年",numbers:[],wordSeparator:""};

$(function () {
  var ids = [];
  var id =1568156389864364;
  var token = 'EAACEdEose0cBANhT1LhONKCm7foVU3rBUrdhowXwzawT6WH8fqFWRqtZC7OFqlz7feuPcZB9sY0xxvznmLcWv8WckvzDeTDv09oHp1WoOoOr4rvuTqyqBjW4bYEm70b2WoJWhKcCu1ZApcfuTsuvNZAVadcTQrFkDTjnwG7FmGNZAzVfVMgZCuj74PhEhx0tYZD';
  var isLoading = false;
  var count = 0;

  var $count = $('#count');
  var $comments = $('#comments');

  var $like = $('#likes .like span');
  var $love = $('#likes .love span');
  var $wow = $('#likes .wow span');
  var $haha = $('#likes .haha span');
  var $sad = $('#likes .sad span');
  var $angry = $('#likes .angry span');

  function update () {
    if (isLoading) return;
    isLoading = true;

    $.get ('https://graph.facebook.com/v2.8/?ids=' + id + '&fields=comments,reactions.type(LIKE).limit(0).summary(total_count).as(LIKE),reactions.type(LOVE).limit(0).summary(total_count).as(LOVE),reactions.type(WOW).limit(0).summary(total_count).as(WOW),reactions.type(HAHA).limit(0).summary(total_count).as(HAHA),reactions.type(SAD).limit(0).summary(total_count).as(SAD),reactions.type(ANGRY).limit(0).summary(total_count).as(ANGRY),reactions.limit(0).summary(total_count).as(totalCount)&access_token=' + token, function (result) {
      
      if (typeof result[id].comments != 'undefined') {
        var $comment = result[id].comments.data.map (function (t) {
          if ($.inArray (t.id, ids) !== -1) return null;
          ids.push (t.id);
          if (t.message.length <= 0) return null;
          
          return $('<div />').append ($('<div />').append (
            $('<img />').attr ('src', 'https://graph.facebook.com/' + t.from.id + '/picture?width=100&height=100')).append (
            $('<a />').attr ('href', 'https://www.facebook.com/' + t.from.id + '').attr ('target', '_black').text (t.from.name)).append (
            $('<p .>').text (t.message))).append ($('<time />').text ($.timeago (t.created_time)));
        }).filter (function (t) {
          return t !== null;
        }).reverse ();

        $comments.prepend ($comment);
      }

      $angry.text (result[id].ANGRY.summary.total_count);
      $haha.text (result[id].HAHA.summary.total_count);
      $like.text (result[id].LIKE.summary.total_count);
      $love.text (result[id].LOVE.summary.total_count);
      $sad.text (result[id].SAD.summary.total_count);
      $wow.text (result[id].WOW.summary.total_count);
      $count.text (++count);
      
      isLoading = false;
    });
  }
  setInterval (update, 5 * 1000);
  update ();
});