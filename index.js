module.exports = (function(){
    //job counter for pretty print
    var job_c = 0;
    var job_sep = ' ';
    var toArray = function(a){return [].concat.apply([],a);};

    var getDeep = function(){
        job_c = Math.max(0,job_c);
        return Array(Math.max(0,job_c-1)).fill(job_sep).join('');
    };

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

    return {
        log:log,
        start:jobStart,
        end:jobEnd
    };
})();
