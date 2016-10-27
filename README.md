Jobber
---
A simple job log pretty printer.

Setup with npm
---
```
npm install jobber
```

Usage
---
```javascript
var jobber = require('jobber');

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
```
Output
---
```
-----> myJobA
 A:my log 1
  -----> myJobB
   B:my log 1
   B:my log 2
  <----- myJobB
  -----> myJobB
   B:my log 1
   B:my log 2
  <----- myJobB
 A:my log 2
<----- myJobA
-----> myJobB
 B:my log 1
 B:my log 2
<----- myJobB
-----> myFactJob
  -----> myFactJob
    -----> myFactJob
      -----> myFactJob
        -----> myFactJob
          -----> myFactJob
            -----> myFactJob
              -----> myFactJob
                -----> myFactJob
                  -----> myFactJob
                   !1 = 1
                  <----- myJobA
                 !2 = 2
                <----- myJobA
               !3 = 6
              <----- myJobA
             !4 = 24
            <----- myJobA
           !5 = 120
          <----- myJobA
         !6 = 720
        <----- myJobA
       !7 = 5040
      <----- myJobA
     !8 = 40320
    <----- myJobA
   !9 = 362880
  <----- myJobA
 !10 = 3628800
<----- myJobA
```

Run Test
---

```
npm run-script test
```
