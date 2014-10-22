 var recPnk = function(n, k) {
     if (n == k) return 1;
     else {
         return n * recPnk(n - 1, k);
     }
 }

 var recCnk = function(n, k) {
     if (n == k) return 1;
     else {
         return recPnk(n, k) / kombinatoricsJs.factorial(k);
     }
 }

 var memorecPnk = function() {
     var fn, cache = {};

     var fnk = function(n, k) {
         if (n < 256 && k <= n) {
             var key = n << 9 | k;
             var out = cache[key];
             return out ? out : cache[key] = fn(n, k);
         } else return fn(n, k);
     }
     fn = function(nn, kk) {
         if (nn == kk) return 1;
         else {
             return nn * fnk(nn - 1, kk);
         }
     }
     return fnk;
 }