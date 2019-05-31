(function (global, $) {
    global.RP = (domId) => {
        return new RangePlayer(domId)
    }


    function RangePlayer(domId) {
        $("#" + domId).wrap(`<div id="video-box">
            <div class="ctrl-box">
                <div class="controler">
                    <i class="fas fa-play-circle" id="playVid"></i>
                    <div class="dragger-case">
                        <div id="vid-range"><div id="v-range"></div></div>
                        
                    </div>
                    <div>
                        <i class="fas fa-volume-up" id="ctrl-sound"></i>
                        <div id="vid-volume" style="display:none;"></div>
                    </div>
                </div>
            </div>
        </div>
        
			
        `)
        $("#" + domId).addClass("video-dom");
        vid = document.getElementById(domId);

        vid.controls = false;
        vid.volume = .4;
        let vidProp ={}
        vid.ontimeupdate = function () {
           // if (vidProp.start !== 0) {
                if (vidPos() >= vidProp.end) {
                    vid.pause();
                    vid.currentTime = vidProp.end;
                    $('#playVid').removeClass('fa-pause-circle');
                    $('#playVid').addClass('fa-play-circle');
                    vidProp.mode = 'off';
                    
                    $('#v-range').slider("value", vidProp.start);
                  /*  $('#playVid').addClass('fa-play-circle');
                    $('#playVid').removeClass('fa-pause-circle');
                    */
                }
                $('#v-range').slider("value",vid.currentTime)
               /*  if (vidPos() <= vidProp.start) {
                    vid.currentTime = vidProp.start;
                   $('#playVid').removeClass('fa-play-circle');
                    $('#playVid').addClass('fa-pause-circle');
                    
                }*/
           // }
        };

        function vidPos() {
            return vid.currentTime;
        }

        $('#ctrl-sound').click(() => {
            $('#vid-volume').toggle()
        })
       
        $('#playVid').click(() => {
            if (vidProp.mode === 'off') {
                vidProp.mode = 'on';
                $('#v-range').slider("value", vidProp.start);
                vid.currentTime = vidProp.start
                vid.play()
                $('#playVid').toggleClass('fa-play-circle fa-pause-circle');
             } else if (vidProp.mode === 'on') {
                vid.pause();
                vidProp.mode = 'pause'
                $('#playVid').toggleClass('fa-play-circle fa-pause-circle');
            }else if (vidProp.mode === 'pause') {
                vid.play();
                vidProp.mode = 'on'
                $('#playVid').toggleClass('fa-play-circle fa-pause-circle');
            }
        });
        vid.onloadeddata = function () {
            $("#" + domId).show()
            vidProp = {
                start: 0.01,
                end: vid.duration,
                mode: 'off'
            };

        
    
            $('#vid-range').slider({
                orientation: 'horizontal',
                range: true,
                min: 0,
                max: vid.duration,
                step: 0.01,
                values: [0, vid.duration],
                slide: function (event, ui) {
                    console.log('Start From : ' + ui.values[0] + ' To : ' + ui.values[1]);
	$("#vid-start-val").val(ui.values[0])
	$("#vid-end-val").val(ui.values[1])

                    vidProp.start = ui.values[0];
                    vidProp.end = ui.values[1];
                },
                change: function (event, ui) {
                    vid.pause();
                    vid.currentTime = ui.value;
                    $('#playVid').removeClass('fa-pause-circle');
                    $('#playVid').addClass('fa-play-circle');
                    vidProp.mode = 'off'
                    $('#v-range').slider("option",{
                        max:vidProp.end,
                        min:vidProp.start,
                    })
                    /* if (ui.handleIndex === 0) {
                         vid.play();
                     }
                     */
                },
            });


            $('#v-range').slider({
                orientation: 'horizontal',
                value:vidProp.start,
                max:vidProp.end,
                min:vidProp.start,
                step: 0.01,
                slide: function (event, ui) {
                    vidProp.mode = 'pause';
                    vid.currentTime = ui.value;
                }
            })
            $('#v-range').appendTo($('#vid-range .ui-slider-range.ui-corner-all.ui-widget-header'))
            $('#vid-volume').slider({
                orientation: 'vertical',
                min: 0,
                max: 1,
                step: 0.01,
                value: .4,
                slide: function (event, ui) {
                    vid.volume = ui.value;
                },
                change: function (event, ui) {

                },
            });

           
        };

    }




}(window, $))