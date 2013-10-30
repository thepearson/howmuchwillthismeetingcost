$(function() {

  //var people = 20;
  //var hourly = 130.0;
  var start_time = null;
  var delta_time = 0;
  var interval = 0.1
  var rate_per_second = null;
  var current_value = 0.0;
  var timer = null;

  function microtime() {
    return new Date().getTime()/1000;
  }

  function getPeople() {
    return parseFloat($('#peoplecount').val());
  }

  function getRate() {
    return parseFloat($('#hourlyrate').val());
  }

  function format_time(time_seconds) {
    if (time_seconds > (60*60)) { // Hours
      return ((time_seconds/60)/60).toFixed(2) + ' hours';
    } else if (time_seconds > 60) { // minutes
      return (time_seconds/60).toFixed(2) + ' minutes';
    } else { // Seconds
      return time_seconds.toFixed(2) + ' seconds';
    }
  }

  function update_ui() {
    var people = getPeople();
    var hourly = getRate();
    $(".dollars .value").text('$'+current_value.toFixed(2));
    $(".rate_per_minute .value").text(((hourly*people)/60).toFixed(2))
    $(".total_time .value").text(format_time(delta_time*people));
    $('.params .people').text(people);
    $('.params .hourly').text(hourly);
  }

  function run() {
    var people = getPeople();
    var hourly = getRate();

    var current = microtime(true);

    if (start_time === null) {
      start_time = current;
    }

    rate_per_second = ((people*hourly)/60)/60;
    var value_to_add = rate_per_second*interval;
    current_value += value_to_add;
    delta_time = current - start_time;
    update_ui();
  }

  $('button.start').click(function() {
    timer = window.setInterval(run, 1000*interval);
    $(".collapse").collapse()
  });

  $('button.stop').click(function() {
    window.clearInterval(timer);
  });

  function reset() {
    var current = microtime(true);
    start_time = current;
    current_value = 0;
    delta_time = 0;
    update_ui();
  }

  $('button.reset').click(function() {
    reset();
  });

  $('#peoplecount').change(function() {
    reset();
  });

  $('#hourlyrate').change(function() {
    reset();
  });

});
