
/*
Utility methods
*/
mejs.Utility = {
	encodeUrl: function(url) {
		return encodeURIComponent(url); //.replace(/\?/gi,'%3F').replace(/=/gi,'%3D').replace(/&/gi,'%26');
	},
	escapeHTML: function(s) {
		return s.toString().split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');
	},
	absolutizeUrl: function(url) {
		var el = document.createElement('div');
		el.innerHTML = '<a href="' + this.escapeHTML(url) + '">x</a>';
		return el.firstChild.href;
	},
	getScriptPath: function(scriptNames) {
		var
			i = 0,
			j,
			path = '',
			name = '',
			script,
			scripts = document.getElementsByTagName('script');

		for (; i < scripts.length; i++) {
			script = scripts[i].src;
			for (j = 0; j < scriptNames.length; j++) {
				name = scriptNames[j];
				if (script.indexOf(name) > -1) {
					path = script.substring(0, script.indexOf(name));
					break;
				}
			}
			if (path !== '') {
				break;
			}
		}
		return path;
	},
	secondsToTimeCode: function(time, forceHours, showFrameCount, fps) {
        //add framecount
        if (typeof showFrameCount == 'undefined') {
            showFrameCount=false;
        } else if(typeof fps == 'undefined') {
            fps = 25;
        }

        var hours = Math.floor(time / 3600) % 24,
        	minutes = Math.floor(time / 60) % 60,
        	seconds = Math.floor(time % 60),
        	frames = Math.floor(((time % 1)*fps).toFixed(3)),
        	result = 
        			( (forceHours || hours > 0) ? (hours < 10 ? '0' + hours : hours) + ':' : '')
					+ (minutes < 10 ? '0' + minutes : minutes) + ':'
					+ (seconds < 10 ? '0' + seconds : seconds)
					+ ((showFrameCount) ? ':' + (frames < 10 ? '0' + frames : frames) : '');

        return result;
	},
	
	timeCodeToSeconds: function(hh_mm_ss_ff, forceHours, showFrameCount, fps){
        if (typeof showFrameCount == 'undefined') {
            showFrameCount=false;
        } else if(typeof fps == 'undefined') {
            fps = 25;
        }

        var tc_array = hh_mm_ss_ff.split(":"),
        	tc_hh = parseInt(tc_array[0]),
        	tc_mm = parseInt(tc_array[1]),
        	tc_ss = parseInt(tc_array[2]),
        	tc_ff = 0,
        	tc_in_seconds = 0;
        
        if (showFrameCount) {
            tc_ff = parseInt(tc_array[3])/fps;
        }
        
        tc_in_seconds = ( tc_hh * 3600 ) + ( tc_mm * 60 ) + tc_ss + tc_ff;
        
        return tc_in_seconds;
	}
};
