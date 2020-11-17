setImmediate(()=>{
    console.log('immediate');
});

process.nextTick(()=>{
    console.log('nextTick');
});

setTimeout(()=>{
    console.log('timeout');
}, 0);

Promise.resolve().then(()=>console.log('promise'));


// nextTick, promise, (timeout, immediate) 은 랜덤에 가깝다. 환경에 따라 어떨땐 immediate이 더 빠름

// cmd등에서 REPL(read, evaluate, print, loop) process.exit(0)은 노드를 종료함. exit(1)은 에러가 있는 상황에서 종료함을 의미
