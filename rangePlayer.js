(function (global, $) {
    global.RP = (domId) => {
        return new RangePlayer(domId)
    }


    function RangePlayer(domId) {
        $("#" + domId).wrap(`<div id="video-box">
            <div class="ctrl-box">
                <div class="controler">
                    <i class="fas fa-play-circle" id="playVid"></i>
                    <div id="vid-range" style="width:250px;"></div>
                    <div id="vid-volume" style="height:250px; width:10px;"></div>
                </div>
            </div>
        </div>`)
        $("#" + domId).addClass("video-dom");
        vid = document.getElementById(domId);

        vid.controls = false;
        vid.volume = .1;
        let vidProp = {
            start: 'unset',
            end: 'unset',
        };

        vid.ontimeupdate = function () {
            if (vidProp.start !== 'unset') {
                if (vidPos() >= vidProp.end) {
                    vid.pause();
                    vid.currentTime = vidProp.end;
                    $('#playVid').addClass('fa-play-circle');
                    $('#playVid').removeClass('fa-pause-circle');
                }
                if (vidPos() <= vidProp.start) {
                    vid.currentTime = vidProp.start;
                    $('#playVid').removeClass('fa-play-circle');
                    $('#playVid').addClass('fa-pause-circle');
                }
            }
        };

        function vidPos() {
            return vid.currentTime;
        }

        $('#startVid').click(() => {
            vidProp.start = vidPos();
        });

        $('#stopVid').click(() => {
            vidProp.end = vidPos();
        });
        $('#playVid').click(() => {
            vid.currentTime = vidProp.start;
            vid.play();
        });
        vid.onloadeddata = function () {
            $('#vid-range').slider({
                orientation: 'horizontal',
                range: true,
                min: 0,
                max: vid.duration,
                step: 0.1,
                values: [0, vid.duration],
                slide: function (event, ui) {
                    $('#amount').val('Start From : ' + ui.values[0] + ' To : ' + ui.values[1]);
                    vidProp.start = ui.values[0];
                    vidProp.end = ui.values[1];
                },
                change: function (event, ui) {
                    vid.pause();
                    vid.currentTime = ui.value;
                   /* if (ui.handleIndex === 0) {
                        vid.play();
                    }
                    */
                },
            });

            $('#vid-volume').slider({
                orientation: 'vertical',
                min: 0,
                max: 1,
                step: 0.01,
                value: .1,
                slide: function (event, ui) {
                    vid.volume = ui.value;
                },
                change: function (event, ui) {

                },
            });

            $('#amount').val(
                'Start From : ' +
                $('#slider-range').slider('values', 0) +
                ' To : ' +
                $('#slider-range').slider('values', 1)
            );
        };

    }




}(window, $))