var jobber = require('./index')();

var myJobA = function () {
    jobber.start('myJobA');
    jobber.log('A:my log 1');
    myJobB();
    myJobB();
    jobber.log('A:my log 2');
    jobber.end('myJobA');
};

var myJobB = function () {
    jobber.start('myJobB');
    jobber.log('B:my log 1');
    jobber.log('B:my log 2');
    jobber.end('myJobB');
};

var myFactJob = function (n) {
    jobber.start('myFactJob');
    if (n<0) throw 'n must be positive';
    var f = n<=1? 1:n*myFactJob(n-1)
    jobber.log('!n:!%d = %d',n,f);
    jobber.end('myJobA');
    return f;
};

myJobA();
myJobB();
myFactJob(10);