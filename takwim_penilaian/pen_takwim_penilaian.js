!function($) {
    let token = window.localStorage.token;
    // $("#leftsidebar").load('../aside/aside_dashboard_super.html');
    $("#leftsidebar").load('../aside/aside_pen_takwim_penilaian.html');
    $("#btnKembali").attr('onclick','kembali2()');
    checkSession();
    saveLog("View Page: Takwim Penilaian", sessionStorage.browser);
    "use strict";

    var CalendarApp = function() {
        this.$body = $("body")
        this.$calendar = $('#calendar'),
        this.$event = ('#calendar-events div.calendar-events'),
        this.$categoryForm = $('#add-new-event form'),
        this.$extEvents = $('#calendar-events'),
        this.$modal = $('#my-event'),
        this.$saveCategoryBtn = $('.save-category'),
        this.$calendarObj = null
    };


    /* on drop */
    CalendarApp.prototype.onDrop = function (eventObj, date) { 
        var $this = this;
            // retrieve the dropped element's stored Event Object
            var originalEventObject = eventObj.data('eventObject');
            var $categoryClass = eventObj.attr('data-class');
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            // assign it the date that was reported
            copiedEventObject.start = date;
            if ($categoryClass)
                copiedEventObject['className'] = [$categoryClass];
            // render the event on the calendar
            $this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                eventObj.remove();
            }
    },
    /* on click on event */
    CalendarApp.prototype.onEventClick =  function (calEvent, jsEvent, view) {
        var $this = this;
        var html = '';
        // html += '<div class="form-group col-lg-6 col-md-12 com-sm-12">'+
        //             '<label class="control-label"><span style="font-weight: bold;">Nama Program:</span></label>'+
        //             '<div class="input-group" style="text-transform: uppercase;">'+calEvent.nama_program+'</div>'+
        //         '</div>'+
        //         '<div class="form-group col-lg-6 col-md-12 com-sm-12">'+
        //             '<label class="control-label"><span style="font-weight: bold;">Tarikh Program:</span></label>'+
        //             '<div class="input-group">'+calEvent.tarikh_program+'</div>'+
        //         '</div>'+
        //         '<div class="form-group col-lg-6 col-md-12 com-sm-12">'+
        //             '<label class="control-label"><span style="font-weight: bold;">Nama Pemohon:</span></label>'+
        //             '<div class="input-group" style="text-transform: capitalize;">'+calEvent.nama_pemohon+'</div>'+
        //         '</div>'+
        //         '<div class="form-group col-lg-6 col-md-12 com-sm-12">'+
        //             '<label class="control-label"><span style="font-weight: bold;">Nama Penyelia (PIC):</span></label>'+
        //             '<div class="input-group" style="text-transform: capitalize;">'+calEvent.nama_pic+'</div>'+
        //         '</div>'+
        //         '<div class="form-group col-lg-6 col-md-12 com-sm-12">'+
        //             '<label class="control-label"><span style="font-weight: bold;">Butiran Kenderaan:</span></label>'+
        //             '<div class="input-group">'+calEvent.nama_fas+'</div>'+
        //         '</div>'+
        //         '<div class="form-group col-lg-6 col-md-12 com-sm-12">'+
        //             '<label class="control-label"><span style="font-weight: bold;">Butiran Pemandu:</span></label>'+
        //             '<div class="input-group">'+calEvent.nama_pemandu+'</div>'+
        //         '</div>'+
        //         '<div class="form-group col-lg-6 col-md-12 com-sm-12">'+
        //             '<label class="control-label"><span style="font-weight: bold;">Pengesahan:</span></label>'+
        //             '<div class="input-group">'+calEvent.linkbtn+'</div>'+
        //         '</div>';
        $this.$modal.modal({
            backdrop: 'static'
        });
        $this.$modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().html(html).end().find('.delete-event').unbind('click').click(function () {
            $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                return (ev._id == calEvent._id);
            });
            $this.$modal.modal('hide');
        });
        $this.$modal.find('form').on('submit', function () {
            calEvent.title = form.find("input[type=text]").val();
            $this.$calendarObj.fullCalendar('updateEvent', calEvent);
            $this.$modal.modal('hide');
            return false;
        });
    },
    CalendarApp.prototype.enableDrag = function() {
        //init events
        $(this.$event).each(function () {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };
            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });
    }
    /* Initializing */
    CalendarApp.prototype.init = function() {
        this.enableDrag();
        var $thiss = this;
        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var today = new Date($.now());
        var defaultEvents = [];

        loadSesiAll(function(){
            $.each(objSesi.data,function(i, item){
                var penilaian_month;
                var monthlyEvent = "";
                var mula = "";
                var tamat = "";
                if (item.tarikh_mula != null){
                    penilaian_month = item.tarikh_mula.split("-");
                    if (penilaian_month[1] == m+1){
                        monthlyEvent = `<div class="body mb-3 l-blue">
                                            <div class="event-name b-lightred row">
                                                <div class="col-4 text-center">
                                                    <h4>`+ penilaian_month[2] +`<span> `+ toMonthName(penilaian_month[1]) +` </span><span>`+ penilaian_month[0] +`</span></h4>
                                                </div>
                                                <div class="col-8">
                                                    <h6>`+ item.kod +`/`+ item.tahun +`</h6>
                                                    <hr>
                                                    <span style="font-weight: bold; font-size: 18px; color: #6572b8;">`+ item.nama_penilaian +`</span><br>
                                                    <span class="badge badge-info bg-blue">`+ item.nama +`</span>
                                                </div>
                                            </div>
                                        </div>`;
                        $("#monthlyEvent").append(monthlyEvent);                        
                    }                    
                    mula = new Date(item.tarikh_mula + " " + item.masa_mula);
                    tamat = new Date(item.tarikh_tamat + " " + item.masa_tamat);
                    let className = 'bg-info';
                    // let nama_fas = '';
                    // let nama_pemandu = '';
                    
                    defaultEvents.push({
                        title: item.nama_penilaian + " - " + item.kod + "/" + item.tahun,
                        nama_penilaian: item.nama_penilaian + "("+item.kod+"/"+item.tahun+")",
                        tarikh_penilaian: formatDate(item.tarikh_mula) + " - " + formatDate(item.tarikh_tamat),
                        // linkbtn: linkbtn,
                        start: mula,
                        end: tamat,
                        className: className
                    });
                }
            });
            var $this = $thiss;
            $this.$calendarObj = $this.$calendar.fullCalendar({
                slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
                minTime: '08:00:00',
                maxTime: '18:00:00',  
                defaultView: 'month',  
                handleWindowResize: true,
                
                header: {
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                events: defaultEvents,
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar !!!
                eventLimit: true, // allow "more" link when too many events
                selectable: true,
                drop: function(date) { $this.onDrop($(this), date); },
                select: function (start, end, allDay) { $this.onSelect(start, end, allDay); },
                eventClick: function(calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view); }

            });
        });       
    },

   //init CalendarApp
    $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp
    
}(window.jQuery),

//initializing CalendarApp
function($) {
    "use strict";
    $.CalendarApp.init()
}(window.jQuery);

function kembali2(){
    window.sessionStorage.removeItem("child");
    window.location.reload();
}