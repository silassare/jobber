"use strict";
module.exports = (function(){
    //job counter for pretty print
    var job_c = 0,
		job_sep = ' ',
		toArray = function(a){return [].concat.apply([],a);},
		getDeep = function(){
			job_c = Math.max(0,job_c);
			return Array(Math.max(0,job_c-1)).fill(job_sep).join('');
		},
		jobber;

    /**
     * Job pretty logger.
     */
    var log = function(){
        var args = toArray(arguments),
            formats = getDeep();

        if(typeof args[0] === 'string'){
            formats += args[0];
            args = toArray(args).slice(1);
        }

        console.log.apply(null,[formats].concat(args));
    };


    /**
     * Print entry point of a Job.
     * @param {string} j_name Job log tag name.
     */
    var jobStart = function(j_name){ job_c++; log("-----> %s",j_name); job_c++;};
    /**
     * Print out point of a Job.
     * @param {string} j_name Job log tag name.
     */
    var jobEnd = function(j_name){ job_c--; log("<----- %s",j_name); job_c--;};
 
	// /**
    // * Save job log into file.
    // * @param {string} log_path log file path.
    // */
	//	var fs = require('fs');
	//	var path = require('path');
    //	var jobSave = function(){
	//		var getDate = function() {
	//			var d = new Date(),
	//				fix = function(x){return (""+x)[1]? x:'0'+x;};
	//
	//			return [d.getFullYear(),d.getMonth()+1,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()].map(fix).join('-');
	//		},
	//
	//		out_name = 'jobber-'+getDate()+'.log',
	//		dest = path.resolve('./',out_name),
	//		content = '';
	//
	//		fs.writeFileSync(dest,content);
	// };
	
	var Task = function(name,end_onerror){
		var t_name = 'Task: ' + name,
			c = 0;

		return {
			fail:0,
			tasks:[],
			next:function(){
				c++;
				this.run();
			},
			add:function(title,fn){
				//'a task must be a function'
				var args = arguments;
				if( typeof args[0] == "function"){
					fn = args[0];
					title = null;
				}

				if (typeof fn == "function"){
					this.tasks.push([title,fn]);
				}
			},
			run:function(){
				if(!c) jobber.start(t_name);

				var t = this,
					title = t.tasks[c][0],
					task = t.tasks[c][1],
					tag = 'task: '+(title||c),
					len = t.tasks.length,
					_next = function(err,msg){
						var rest = len-c-1;
						if(err){
							jobber.err("fail: %s",msg);
							t.fail++;
						} else {
							jobber.info('ok');
						}

						jobber.end('');
						if(err && end_onerror){
							rest && jobber.warn('...%d task(s) ignored!',rest);
							jobber.end(t_name);
						} else {
							t.next();
						}
					};

				if(c < len && task){
					jobber.start(tag);
					task(_next);
				} else {
					jobber.end(t_name);
					c = 0;
				}
			}
		}
	};

    return jobber = {
		task: function(name){
			return new Task(...arguments);
		},
        log: log,
        err: log,
        warn: log,
        info: log,
	//	save: jobSave,
        start: jobStart,
        end: jobEnd
    };
})();