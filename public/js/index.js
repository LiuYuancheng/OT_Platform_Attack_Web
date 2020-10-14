(function () {


    var app = angular.module("page", ['ngMaterial', 'md.data.table'])
        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('blue');
        });;


    app.controller('MainController', ['$scope', '$http', '$interval', '$timeout', function ($scope, $http, $interval, $timeout) {
        var main = this;

        // main.example = 'unknown';

        main.mitmActive = false;
        main.mitmShowLogs = false;
        main.mitmLogs = [];
        main.currentLog = "none";

        main.stopM221Active = false;
        main.stopM221ShowLogs = false;
        main.stopM221Logs = [];

        main.downloadProgramActive = false;
        main.downloadProgramShowLogs = false;
        main.downloadProgramLogs = [];

        main.state = {
            mitm: "none",
            m221: "none",
            download_program: "none",
            download_program2: "none",
            falseInj: "none",
            blackOut: "none",
        }

        main.illuminateState = {
            mitm: "off",
            m221: "off",
            download_program: "off"
        }

        main.syslogs = {
            mitm: [],
            m221: [],
            download_program: []
        }

        main.attackType = false;

        // socket io

        var socket = io('/')
        socket.on('hello', (data) => {

            console.log(data);
        })

        socket.on('addSyslog', (data) => {
            if (main.syslogs[data.agent]) {
                main.syslogs[data.agent].push(data)
            }
            $scope.$apply();
        })

        //
	
	socket.on('playSound', (data) => {
		if (data.soundNum) {
			main.playAudio(data.soundNum);
			$scope.$apply();
		}
	})

	main.playAudio = function(num) {

		if (attackSounds[num]) {
			attackSounds[num].play();
		}
	}
	
	var attackAudioSrc = {

		1: "sounds/1.mp3",
		2: "sounds/2.mp3",
		3: "sounds/3.mp3",
		4: "sounds/4.mp3",
		5: "sounds/5.mp3",
		6: "sounds/6.mp3",
		7: "sounds/7.mp3",
		8: "sounds/8.mp3"


	}

	var attackSounds = {


		1: new Audio(attackAudioSrc[1]),
		2: new Audio(attackAudioSrc[2]),
		3: new Audio(attackAudioSrc[3]),
		4: new Audio(attackAudioSrc[4]),
		5: new Audio(attackAudioSrc[5]),
		6: new Audio(attackAudioSrc[6]),
		7: new Audio(attackAudioSrc[7]),
		8: new Audio(attackAudioSrc[8])


	}

        main.getLogs = function () {
            $http.get("/getLogs").success(function (data) {
                main.syslogs = data;
            });
        };

        main.getLogs();

        // get state functions

        main.getMitmState = function () {
            $http.get("/actions/mitm/getAttackState").success(function (data) {
                main.state.mitm = data;
            });
        };

        main.getM221State = function () {
            $http.get("/actions/m221/getAttackState").success(function (data) {
                main.state.m221 = data;
            });
        };

        main.getDownloadProgramState = function () {
            $http.get("/actions/download_program/getAttackState").success(function (data) {
                main.state.download_program = data;
            });
        };

        main.getDownloadProgramState2 = function () {
            $http.get("/actions/download_program/getAttackState2").success(function (data) {
                main.state.download_program2 = data;
            });
        };


        main.getStates = function () {
            main.getMitmState();
            main.getM221State();
            main.getDownloadProgramState();
            main.getDownloadProgramState2();
        }

        main.getStates();

        //


        // get illuminate state functions

        main.getMitmIlluminateState = function () {
            $http.get("/actions/mitm/getIlluminateState").success(function (data) {
                main.illuminateState.mitm = data;
            });
        };

        main.getM221IlluminateState = function () {
            $http.get("/actions/m221/getIlluminateState").success(function (data) {
                main.illuminateState.m221 = data;
            });
        };

        main.getDownloadProgramIlluminateState = function () {
            $http.get("/actions/download_program/getIlluminateState").success(function (data) {
                main.illuminateState.download_program = data;
            });
        };


        main.getIlluminateStates = function () {
            main.getMitmIlluminateState();
            main.getM221IlluminateState();
            main.getDownloadProgramIlluminateState();
        }

        main.getIlluminateStates();

        //


        // illuminate on / off


        main.illuminateMitm = function (isOn) {
            var action = isOn ? "illuminateOn" : "illuminateOff"
            
            $http.get("/actions/mitm/" + action ).success(function (data) {
                
            });
        }

        main.illuminateM221 = function (isOn) {
            var action = isOn ? "illuminateOn" : "illuminateOff"
            
            $http.get("/actions/m221/" + action ).success(function (data) {
                
            });
        }

        main.illuminateDownloadProgram = function (isOn) {
            var action = isOn ? "illuminateOn" : "illuminateOff"
            
            $http.get("/actions/download_program/" + action ).success(function (data) {
                
            });
        }



        // mitm

        main.startMitm = function () {
            $http.get("/actions/mitm/startAttack").success(function (data) {
                console.log(data);
            });
            main.state.mitm = 'progress';
        };

        main.stopMitm = function () {
            $http.get("/actions/mitm/stopAttack").success(function (data) {
                console.log(data);
            });
            main.state.mitm = 'progress';
        };


        // M221


        main.startM221 = function () {
            $http.get("/actions/m221/startAttack").success(function (data) {
                console.log(data);
            });
            main.state.m221 = 'progress';
        };

        main.stopM221 = function () {
            $http.get("/actions/m221/stopAttack").success(function (data) {
                console.log(data);
            });
            main.state.m221 = 'progress';
        };


        // DownloadProgram


        main.startDownloadProgram = function () {
            $http.get("/actions/download_program/startAttack").success(function (data) {
                console.log(data);
            });
            main.state.download_program = 'progress';
        };

        main.startDownloadProgram2 = function () {
            $http.get("/actions/download_program/startAttack2").success(function (data) {
                console.log(data);
            });
            main.state.download_program = 'progress';
        };

        main.stopDownloadProgram = function () {
            $http.get("/actions/download_program/stopAttack").success(function (data) {
                console.log(data);
            });
            main.state.download_program2 = 'progress';
        };

        main.stopDownloadProgram2 = function () {
            $http.get("/actions/download_program/stopAttack2").success(function (data) {
                console.log(data);
            });
            main.state.download_program2 = 'progress';
        };

        // false data injection attack:
        main.startFalseInjAttack = function () {
            if (main.state.falseInj == 'none' || main.state.falseInj == 'idle') {
                $http.get("/actions/falseInj_Attack/startAttack").success(function (data) {
                    console.log(data);
                });
                main.state.falseInj = 'on';
            }
        };

        main.stopFalseInjAttack = function () {
            if (main.state.falseInj == 'on') {
                $http.get("/actions/falseInj_Attack/stopAttack").success(function (data) {
                    console.log(data);
                });
                main.state.falseInj = 'idle';
            }
        };

        // Black out attack:
        main.startBlackOutAttack = function () {
            if (main.state.blackOut == 'none' || main.state.blackOut == 'idle') {
                $http.get("/actions/blackOut_Attack/startAttack").success(function (data) {
                    console.log(data);
                });
                main.state.blackOut = 'on';
            }
        };

        main.stopBlackOutAttack = function () {
            if (main.state.blackOut == 'on') {
                $http.get("/actions/blackOut_Attack/stopAttack").success(function (data) {
                    console.log(data);
                });
                main.state.blackOut = 'idle';
            }
        };

        $interval(function () {
            main.getStates();
            main.getIlluminateStates();
        }, 5000);

    }]);

})();
